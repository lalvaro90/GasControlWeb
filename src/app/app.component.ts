import { Component } from '@angular/core';
import { User } from './models/User';
import { UserService } from './Services/user.service';
import { LocalInformation } from './models/LocalInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Control de Combustible';
  user:User;
  logged = false;

  constructor(private userService: UserService, private router: Router){

  }

  ngOnInit(){
    this.userService.loggedUser.subscribe(res => {
      this.user = res;
      if(res)
        this.logged = true;
    });
  }

  logout(){
    window.localStorage.removeItem('AssetAppData');
    this.router.navigate(['/login']);
    this.logged = false;
    this.userService.loggedUser.next(undefined);
  }
}
