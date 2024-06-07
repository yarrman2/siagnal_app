import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { storeG } from './store';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, filter, tap } from 'rxjs';

interface FilterFormI {
  title: FormControl<string | null>;
}

@Component({
  selector: 'ngrx-signal-store-g',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    storeG
  ],

  templateUrl: './ngrx-signal-store-g.component.html',
  styleUrl: './ngrx-signal-store-g.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxSignalStoreGComponent implements OnInit {
  store = inject(storeG);
  destroyRef = inject(DestroyRef);
  elements = computed(() => this.store.itemsPage.elements().map((item) => ({
    ...item,
    selected: item.id === this.store.editingItem()?.id,
  })))

  blockingTable = computed(() => this.store.isEditing() || this.store.saving());
  cantPrev = computed(() => this.store.isFirstPage() || this.blockingTable());
  cantNext = computed(() => this.store.isLastPage() || this.blockingTable());

  form = new FormGroup<FilterFormI>({
    title: new FormControl(''),
  });


  editingField: string = '';

  ngOnInit(): void {
    this.form.get('title')?.valueChanges.pipe(
      debounceTime(300),
      tap((value) => {
        this.store.setFilter(value ?? '');
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  edit(id: number) {
    this.store.startEdit(id);
  }
  delete(id: number) {
    this.store.delete(id);
  }
  save() {
    if (this.editingField) {
      this.store.update(this.editingField);
    }
  }
  cancel() {
    this.store.cancel();
  }
  changeItem(text: string) {
    this.editingField = text;
  }

  isDiasbledEdit(id: number): boolean {
    return !(this.store.editingItem() == null)
  }

  reloadTable() {
    this.store.reload();
  }
}
