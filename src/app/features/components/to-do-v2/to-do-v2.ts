import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize, TimeoutError, timeout } from 'rxjs';
import { TableModule } from '@openng/optimus-ui/table';
import { Api } from '../../services/api';
import { ListModel } from '../../models/list-model';
import { ButtonModule } from '@openng/optimus-ui/button';
import { DialogModule } from '@openng/optimus-ui/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from '@openng/optimus-ui/inputtext';
import { CheckboxModule } from '@openng/optimus-ui/checkbox';

@Component({
  imports: [TableModule, ButtonModule, DialogModule, FormsModule, InputTextModule, CheckboxModule],
  selector: 'app-to-do-v2',
  styleUrl: './to-do-v2.scss',
  templateUrl: './to-do-v2.html',
})
export class ToDoV2 {
  private apiServide = inject(Api);

  // Signals: en modo zoneless sus escrituras disparan el change detection,
  // algo que NO ocurre con campos planos modificados dentro de callbacks async
  // (ej. la respuesta de un POST/PUT), que era lo que dejaba el modal abierto.
  private items = signal<ListModel[]>([]);
  private error = signal('');
  private dialogVisible = signal(false);
  private guardando = signal(false);

  private isPaginator: boolean = true;
  private rows: number = 5;
  private isShowGridlines: boolean = true;
  private rowsPerPageOptions: number[] = [5, 10, 15];
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
        this.items.set(response);
        this.error.set('');
      },
      error: (error) => {
        this.error.set(this.mensajeError(error));
      },
    });
  }

  showDialog(): void {
    this.dialogVisible.set(true);
  }

  // Abre el modal en modo creación con un elemento vacío.
  nuevo(): void {
    this.tipoModal = 'Agregar elemento';
    this.elementoSeleccionado = { id: 0, name: '', done: false };
    this.showDialog();
  }

  editar(elemento: ListModel): void {
    this.tipoModal = 'Editar elemento';
    this.elementoSeleccionado = { ...elemento };
    this.showDialog();
  }

  ver(elemento: ListModel): void {
    this.tipoModal = 'Vista previa';
    this.elementoSeleccionado = { ...elemento };
    this.showDialog();
  }

  agregarDato(elemento: ListModel): void {
    this.guardando.set(true);
    this.apiServide
      .addList(elemento)
      .pipe(
        timeout(8000),
        finalize(() => this.guardando.set(false)),
      )
      .subscribe({
        next: () => {
          this.dialogVisible.set(false);
          this.cargarDatos();
        },
        error: (error) => {
          this.error.set(this.mensajeError(error));
        },
      });
  }

  actualizarDato(elemento: ListModel): void {
    this.guardando.set(true);
    this.apiServide
      .updateList(elemento.id, elemento)
      .pipe(
        timeout(8000),
        finalize(() => this.guardando.set(false)),
      )
      .subscribe({
        next: () => {
          this.dialogVisible.set(false);
          this.cargarDatos();
        },
        error: (error) => {
          this.error.set(this.mensajeError(error));
        },
      });
  }

  guardarOCerrar(): void {
    if (this.tipoModal === 'Editar elemento') {
      this.actualizarDato(this.elementoSeleccionado);
    } else if (this.tipoModal === 'Agregar elemento') {
      this.agregarDato(this.elementoSeleccionado);
    } else {
      this.dialogVisible.set(false);
    }
  }

  get esVistaPrevia(): boolean {
    return this.tipoModal === 'Vista previa';
  }

  private mensajeError(error: unknown): string {
    if (error instanceof HttpErrorResponse) {
      return `Error ${error.status}: ${error.message}`;
    }
    if (error instanceof TimeoutError) {
      return 'La solicitud tardó demasiado. Verifica que el backend esté corriendo.';
    }
    return error instanceof Error ? error.message : String(error);
  }

  eliminarDato(elemento: ListModel): void {
    const confimacion = confirm(`¿Está seguro de eliminar el elemento "${elemento.name}"?`);
    if (!confimacion) {
      return;
    }
    this.apiServide.deleteList(elemento.id).subscribe({
      next: () => {
        this.cargarDatos();
      },
      error: (error) => {
        this.error.set(this.mensajeError(error));
      },
    });
  }
}
