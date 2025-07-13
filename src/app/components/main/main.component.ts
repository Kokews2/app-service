import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetHostDirective } from '../../directives/widget-host.directive';
import { FileSystemService } from '../../services/file-system.service';
import { DynamicComponentService } from '../../services/dynamic-component.service';
import { HmiItem } from '../../models/item.model';

@Component({
  selector: 'app-main',
  template: `
    <div class="main-container">
      <ng-template widgetHost></ng-template>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, WidgetHostDirective],
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  @ViewChild(WidgetHostDirective, { static: true })
  widgetHost!: WidgetHostDirective;

  constructor(
    private screenService: FileSystemService,
    private dynamicService: DynamicComponentService
  ) {}

  async ngOnInit() {
    await this.screenService.load();
    console.log('Loaded screens:', this.screenService.screens);
    this.renderWidgets(this.screenService.getScreenById('main')?.items || []);
  }

  renderWidgets(widgets: HmiItem[]) {
    const container = this.widgetHost.viewContainerRef;
    container.clear();

    widgets.forEach((widget) => {
      const componentType = this.dynamicService.getComponent(widget.type);
      if (componentType) {
        const componentRef = container.createComponent(componentType);
        Object.assign(componentRef.instance, widget.options);
      }
    });
  }
}
