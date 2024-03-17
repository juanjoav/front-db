import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Roles } from '../models/roles';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private newBaseUrl = 'http://localhost:8080/api/roles/';
  constructor(private http: HttpClient) { }

  getAllRols(): Observable<Roles[]> {
    return this.http.get<Roles[]>(`${this.newBaseUrl}`);
  }
}
