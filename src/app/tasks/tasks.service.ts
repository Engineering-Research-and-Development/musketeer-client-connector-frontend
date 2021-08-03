import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { Task } from 'src/model/task';
import { TaskSpecification } from 'src/model/taskDefinitions';
import { Datasets } from 'src/model/dataDefinitions';

interface TaskActionBody {
  task_name: string;
  datasets: Datasets;
}

export interface LogsWrapper {
  logs: string;
  end?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getTasks() { return this.http.get<TaskSpecification[]>(this.globals.TASKS_URL) }

  getJoinedTasks() { return this.http.get<TaskSpecification[]>(`${this.globals.TASKS_URL}/joined`) }

  getCreatedTasks() { return this.http.get<TaskSpecification[]>(`${this.globals.TASKS_URL}/created`) }

  getTask(name: string) { return this.http.get<TaskSpecification>(`${this.globals.TASKS_URL}/${name}`) }

  getTaskResultImage(name: string) { return this.http.get<Blob>(`${this.globals.RESULTS_URL}/image?task=${name}`, { responseType: 'blob' as 'json' }) }

  getStreamLogs(task: string, mode: string) {
    return new EventSource(`${this.globals.RESULTS_URL}/stream/logs?task=${task}&mode=${mode}`, { withCredentials: true });
  }

  getBatchLogs(task: string, mode: string) {
    return this.http.get<LogsWrapper>(`${this.globals.RESULTS_URL}/batch/logs?task=${task}&mode=${mode}`);
  }

  openTextLogs(task: string, mode: string) {
    window.open(`${this.globals.RESULTS_URL}/logs?task=${task}&mode=${mode}`, '_blank');
  }

  // createTask(task: Task) { return this.http.post<Task>(this.globals.TASKS_URL, task) }
  createTask(task: TaskSpecification) {
    let body = {
      task_name: task.task_name,
      definition: task.definition,
    };

    return this.http.post<any>(this.globals.TASKS_URL, body);
  }

  participate(task: any, datasets: Datasets) {
    let body: TaskActionBody = {
      task_name: task,
      datasets: datasets
    };

    return this.http.post<any>(`${this.globals.FML_URL}/participate`, body)
  }

  aggregate(task: string, datasets: Datasets) {
    let body: TaskActionBody = {
      task_name: task,
      datasets: datasets
    };

    return this.http.post<any>(`${this.globals.FML_URL}/aggregate`, body)
  }

  updateTask(task: Task) { return this.http.put<Task>(`${this.globals.TASKS_URL}/${task.id}`, task) }

  deleteTask(id: string) { return this.http.delete<Task>(`${this.globals.TASKS_URL}/${id}`) }

  getSupportedAlgorithms() { return this.http.get<any>(this.globals.ALGORITHMS_URL) }

  getPrivacyLevels() { return this.http.get<any>(this.globals.POMS_URL) }

}
