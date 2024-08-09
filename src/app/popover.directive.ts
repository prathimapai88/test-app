import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener, ComponentFactoryResolver, ViewContainerRef, Input } from '@angular/core';
import { PopoverComponent } from './shared/components/popover/popover.component';

@Directive({
  selector: '[appAddIcon]'
})
export class PopOverDirective implements AfterViewInit {
  @Input('appPopoverId') id: string = '';
  @Input('showIcon') ishowIcond: boolean = false;
  private popoverInstance: any;
  private hoverTimeout: any; // Variable to hold the timeout reference

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2, 
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    const span = this.renderer.createElement('span');
    const icon = this.renderer.createElement('i');
    if (this.ishowIcond) {
      this.renderer.addClass(icon, 'icon');
      this.renderer.addClass(icon, 'dx-icon-info');
      this.renderer.appendChild(span, icon);
    }
    this.renderer.appendChild(this.el.nativeElement, span);
    this.createPopoverComponent(span);
  }

  private createPopoverComponent(targetElement: any) {
    const factory = this.componentFactoryResolver.resolveComponentFactory(PopoverComponent);
    this.popoverInstance = this.viewContainerRef.createComponent(factory).instance;
    this.popoverInstance.targetElement = targetElement;
    this.popoverInstance.visible = false;
    this.popoverInstance.content = this.id; // You can customize this
  }

  @HostListener('mouseover')
  onMouseOver() {
    // Set a timeout to show the popover after 1 second
    this.hoverTimeout = setTimeout(() => {
      if (this.popoverInstance) {
        this.popoverInstance.visible = true;
      }
    }, 1500);
  }

  @HostListener('mouseout')
  onMouseOut() {
    // Clear the timeout if the mouse leaves before the delay
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
    // Hide the popover immediately when the mouse leaves
    if (this.popoverInstance) {
      this.popoverInstance.visible = false;
    }
  }
}
