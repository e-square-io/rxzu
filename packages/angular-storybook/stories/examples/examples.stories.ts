import { Meta, moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import {
  AutoArrangeDiagramTemplate,
  BasicDiagramTemplate,
  DragAndDropDiagramTemplate,
  DynamicPortsDiagramTemplate,
  EventsDiagramTemplate,
  PerformanceDiagramTemplate,
  ZoomToFitDiagramTemplate,
  ZoomToNodeDiagramTemplate
} from './examples.template';
import { BasicExampleStoryComponent } from './basic/basic.component';
import { AutoArrangeExampleStoryComponent } from './auto-arrange/auto-arrange.component';
import { PerformanceExampleStoryComponent } from './performance/performance.component';
import {
  DefaultLinkComponent,
  DefaultNodeComponent,
  DefaultLabelComponent,
  DefaultPortComponent,
  RxZuDiagramsModule,
  DagrePlugin,
} from '@rxzu/angular';
import { DragAndDropExampleStoryComponent } from './drag-and-drop/drag-and-drop.component';
import { ZoomToFitExampleStoryComponent } from './zoom-to-fit/zoom-to-fit.component';
import { ZoomToNodeExampleStoryComponent } from './zoom-to-node/zoom-to-node.component';
export default {
  title: 'Examples',
  component: DefaultLinkComponent,
  parameters: { docs: { iframeHeight: '400px' } },
  decorators: [
    moduleMetadata({
      declarations: [
        DefaultNodeComponent,
        BasicExampleStoryComponent,
        AutoArrangeExampleStoryComponent,
        PerformanceExampleStoryComponent,
        DragAndDropExampleStoryComponent,
        ZoomToFitExampleStoryComponent,
        ZoomToNodeExampleStoryComponent,
        DefaultLinkComponent,
        DefaultLabelComponent,
        DefaultPortComponent,
      ],
      providers: [DagrePlugin],
      imports: [CommonModule, RxZuDiagramsModule],
      entryComponents: [
        DefaultNodeComponent,
        DefaultLinkComponent,
        DefaultLabelComponent,
        DefaultPortComponent,
      ],
    }),
  ],
} as Meta;

export const Basic = BasicDiagramTemplate.bind({});

export const Events = EventsDiagramTemplate.bind({});

export const AutoArrange = AutoArrangeDiagramTemplate.bind({});

export const Performance = PerformanceDiagramTemplate.bind({});

export const DynamicPorts = DynamicPortsDiagramTemplate.bind({});

export const DragAndDrop = DragAndDropDiagramTemplate.bind({});

export const ZoomToFit = ZoomToFitDiagramTemplate.bind({});

export const ZoomToNode = ZoomToNodeDiagramTemplate.bind({});
