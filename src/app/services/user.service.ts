import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin:boolean=false;
  email:string='';
  isLoggedIn:boolean = false;
  constructor() { }
}
