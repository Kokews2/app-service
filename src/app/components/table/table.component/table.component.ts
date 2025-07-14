import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HmiTableOptions } from '../../../models/items/table.model';

@Component({
  selector: 'app-table.component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() id!: string;
  @Input() name!: string;
  @Input() type!: string;
  @Input() x!: number;
  @Input() y!: number;
  @Input() width!: number;
  @Input() height!: number;
  @Input() options!: HmiTableOptions;

  data: any[] = [];
  columns: string[] = [];

  // SVG config
  cellWidth = 280;
  cellHeight = 50;
  tableWidth = 500;
  tableHeight = 0;

  // Paginación
  pageSize = 5;
  currentPage = 0;

  // Ordenamiento
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortedData: any[] = [];

  ngOnInit() {
    this.data = this.options.data;
    this.columns = this.options.columns;
    this.sortedData = [...this.data]; // Copia inicial
    this.updateTableDimensions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.options) {
      this.data = this.options.data;
      this.columns = this.options.columns;
      this.sortedData = [...this.data];
      this.currentPage = 0;
      this.updateTableDimensions();
    }
  }

  updateTableDimensions() {
    this.tableWidth = this.columns.length * this.cellWidth;
    this.tableHeight = (this.pageSize + 1) * this.cellHeight; // +1 header
  }

  get paginatedData(): any[] {
    const start = this.currentPage * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.pageSize < this.sortedData.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  sortBy(column: string) {
    if (this.sortedColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortedColumn = column;
      this.sortDirection = 'asc';
    }

    this.sortedData.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];

      if (aVal == null) return 1;
      if (bVal == null) return -1;

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return this.sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return this.sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    this.currentPage = 0; // Volver a la primera página al ordenar
  }
}
