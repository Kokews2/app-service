import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[widgetHost]',
  standalone: true,
})
export class WidgetHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}
