import { Component } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  usersList=[
    {imagUrl:'./assets/th.jpg',name:'Robert Whistable',designation:'Product Manager',projects:'30',tasks:'25',insight:'20'},
    {imagUrl:'./assets/th (1).jpg',name:'Francois Boateng',designation:'Product Manager',projects:'35',tasks:'20',insight:'10'},
    {imagUrl:'./assets/th (5).jpg',name:'Elliot Bradbury',designation:'Product Manager',projects:'40',tasks:'35',insight:'30'},
    {imagUrl:'./assets/th.jpg',name:'Carlos Heroa',designation:'Product Manager',projects:'20',tasks:'15',insight:'25'},
    {imagUrl:'./assets/th (4).jpg',name:'Louise Redknapp',designation:'Product Manager',projects:'30',tasks:'30',insight:'35'},
    {imagUrl:'./assets/th (3).jpg',name:'Emili Rose',designation:'Product Manager',projects:'50',tasks:'20',insight:'40'},
    {imagUrl:'./assets/th (2).jpg',name:'Sophie Bunn',designation:'Product Manager',projects:'45',tasks:'50',insight:'38'}
  ]

}
