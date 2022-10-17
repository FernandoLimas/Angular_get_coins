import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { CoinsServiceService } from './services/coins-service.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [ CoinsServiceService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
