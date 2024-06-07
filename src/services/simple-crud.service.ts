import { Injectable } from '@angular/core';
import { Observable,  map, of } from 'rxjs';
import { delay, tap} from 'rxjs/operators';

export interface ItemI {
  id: number;
  title: string;
}

export interface PageI<T> {
  elements: T[];
  count: number;
}

export const generateList = (): ItemI[] => {
  return Array.from({ length: 159 }).map((_, index) => ({
    id: index + 1,
    title: `Item ${index + 1}`,
  }));
};

const delayTime = () => Math.random() * 1_000;

@Injectable({
  providedIn: 'root'
})
export class SimpleCrudService {

  list = generateList();

  getAll(): Observable<ItemI[]> {
    return of(this.list).pipe(
      delay(delayTime()),
    );
  }
  getPage(page: number, pageSize: number):Observable<PageI<ItemI>> {
    const offset = (page - 1) * pageSize;

    return of(this.list).pipe(
      delay(delayTime()),
      map((items) => items.slice(offset, offset + pageSize)),
      map((items) => ({
        elements: items,
        count: this.list.length,
      }))
    );
  }

  getPageFiltered({page, pageSize, filter}:{page: number, pageSize: number, filter: string}):Observable<PageI<ItemI>> {
    const offset = (page - 1) * pageSize;

    const filteredList = this.list.filter((item) => {
      if (filter) {
        return item.title.includes(filter);
      } else {
        return true;
      }
    });

    return of(filteredList).pipe(
      delay(delayTime()),
      map((items) => items.slice(offset, offset + pageSize)),
      map((items) => ({
        elements: items,
        count: filteredList.length,
      }))
    );
  }


  getById(id: number): Observable<ItemI | null> {
    return of(this.list.find(item => item.id === id) ?? null)
      .pipe(
        delay(delayTime()),
      );
  }

  updateById(id: number, updateTitle: string): Observable<ItemI | null>{
    const item = this.list.find(item => item.id === id) ?? null
    if (item) {
      item.title = updateTitle;
    }
    return of(item)
      .pipe(
        delay(delayTime()),
      );
  }
  deleteById(id: number): Observable<ItemI | null>{
    const item = this.list.find(item => item.id === id ) ?? null;
    if (item) {
      this.list = this.list.filter(({id}) => id != item.id);
    }
    return of(item).pipe(
        delay(delayTime()),
    )
  }

}
