import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private userService: UsersService, private router: Router) { }

  canActivate(): boolean {
    //if (this.userService.isAuthorized()) {
      return true;
   // } else {
    //  this.router.navigate(['/login']);
   //   return false;
   // }
  }



}
