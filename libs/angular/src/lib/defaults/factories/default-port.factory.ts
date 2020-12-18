import { AbstractPortFactory } from '../../factories/port.factory';
import { DefaultPortModel } from '../models/default-port.model';
import { ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, Renderer2 } from '@angular/core';
import { DefaultPortComponent } from '../components/default-port/default-port.component';

export class DefaultPortFactory extends AbstractPortFactory<DefaultPortModel> {
  constructor(protected resolver: ComponentFactoryResolver, protected renderer: Renderer2) {
    super('default');
  }

  generateWidget(port: DefaultPortModel, portsHost: ViewContainerRef): ComponentRef<DefaultPortComponent> {
    const componentRef = portsHost.createComponent(this.getRecipe());

    // attach coordinates and default positional behaviour to the generated component host
    const rootNode = componentRef.location.nativeElement as HTMLElement;

    // data attributes
    this.renderer.setAttribute(rootNode, 'data-portid', port.id);
    this.renderer.setAttribute(rootNode, 'data-name', port.getName());

    port.in ? this.renderer.addClass(rootNode, 'in') : this.renderer.addClass(rootNode, 'out');

    // assign all passed properties to node initialization.
    Object.entries(port).forEach(([key, value]) => {
      componentRef.instance[key] = value;
    });

    port.onEntityDestroy().subscribe(() => {
      componentRef.destroy();
    });

    componentRef.instance.setPainted(true);
    return componentRef;
  }

  getRecipe(): ComponentFactory<DefaultPortComponent> {
    return this.resolver.resolveComponentFactory(DefaultPortComponent);
  }

  getNewInstance(initialConfig?: any): DefaultPortModel {
    return new DefaultPortModel({
      isInput: true,
      name: 'unknown',
      ...initialConfig
    });
  }
}
