import { Routes } from '@angular/router';
import { ToDoList } from './features/components/to-do-list/to-do-list';
import { ToDoV2 } from './features/components/to-do-v2/to-do-v2';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listado-de-tareas',
    pathMatch: 'full',
  },
  {
    path: 'listado-de-tareas',
    component: ToDoList,
  },
  {
    path: 'list-v2',
    component: ToDoV2,
  },
];
