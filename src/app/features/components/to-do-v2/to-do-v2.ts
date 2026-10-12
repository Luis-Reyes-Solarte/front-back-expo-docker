import { Component, inject } from '@angular/core';
import { TableModule } from '@openng/optimus-ui/table';
import { Api } from '../../services/api';
import { ListModel } from '../../models/list-model';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [TableModule, ButtonModule, DialogModule, FormsModule],
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
  private dialogVisible: boolean = false;
  private tipoModal: string = '';
  private elementoSeleccionado: ListModel = {
    id: 0,
    name: '',
    done: false,
  };

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

  showDialog() {
    this.dialogVisible = true;
  }

  editar(elemento: ListModel) {
    this.tipoModal = 'Editar elemento';
    this.elementoSeleccionado = { ...elemento };
    this.showDialog();
  }

  ver(elemento: ListModel) {
    this.tipoModal = 'Vista previa';
    this.elementoSeleccionado = { ...elemento };
    this.showDialog();
  }

  actualizarDato(elemento: ListModel) {
    this.apiServide.updateList(elemento.id, elemento).subscribe({
      next: () => {
        this.cargarDatos();
      },
      error: (error) => {
        this.error = error.message;
      },
    });
    this.dialogVisible = false;
  }
  guardarOCerrar(): void {
    if (this.tipoModal === 'Editar elemento') {
      this.actualizarDato(this.elementoSeleccionado);
    } else {
      this.dialogVisible = false;
    }
  }
}
