import { Component, OnInit, Input } from '@angular/core';
import { faStopwatch, faTasks } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-status',
  templateUrl: './task-status.component.html',
  styleUrls: ['./task-status.component.scss']
})
export class TaskStatusComponent implements OnInit {
  @Input() status: string;

  faStopwatch = faStopwatch;
  faTasks = faTasks;

  constructor() { }

  ngOnInit() {
  }

}
