import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Host,
  Inject,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { LinkModel } from '@rxzu/core';
import { DefaultLinkComponent } from 'packages/angular/src/lib/defaults';
import { MODEL } from '../../../../injection.tokens';

@Component({
  selector: 'rxzu-gh-workflow-link',
  templateUrl: './gh-workflow-link.component.html',
  styleUrls: ['./gh-workflow-link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GHWorkflowLinkComponent extends DefaultLinkComponent {
  @ViewChild('labelLayer', { read: ViewContainerRef, static: true })
  labelLayer!: ViewContainerRef;

  constructor(
    @Host() @Inject(MODEL) public model: LinkModel,
    cdRef: ChangeDetectorRef
  ) {
    super(model, cdRef);
  }
}
