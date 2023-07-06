import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableContainerComponent } from './containers/table-container/table-container.component';

const routes: Routes = [
  { path: '', component: TableContainerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
