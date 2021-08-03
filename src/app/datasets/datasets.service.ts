import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataFile, FileSpecs } from 'src/model/dataDefinitions';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class DatasetsService {

  constructor(
    private http: HttpClient,
    private globals: Globals,
  ) { }

  getDatasets() { return this.http.get<DataFile[]>(this.globals.DATASETS_URL) }

  addDataset(file: FileSpecs) { return this.http.post<any>(this.globals.DATASETS_URL, file) }

  updateDataset(file: DataFile) { return this.http.put<DataFile>(`${this.globals.DATASETS_URL}/${file._id}`, file) }

  deleteDataset(id: string) { return this.http.delete<DataFile>(`${this.globals.DATASETS_URL}/${id}`) }
}
