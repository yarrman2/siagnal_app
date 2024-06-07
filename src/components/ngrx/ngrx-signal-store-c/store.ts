import { patchState, signalStore, signalStoreFeature, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { ItemI, SimpleCrudService, generateList } from '../../../services/simple-crud.service';
import { Signal, computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface StoreI {
  list: ItemI[];
}

function widthPagination() {
  return signalStoreFeature(
    {
      state: type<{list: ItemI[]}>(),
    },
    withState({
      page: 1,
      pageSize: 20,
    }),
    withComputed((store) => ({
      itemsPage: computed(() => {
        const start = (store.page() - 1) * store.pageSize();
        const end = start + store.pageSize();
        return store.list().slice(start, end);
      }),
    })),
    withMethods((store) => ({
      nextPage() {
        patchState(store, {page: store.page() + 1})
      },
    })),
  );
}

export const storeC = signalStore(
  withState<StoreI>({
    list: [],
  }),
  widthPagination(),
  withMethods((store, service=inject(SimpleCrudService)) => ({
    load: rxMethod<void>(pipe(
      switchMap(() => service.getAll()),
      tap((items) => patchState(store, {list: items})),
    )),
  })),
  withHooks({
    onInit(store, service=inject(SimpleCrudService)) {
      store.load();
    },
    onDestroy(store) {

    },
  }),
);
