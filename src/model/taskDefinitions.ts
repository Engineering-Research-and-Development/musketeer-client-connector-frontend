import { Privacy } from "./privacy";

export class TaskSpecification {
  task_name: string;
  status: string; // 'COMPLETE' | 'FAILED' | 'CREATED' | 'STARTED'
  added?: string;
  topology: string;
  definition: TaskDefinition;

  constructor() {
    this.task_name = '';
    this.definition = new TaskDefinition();
  }
}

export class TaskDefinition {
  owner: string;
  algorithm_name: string;
  algorithm_type: string;
  POM: Privacy;
  quorum: number;
  task_description: string;
  data_description: DataDescription;

  constructor() {
    this.quorum = 1;
    this.POM = Privacy.POM1;
    this.task_description = '';
    this.data_description = {};
  }
}

interface DataDescription {
  features?: number;
  labels?: number;
}