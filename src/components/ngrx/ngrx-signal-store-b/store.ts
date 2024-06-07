import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { ItemI, SimpleCrudService, generateList } from '../../../services/simple-crud.service';
import { computed, inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { finalize, pipe, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


interface StoreI {
  page: number;
  pageSize: number;
  list: ItemI[];
}


export const storeB = signalStore(
  withState<StoreI>({
    page: 1,
    pageSize: 20,
    list: [],
  }),
  withComputed((store) => ({
    itemsPage: computed(() => {
      const start = (store.page() - 1) * store.pageSize();
      const end = start + store.pageSize();
      return store.list().slice(start, end);
    }),
  })),
  withMethods((store, service=inject(SimpleCrudService)) => ({
    nextPage() {
      patchState(store, {page: store.page() + 1})
    },
    load: rxMethod<void>(pipe(
      switchMap(() => service.getAll()),
      tap((items) => patchState(store, {list: items})),
    )),
  })),
  withHooks({
    onInit(store, service=inject(SimpleCrudService)) {
      store.load();
      // service.getAll().pipe(
      //   tap((items) => patchState(store, {list: items})),
      //   takeUntilDestroyed(),
      //   finalize(() => {
      //     console.log('finalize');
      //   })
      // ).subscribe();

      // rxMethod<void>(
      //   pipe(
      //     switchMap(() => service.getAll()),
      //     tap((items) => patchState(store, {list: items})),
      //     finalize(() => {console.log('finalize')})
      //   ),
      // )();
    },
    onDestroy(store) {

    },
  }),
);
