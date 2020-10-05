import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../Services/user.service';
import { User } from './User';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertItem } from '../helpers/AlertItem';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
user:User;
alertItem:AlertItem;
constructor(
  public router: Router,
  private userService:UserService
  ){
  this.userService.loggedUser.subscribe(res => this.user = res);
  this.alertItem = new AlertItem();
}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const value = this.user? this.user.token : '';
    const modifiedReq = req.clone({
      headers: req.headers.append('token', `${value}`),
    });
    return next.handle(modifiedReq);
  }
}
