import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener, ComponentFactoryResolver, ViewContainerRef, Input } from '@angular/core';
import { PopoverComponent } from './shared/components/popover/popover.component';


@Directive({
  selector: '[appAddIcon]'
})
export class PopOverDirective implements AfterViewInit {
  @Input('appPopoverId') id: string = '';
  @Input('showIcon') ishowIcond: boolean = false;
  private popoverInstance: any;

  constructor(
    private el: ElementRef, 
    private renderer: Renderer2, 
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngAfterViewInit() {
    
    const span = this.renderer.createElement('span');
    const icon = this.renderer.createElement('i');
    if(this.ishowIcond){
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
    if (this.popoverInstance) {
      this.popoverInstance.visible = true;
    }
  }

  @HostListener('mouseout')
  onMouseOut() {
    if (this.popoverInstance) {
      this.popoverInstance.visible = false;
    }
  }
}
