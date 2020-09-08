import { Component, OnInit, Input } from '@angular/core';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-status-icon',
  templateUrl: './task-status-icon.component.html',
  styleUrls: ['./task-status-icon.component.scss']
})
export class TaskStatusIconComponent implements OnInit {
  @Input() status: string;

  faStopwatch = faStopwatch;

  constructor() { }

  ngOnInit() {
  }

}
