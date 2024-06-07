import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { storeF } from './store';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngrx-signal-store-f',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  providers: [
    storeF
  ],

  templateUrl: './ngrx-signal-store-f.component.html',
  styleUrl: './ngrx-signal-store-f.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgrxSignalStoreFComponent {
  store = inject(storeF);
  elements = computed(() => this.store.itemsPage.elements().map((item) => ({
    ...item,
    selected: item.id === this.store.editingItem()?.id,
  })))

  blockingTable = computed(() => this.store.isEditing() || this.store.saving());
  cantPrev = computed(() => this.store.isFirstPage() || this.blockingTable());
  cantNext = computed(() => this.store.isLastPage() || this.blockingTable());

  editingField: string = '';

  edit(id: number) {
    this.store.startEdit(id);
  }
  delete(id: number) {
    // this.store.delete(id);
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
}
