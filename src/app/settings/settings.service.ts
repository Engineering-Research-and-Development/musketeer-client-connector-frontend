import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Globals } from '../globals';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  connectionIsUp: boolean;

  constructor(
    private globals: Globals,
    private http: HttpClient,
  ) { }

  changePassword(newPassword: string) {
    return this.http.patch<any>(`${this.globals.COMMS_URL}/change_password`, { new_password: newPassword });
  }

  deregisterAccount() {
    return this.http.delete<any>(`${this.globals.COMMS_URL}/deregister`);
  }

  getConnectionStatus() {
    return this.http.get<any>(`${this.globals.COMMS_URL}/status`);
  }
}
