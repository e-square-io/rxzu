import { Component, OnInit } from '@angular/core';
import {
  DiagramEngine,
  DiagramModel,
  NodeModel,
  PortModel,
} from '@rxzu/angular';

@Component({
  selector: 'app-root',
  template: `
    <div class="action-bar">
      <button (click)="zoomToFit()">Zoom to fit</button>
    </div>
    <rxzu-diagram class="demo-diagram" [model]="diagramModel"></rxzu-diagram>
  `,
  styleUrls: ['../../demo-diagram.component.scss'],
})
export class ZoomToFitExampleStoryComponent implements OnInit {
  diagramModel: DiagramModel;

  constructor(
    private diagramEngine: DiagramEngine
  ) {
    this.diagramEngine.registerDefaultFactories();
    this.diagramModel = this.diagramEngine.createModel();
  }

  ngOnInit() {
    const nodesDefaultDimensions = { height: 200, width: 200 };
    const node1 = new NodeModel({ type: 'default' });
    node1.setCoords({ x: 500, y: 300 });
    node1.setDimensions(nodesDefaultDimensions);
    const outport1 = new PortModel({ type: 'default' });
    node1.addPort(outport1);

    const node2 = new NodeModel({ type: 'default' });
    node2.setCoords({ x: 100, y: 100 });
    node2.setDimensions(nodesDefaultDimensions);
    const inport = new PortModel({ type: 'default' });
    node2.addPort(inport);


    for (let index = 0; index < 2; index++) {
      const nodeLoop = new NodeModel({ type: 'default' });
      nodeLoop.setCoords({
        x: 1000 * (Math.random() * 10),
        y: 300 + index * (Math.random() * 10) * 300,
      });
      nodeLoop.setDimensions(nodesDefaultDimensions);
      const inportLoop = new PortModel({ type: 'default' });
      node2.addPort(inport);
      nodeLoop.addPort(inportLoop);

      this.diagramModel.addNode(nodeLoop);

      const linkLoop = outport1.link(inportLoop);
      if (linkLoop) {
        this.diagramModel.addLink(linkLoop);
      }
    }

    this.diagramModel.addAll(node1, node2);

    this.diagramEngine.zoomToFit();
  }

  zoomToFit() {
    this.diagramEngine.zoomToFit();
  }
}