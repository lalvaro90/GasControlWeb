import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../Services/user.service';
import { User } from '../models/User';
import { AlertItem } from './AlertItem';
import { LocalInformation } from '../models/LocalInfo';


@Injectable()
export class AuthGuardService implements CanActivate {
  loggedUser: User;
  alertComponent: AlertItem;
  constructor(private userService: UserService, public router: Router) {
    userService.loggedUser.subscribe(res => this.loggedUser = res);
    this.alertComponent = new AlertItem();
    this.alertComponent.timer = 3000;
    this.alertComponent.position = 'top-rigth';
    this.alertComponent.showCloseButton = false;
  }


  canActivate(route: ActivatedRouteSnapshot): boolean {

    const expectRole = route.data.expectedRole;
    if (!this.loggedUser) {
      this.router.navigate(['login']);
      return false;
    } else if (this.loggedUser.permissions.indexOf(expectRole) < 0) {
      this.alertComponent.title = "Error!";
      this.alertComponent.text = 'Usuario no tiene permisos suficuentes para acceder esta funcion';
      this.alertComponent.type = 'error';
      this.alertComponent.Show();
      return false;
    }
    return true;
  }
}
