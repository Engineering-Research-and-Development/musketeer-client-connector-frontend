import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Globals {

  constructor() { }
  
  // API URLS
  readonly BASE_URL = 'http://localhost:5000/cc';
  
  readonly DATASETS_URL = `${this.BASE_URL}/datasets`;

  readonly RESULTS_URL = `${this.BASE_URL}/results`;
  
  readonly CATALOGUE_URL = `${this.BASE_URL}/catalogue`;
  readonly ALGORITHMS_URL = `${this.CATALOGUE_URL}/algorithms`;
  readonly POMS_URL = `${this.CATALOGUE_URL}/poms`;

  readonly CONFIGURATIONS_URL = `${this.BASE_URL}/configurations`;
  
  readonly COMMS_URL = `${this.BASE_URL}/comms`;
  readonly LOGIN_URL = `${this.COMMS_URL}/login`;
  readonly LOGOUT_URL = `${this.COMMS_URL}/logout`;
  readonly REGISTER_URL = `${this.COMMS_URL}/registration`;

  readonly TASKS_URL = `${this.COMMS_URL}/tasks`;
  
  readonly FML_URL = `${this.BASE_URL}/fml`;

}