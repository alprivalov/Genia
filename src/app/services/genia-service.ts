import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeniaService {
  private baseUrl = 'http://localhost:8080/api/v4/genia';

  constructor(private http: HttpClient) {}

  generate(text: string) {
    return this.http.post<any>(
      `${this.baseUrl}/generator`,
      { text }
    );
  }
}
