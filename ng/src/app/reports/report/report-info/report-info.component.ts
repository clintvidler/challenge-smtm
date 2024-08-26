import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-report-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report-info.component.html',
  styleUrl: './report-info.component.scss',
})
export class ReportInfoComponent {
  // (immutable) inputs from parent component
  idInput = input<string>('', { alias: 'id' });
  nameInput = input<string>('', { alias: 'name' });
  typeInput = input<string>('', { alias: 'type' });
  titlesInput = input<string[]>([], { alias: 'titles' });
  createdInput = input<string>('', { alias: 'created' });
  updatedInput = input<string>('', { alias: 'updated' });
  fieldsInput = input<string[]>([], { alias: 'fields' });

  // state selectors
  id = computed(() => this.idInput());
  name = computed(() => this.nameInput());
  type = computed(() => this.typeInput());
  titles = computed(() => this.titlesInput()?.join(', '));
  created = computed(() => new Date(this.createdInput()).toLocaleDateString());
  updated = computed(() => new Date(this.updatedInput()).toLocaleDateString());
  fields = computed(() => this.fieldsInput()?.join(', '));
}
