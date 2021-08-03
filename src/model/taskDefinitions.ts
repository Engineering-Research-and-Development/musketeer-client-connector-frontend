import { Privacy } from "./privacy";

export class TaskSpecification {
  task_name: string;
  status: string; // 'COMPLETE' | 'FAILED' | 'CREATED' | 'STARTED'
  added?: string;
  topology: string;
  definition: TaskDefinition;
  actions: TaskActions;

  constructor() {
    this.task_name = '';
    this.topology = 'STAR';
    this.definition = new TaskDefinition();
  }
}

export interface TaskActions {
  aggregate: number;
  logs: number;
  participate: number;
  result: number;
  delete: number;
}

export class TaskDefinition {
  owner: string;
  algorithm_name: string;
  algorithm_type: string;
  POM: Privacy;
  quorum: number;
  task_description: string;
  input_data_description: any;
  target_data_description: any;
  disconnect_bad_workers: boolean;
  data_description: DataDescription;
  preprocessing: Preprocessing[];

  constructor() {
    this.quorum = 1;
    this.POM = Privacy.POM1;
    this.task_description = '';
    this.data_description = {};
    this.preprocessing = [];
  }
}

interface Preprocessing {
  label?: string;
  name: string;
  properties: any[];
}

interface DataDescription {
  features?: number;
  labels?: number;
}