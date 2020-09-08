import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../globals';
import { FileSpecs } from 'src/model/dataDefinitions';

@Injectable({
  providedIn: 'root'
})
export class WorkerService {

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getDatasets() { return this.http.get<FileSpecs[]>(this.globals.DATASETS_URL) }

  addDataset(file: FileSpecs) { return this.http.post<any>(this.globals.DATASETS_URL, file) }
}
