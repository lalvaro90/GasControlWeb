import { Component } from '@angular/core';
import { User } from './models/User';
import { UserService } from './Services/user.service';
import { LocalInformation } from './models/LocalInfo';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Control de Combustible';
  user:User;
  logged = of(false);

  constructor(private userService: UserService, private router: Router){
    this.userService.loggedUser.subscribe(res => {
      if(res){
        this.user = res;
        this.logged = of(true);
      }else{
        this.user = new User();
      }
    });
  }

  ngOnInit(){
    
  }

  ngAfterInit(){

  }

  logout(){
    window.localStorage.removeItem('AssetAppData');
    this.router.navigate(['/login']);
    this.logged = of(false);
    this.userService.loggedUser.next(undefined);
  }
}
