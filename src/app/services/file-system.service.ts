import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RuntimeConfig } from '../models/runtime-config.model';
import { HmiScreen } from '../models/screen.model';

@Injectable({ providedIn: 'root' })
export class FileSystemService {
  private config: RuntimeConfig | undefined;

  constructor(private http: HttpClient) {}

  async load(): Promise<void> {
    /*this.http
      .get<RuntimeConfig>('./assets/runtimeConfig.json', { responseType: 'json' })
      .subscribe((data) => {
        this.config = data;
      });
    */

    this.config = {
      screens: [
        {
          id: '1',
          name: 'Screen 1',
          isActive: true,
          items: [
            {
              id: '1',
              name: 'Table 1',
              type: 'table',
              x: 100,
              y: 100,
              width: 200,
              height: 200,
              options: {
                columns: ['ID', 'Nombre', 'Edad', 'Ciudad'],
                data: [
                  { ID: 1, Nombre: 'Juan', Edad: 28, Ciudad: 'Madrid' },
                  { ID: 2, Nombre: 'María', Edad: 34, Ciudad: 'Barcelona' },
                  { ID: 3, Nombre: 'Pedro', Edad: 22, Ciudad: 'Valencia' },
                  { ID: 4, Nombre: 'Lucía', Edad: 29, Ciudad: 'Sevilla' },
                  { ID: 5, Nombre: 'Carlos', Edad: 31, Ciudad: 'Bilbao' },
                  { ID: 6, Nombre: 'Ana', Edad: 25, Ciudad: 'Zaragoza' },
                  { ID: 7, Nombre: 'Jorge', Edad: 27, Ciudad: 'Granada' },
                  { ID: 8, Nombre: 'Sofía', Edad: 30, Ciudad: 'Toledo' },
                  { ID: 9, Nombre: 'Laura', Edad: 33, Ciudad: 'Málaga' },
                  { ID: 10, Nombre: 'Daniel', Edad: 26, Ciudad: 'Vigo' },
                  { ID: 11, Nombre: 'Raúl', Edad: 35, Ciudad: 'Alicante' },
                  { ID: 12, Nombre: 'Clara', Edad: 24, Ciudad: 'Córdoba' }
                ],
              },
            },
          ],
        },
      ],
    };
  }

  get screens(): HmiScreen[] {
    return this.config?.screens || [];
  }

  getScreenById(id: string): HmiScreen | undefined {
    return this.config?.screens.find((screen) => screen.id === id);
  }
}
