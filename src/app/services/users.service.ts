import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:8080/user/';
  private loginUrl = 'http://localhost:8080/users/login';
  private authTokenKey = 'Authorization';
  private cachedHeaders: HttpHeaders | null = null;

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseUrl}/list`);
  }

  createUser(usuario: Usuario): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}create`, usuario);
  }

  getUserById(id: number): Observable<Usuario> {
    const headers = this.setAuthorizationHeader();
    return this.http.get<Usuario>(`${this.baseUrl}get/${id}`,headers);
  }

  getUserByEmail(email: string): Observable<Usuario> {
    const headers = this.setAuthorizationHeader();
    return this.http.get<Usuario>(`${this.baseUrl}getByEmail/${email}`, headers);
  }

  updateUser(id: number, updatedUser: Usuario): Observable<Usuario> {
    const headers = this.setAuthorizationHeader();
    return this.http.put<Usuario>(`${this.baseUrl}update/${id}`, updatedUser, headers);
  }

  deleteUser(id: number): Observable<Usuario> {
    const headers = this.setAuthorizationHeader();

    console.log("Headers -> ",headers);

    return this.http.delete<Usuario>(`${this.baseUrl}delete/${id}`, headers);
  }


  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };
    return this.http.post<any>(this.loginUrl, credentials).pipe(
      tap(response => {
        console.log("Respuesta -> ",response.Authorization);
        localStorage.setItem(this.authTokenKey, response.Authorization);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  logout(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  setAuthorizationHeader(): { headers: HttpHeaders } {
    if (!this.cachedHeaders) {
      const token = this.getToken();
      this.cachedHeaders = new HttpHeaders();

      if (token) {
        this.cachedHeaders = this.cachedHeaders.set('Authorization', `${token}`);
      }
    }

    return { headers: this.cachedHeaders };
  }

  isAuthorized(): boolean {
    const token = this.getToken();
    return !!token;
  }

}