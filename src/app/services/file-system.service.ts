import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RuntimeConfig } from '../models/runtime-config.model';
import { HmiScreen } from '../models/screen.model';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private config: RuntimeConfig | undefined;

  constructor(private http: HttpClient) { }

  async load(): Promise<void> {
    /*this.http
      .get<RuntimeConfig>('./assets/runtimeConfig.json', { responseType: 'json' })
      .subscribe((data) => {
        this.config = data;
      });
    */

    this.config = {
      screens: [{
        id: '1',
        name: 'Screen 1',
        isActive: true,
        items: [{
          id: '1',
          name: 'Gauge 1',
          type: 'gauge',
          x: 100,
          y: 100,
          width: 200,
          height: 200,
          options: {
            title: 'Gauge 1',
            value: 50
          }
        },
        {
          id: '1',
          name: 'Gauge 1',
          type: 'gauge',
          x: 100,
          y: 100,
          width: 200,
          height: 200,
          options: {
            title: 'Gauge 1',
            value: 50
          }
        }]
      }]
    }
  }

  get screens(): HmiScreen[] {
    return this.config?.screens || [];
  }

  getScreenById(id: string): HmiScreen | undefined {
    return this.config?.screens.find((screen) => screen.id === id);
  }
}
