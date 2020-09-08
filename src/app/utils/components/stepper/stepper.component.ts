import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnChanges {
  @Input() steps: string[];
  @Input() selected: number = 0;
  @Output() selectedChange = new EventEmitter<number>();
  progress: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['selected'].currentValue) {
      this.progress = Math.max(this.progress, this.selected);
    }
  }

  selectStep(n: number) {
    if(n <= this.progress) {
      this.selected = n;
      this.selectedChange.emit(n);
    }
  }

}
