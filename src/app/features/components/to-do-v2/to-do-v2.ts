import { Component, inject } from '@angular/core';
import { TableModule } from '@openng/optimus-ui/table';
import { Api } from '../../services/api';
import { ListModel } from '../../models/list-model';
import { ButtonModule } from '@openng/optimus-ui/button';

@Component({
  imports: [TableModule, ButtonModule],
  selector: 'app-to-do-v2',
  styleUrl: './to-do-v2.scss',
  templateUrl: './to-do-v2.html',
})
export class ToDoV2 {
  private apiServide = inject(Api);
  private items: ListModel[] = [];
  private error: string = '';
  private isPaginator: boolean = true;
  private rows: number = 5;
  private isShowGridlines: boolean = true;
  private rowsPerPageOptions: number[] = [5, 10, 15];

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.apiServide.getList().subscribe({
      next: (response) => {
        this.items = response;
      },
      error: (error) => {
        this.error = error.message;
      },
    });
  }
}
