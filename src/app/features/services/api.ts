import { HttpClient } from '@angular/common/http';
import { Service } from '@angular/core';
import { ListModel } from '../models/list-model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private url = 'http://localhost:8000/items/';
  constructor(private httpClient: HttpClient) {}
  getList(): Observable<ListModel[]> {
    return this.httpClient.get<ListModel[]>(this.url);
  }
  addList(list: ListModel): Observable<ListModel> {
    return this.httpClient.post<ListModel>(this.url, list);
  }
  updateList(id: number, list: ListModel): Observable<ListModel> {
    return this.httpClient.put<ListModel>(`${this.url}${id}/`, list);
  }
  deleteList(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}${id}/`);
  }
}
