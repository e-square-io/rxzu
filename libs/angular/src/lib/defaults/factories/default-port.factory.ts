import { ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import { AbstractAngularFactory, DefaultPortModel } from '@ngx-diagrams/core';
import { DefaultPortComponent } from '../components/default-port/default-port.component';

export class DefaultPortFactory extends AbstractAngularFactory<DefaultPortComponent> {
  constructor(protected resolver: ComponentFactoryResolver, protected renderer: Renderer2) {
    super('default');
  }

  generateWidget({
    model,
    host
  }: {
    model: DefaultPortModel;
    host: ViewContainerRef;
  }): ComponentRef<DefaultPortComponent> {
    const componentRef = host.createComponent(this.getRecipe());

    // attach coordinates and default positional behaviour to the generated component host
    const rootNode = componentRef.location.nativeElement as HTMLElement;

    // data attributes
    this.renderer.setAttribute(rootNode, 'data-portid', model.id);
    this.renderer.setAttribute(rootNode, 'data-name', model.getName());

    model.in ? this.renderer.addClass(rootNode, 'in') : this.renderer.addClass(rootNode, 'out');

    // assign all passed properties to node initialization.
    Object.entries(model).forEach(([key, value]) => {
      componentRef.instance[key] = value;
    });

    model.onEntityDestroy().subscribe(() => {
      componentRef.destroy();
    });

    componentRef.instance.setPainted(true);
    return componentRef;
  }

  getRecipe(): ComponentFactory<DefaultPortComponent> {
    return this.resolver.resolveComponentFactory(DefaultPortComponent);
  }
}