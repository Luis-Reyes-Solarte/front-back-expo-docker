import { Component, inject } from '@angular/core';
import { Api } from '../../services/api';
import { ListModel } from '../../models/list-model';
import { ButtonModule } from '@openng/optimus-ui/button';

@Component({
  imports: [ButtonModule],
  selector: 'app-to-do-list',
  styleUrl: './to-do-list.scss',
  templateUrl: './to-do-list.html',
})
export class ToDoList {
  apiService = inject(Api);
  items: ListModel[] = [];
  error: string = '';

  ngOnInit(): void {
    this.cargarDatos();
  }
  cargarDatos(): void {
    this.apiService.getList().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
  information(): void {
    alert('Información');
    console.log('Información');
  }
  confirmMSG(): void {
    confirm('Confirmar');
  }
}
