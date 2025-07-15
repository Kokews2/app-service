import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { HmiTableOptions } from '../../../models/items/table.model';

@Component({
  selector: 'app-table.component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() id!: string;
  @Input() name!: string;
  @Input() type!: string;
  @Input() x!: number;
  @Input() y!: number;
  @Input() width!: number;
  @Input() height!: number;
  @Input() options!: HmiTableOptions;
  @ViewChild('container', { static: true })
  container!: ElementRef<HTMLDivElement>;
  resizeObserver!: ResizeObserver;

  data: any[] = [];
  columns: string[] = [];

  // SVG config
  cellWidth = 280;
  cellHeight = 50;
  tableWidth = 0;
  tableHeight = 0;
  
  // Filtrado
  filterText: string = '';
  filteredData: any[] = [];

  // Paginación
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions = [5, 10, 15, 20];
  dropdownOpen = false;

  // Ordenamiento
  sortedColumn: string | null = null;
  sortDirection: 'asc' | 'desc' = 'asc';
  sortedData: any[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadData();
  }

  ngAfterViewInit() {
    if (this.options && this.columns?.length) {
      this.setupResizeObserver();
      this.updateTableDimensions();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.options) {
      this.loadData();
    }
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  loadData() {
    this.data = this.options.data;
    this.columns = this.options.columns;
    this.filterText = '';
    this.filteredData = [];
    this.sortedData = [...this.data];
    this.currentPage = 0;
    this.updateTableDimensions();
  }

  setupResizeObserver() {
    this.resizeObserver = new ResizeObserver(() => {
      this.updateTableDimensions();
    });
    this.resizeObserver.observe(this.container.nativeElement);
  }

  updateTableDimensions() {
    if (!this.container || !this.columns?.length) return;

    const containerWidth = this.container.nativeElement.clientWidth;
    this.cellWidth = containerWidth / this.columns.length;
    this.tableWidth = containerWidth;
    this.tableHeight = (this.paginatedData.length + 1) * this.cellHeight;

    // Para forzar el ancho de la tabla al ancho del contenedor
    this.cdr.detectChanges();
  }

  applyFilter(): void {
    const text = this.filterText.trim().toLowerCase();

    if (text) {
      this.filteredData = this.data.filter((row) =>
        this.columns.some((col) =>
          String(row[col]).toLowerCase().includes(text)
        )
      );
    } else {
      this.filteredData = [];
    }

    this.sortedData = [
      ...(this.filteredData.length ? this.filteredData : this.data),
    ];
    this.currentPage = 0;
    this.updateTableDimensions();
  }

  get paginatedData(): any[] {
    const start = this.currentPage * this.pageSize;
    return this.sortedData.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.sortedData.length / this.pageSize);
  }

  get dropdownHeight(): number {
    // Altura desplegada dropdown o 0 si cerrado
    return this.dropdownOpen ? this.pageSizeOptions.length * 30 : 0;
  }

  get adjustedHeight(): number {
    return this.tableHeight + 50 + this.dropdownHeight;
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

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectPageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 0;
    this.dropdownOpen = false;
    this.updateTableDimensions();
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

    this.currentPage = 0;
  }
}
