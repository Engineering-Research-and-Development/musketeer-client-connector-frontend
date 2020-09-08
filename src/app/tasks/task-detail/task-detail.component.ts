import { Component, OnInit, Input } from '@angular/core';
import { TaskSpecification } from 'src/model/taskDefinitions';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  @Input() task: TaskSpecification;

  constructor() { }

  ngOnInit() {
  }

}
