import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RuntimeConfig } from '../models/runtime-config.model';
import { HmiScreen } from '../models/screen.model';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private config: RuntimeConfig | undefined;

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    this.http
      .get<RuntimeConfig>('assets/runtime-config.json')
      .subscribe((data) => {
        this.config = data;
      });

    console.log('FileSystemService loaded with config:', this.config);
  }

  get screens(): HmiScreen[] {
    return this.config?.screens || [];
  }

  getScreenById(id: string): HmiScreen | undefined {
    return this.config?.screens.find((screen) => screen.id === id);
  }
}
