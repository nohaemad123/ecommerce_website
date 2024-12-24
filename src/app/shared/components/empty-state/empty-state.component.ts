import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EmptyState } from 'src/app/core/models';

@Component({
  selector: 'app-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {
  
  @Input() emptyStateData: EmptyState;
  @Output() btnClickEmitter = new EventEmitter();

  onBtnClicked(): void {
    this.btnClickEmitter.emit();
  }

}
