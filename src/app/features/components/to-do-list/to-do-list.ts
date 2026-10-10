import { Component, inject } from '@angular/core';
import { Api } from '../../services/api';
import { ListModel } from '../../models/list-model';

@Component({
  imports: [],
  selector: 'app-to-do-list',
  styleUrl: './to-do-list.scss',
  templateUrl: './to-do-list.html',
})
export class ToDoList {
  apiService = inject(Api);
  items: ListModel[] = [];

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.apiService.getList()?.subscribe((items) => {
      this.items = items;
    });
  }
}
