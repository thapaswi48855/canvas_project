import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CounterComponent } from './counter/counter.component';
import { WeatherComponent } from './weather/weather.component';
import { StoreModule } from '@ngrx/store';
import { counterReducer } from './store/counter.reducer';
// import { BootstrapModule } from './an'
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    WeatherComponent,
    HeaderComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,
    AppRoutingModule,StoreModule.forRoot({ counters: counterReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
