import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/globals';

export class CommsConfiguration {
  comms_git_url: string;
  comms_git_token: string;
  comms_module: string;
  comms_config: any;

  constructor() {
    this.comms_module = '';
    this.comms_git_url = '';
  }
}

export class MMLLConfiguration {
  mmll_git_url: string;
  mmll_git_token: string;
  mmll_masternode_classpath: string;
  mmll_workernode_classpath: string;
  mmll_comms_master_wrapper_classpath: string;
  mmll_comms_worker_wrapper_classpath: string;
  mmll_algorithms: any;

  constructor() {
    this.mmll_git_url = '';
    this.mmll_masternode_classpath = '';
    this.mmll_workernode_classpath = '';
    this.mmll_comms_master_wrapper_classpath = '';
    this.mmll_comms_worker_wrapper_classpath = '';
  }
}

interface ConfigProgress {
  step: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(
    private http: HttpClient,
    private globals: Globals
  ) { }

  getCommsConfiguration() { return this.http.get<CommsConfiguration>(`${this.globals.CONFIGURATIONS_URL}/comm`) }

  setCommsConfiguration(config: CommsConfiguration) { return this.http.post<any>(`${this.globals.CONFIGURATIONS_URL}/comm`, config) }

  getMMLLConfiguration() { return this.http.get<MMLLConfiguration>(`${this.globals.CONFIGURATIONS_URL}/mmll`) }

  setMMLLConfiguration(config: MMLLConfiguration) { return this.http.post<any>(`${this.globals.CONFIGURATIONS_URL}/mmll`, config) }

  checkIfConfigured() { return this.http.get<ConfigProgress>(`${this.globals.CONFIGURATIONS_URL}/step`); }
}
