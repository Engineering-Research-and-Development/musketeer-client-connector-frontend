import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faChartBar, faKey, faNetworkWired, faQuestion, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskSpecification } from 'src/model/taskDefinitions';
import { User } from 'src/model/user';

@Component({
  selector: 'app-tasks-table',
  templateUrl: './tasks-table.component.html',
  styleUrls: ['./tasks-table.component.scss']
})
export class TasksTableComponent implements OnInit {
  @Input() tasks: TaskSpecification[];
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;

  faKey = faKey;

  constructor() { }

  ngOnInit() {
  }

}
