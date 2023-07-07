import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TableContainerComponent } from './containers/table-container/table-container.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {NgxsModule} from "@ngxs/store";
import {ProductsState} from "./store/products.state";
import { UpdateContainerComponent } from './containers/update-container/update-container.component';
import {RegisterFormComponent} from "./components/register-form/register-form.component";
import {RegisterContainerComponent} from "./containers/register-container/register-container.component";

@NgModule({
  declarations: [
    AppComponent,
    TableContainerComponent,
    TableComponent,
    HeaderComponent,
    RegisterFormComponent,
    RegisterContainerComponent,
    UpdateContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    NgxsModule.forRoot([ProductsState], {
      developmentMode: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
