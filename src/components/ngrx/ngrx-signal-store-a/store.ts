import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { ItemI, generateList } from '../../../services/simple-crud.service';
import { computed } from '@angular/core';


interface StoreI {
  page: number;
  pageSize: number;
  list: ItemI[];
}


export const storeA = signalStore(
  withState<StoreI>({
    page: 1,
    pageSize: 20,
    list: generateList(),
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
    }
  })),
);
