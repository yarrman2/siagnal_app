import {
  getState,
  patchState,
  signalState,
  signalStore,
  signalStoreFeature,
  type,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  ItemI,
  PageI,
  SimpleCrudService,
  generateList,
} from '../../../services/simple-crud.service';
import { Signal, computed, effect, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { count, finalize, pipe, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { tapResponse } from '@ngrx/operators';

interface StoreI {
  itemsPage: PageI<ItemI>;
}

function widthPagination() {
  return signalStoreFeature(
    {
      state: type<{ itemsPage: PageI<ItemI> }>(),
    },
    withState({
      page: 1,
      pageSize: 20,
      loaded: false,
    }),
    withComputed((store) => ({
      lastPage: computed(() =>
        Math.ceil(store.itemsPage.count() / store.pageSize())
      ),
    })),
    withComputed((store) => ({
      isLastPage: computed(() => store.lastPage() == store.page()),
      isFirstPage: computed(() => store.page() === 1),
    })),
    withMethods((store, service = inject(SimpleCrudService)) => ({
      nextPage() {
        patchState(store, { page: store.page() + 1 });
      },
      prevPage() {
        patchState(store, (state) => ({ ...state, page: state.page - 1 }));
      },
    }))
  );
}


function withCRUD() {
  return signalStoreFeature(
    {
      state: type<{ itemsPage: PageI<ItemI>; page: number; }>(),
      methods: type<{load(val: number): void}>(),
    },
    withState<{lastAction: string; editingItem: ItemI | null; saving: boolean}>({
      lastAction: '',
      editingItem: null,
      saving: false,
    }),
    withComputed(({editingItem}) => ({
      isEditing: computed(() => editingItem() !== null),
      editingItemTitle: computed(() => editingItem()?.title ?? '')
    })),
    withMethods((store, service=inject(SimpleCrudService)) => ({
      startEdit(id: number) {
        const item = store.itemsPage.elements().find(item =>item.id === id);
        patchState(store, {editingItem: item });
      },
      cancel(){
        patchState(store, {editingItem: null});
      },
      update: rxMethod<string>(
        pipe(
          tap(() => patchState(store, {saving: true})),
          switchMap((payload) => {
            return service.updateById(store.editingItem()?.id ?? 0, payload )
          }),
          tapResponse({
            next(value) {
              patchState(store,  {saving: false, editingItem: null});
              store.load(store.page());
            },
            error(error) {
              patchState(store,  {saving: false, editingItem: null});
            },
          }),
        ),
      ),
    })),
    withHooks({
      onInit(store) {
        effect(() => {
          console.log('CRUD state', getState(store));
        })
      },
    })
  );
}

export const storeF = signalStore(
  withState<StoreI>({
    itemsPage: {
      elements: [],
      count: 0,
    },
  }),
  widthPagination(),
  withMethods((store, service = inject(SimpleCrudService)) => ({
      load: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { loaded: false })),
          switchMap((page) => service.getPage(page, store.pageSize())),
          tapResponse({
            next(items) {
              patchState(store, { itemsPage: items, loaded: true });
            },
            error(error) {},
          })
        )
      ),
  })),
  withCRUD(),
  withHooks({
    onInit(store) {
      store.load(store.page);
    },
    onDestroy(store) {},
  })
);
