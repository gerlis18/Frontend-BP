import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TableContainerComponent } from './containers/table-container/table-container.component';
import {RegisterContainerComponent} from "./containers/register-container/register-container.component";
import {UpdateContainerComponent} from "./containers/update-container/update-container.component";

const routes: Routes = [
  { path: '', component: TableContainerComponent },
  { path: 'add-product', component: RegisterContainerComponent },
  { path: 'update-product/:productId', component: UpdateContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
