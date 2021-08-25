import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PepperListComponent } from './pepper-list/pepper-list.component';
import {HttpClientModule} from '@angular/common/http';
import { PepperAdderComponent } from './pepper-adder/pepper-adder.component';
import { PepperCardComponent } from './pepper-card/pepper-card.component'


@NgModule({
  declarations: [
    AppComponent,
    PepperListComponent,
    PepperAdderComponent,
    PepperCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
