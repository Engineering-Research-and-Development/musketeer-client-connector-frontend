import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class ModelsService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getModels() {
    return this.http.get<any[]>(this.globals.MODELS_URL);
  }

  downloadModel(task: string, extension: string) {
    return this.http.get<any>(`${this.globals.MODELS_URL}/${task}?extension=${extension}`);
  }

  getModelLineage(task: string) {
    return this.http.get<any>(`${this.globals.MODELS_URL}/${task}/lineage`);
  }

  deleteModel(task: string) {
    return this.http.delete<any>(`${this.globals.MODELS_URL}/${task}`);
  }
}
