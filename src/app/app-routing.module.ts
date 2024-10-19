import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { WeatherComponent } from './weather/weather.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path:'',component:HeaderComponent},
  {path:'counter',component:CounterComponent},
  {path:'vatavaran',component:WeatherComponent},
  {path:'users',component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
