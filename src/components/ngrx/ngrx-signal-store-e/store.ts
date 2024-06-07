import {
  patchState,
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
import { Signal, computed, inject } from '@angular/core';
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
      load: rxMethod<number>(
        pipe(
          tap(() => patchState(store, { loaded: false })),
          switchMap((offset) => service.getPage(offset, store.pageSize())),
          tapResponse({
            next(items) {
              patchState(store, { itemsPage: items, loaded: true });
            },
            error(error) {},
          })
        )
      ),
    })),
    withHooks({
      onInit(store) {
        store.load(store.page);
      },
      onDestroy(store) {},
    })
  );
}

export const storeE = signalStore(
  withState<StoreI>({
    itemsPage: {
      elements: [],
      count: 0,
    },
  }),
  widthPagination()
);
