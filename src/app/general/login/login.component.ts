import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { LocalInformation } from 'src/app/models/LocalInfo';
import { ConfigurationModel } from 'src/app/models/Configuration';
import { ConfigService } from 'src/app/Services/config.service';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup:FormGroup;
  loading = false;
  config:ConfigurationModel;
  alertItem: any;
  rememberUser:boolean = false;
  constructor(private userService:UserService, private router: Router, private configService:ConfigService) {

    this.alertItem = new AlertItem();
    this.formGroup = new FormGroup({
      email: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required),
      rememberme: new FormControl('')
    });
    this.config = new ConfigurationModel();
    this.configService.get().subscribe(res => {
      this.config = res[0];
    })
  }

  ngOnInit() {
    this.validateLoggedUser();
    if(window.localStorage.getItem('AssetAppDataUserName')){
      this.formGroup.controls['rememberme'].setValue(true);
      this.rememberUser = true;
      this.formGroup.controls['email'].setValue(window.localStorage.getItem('AssetAppDataUserName'))
    }

  }

  validateLoggedUser(){
    let loggedUser:User;
       let data = <LocalInformation> JSON.parse(window.localStorage.getItem('AssetAppData'));
       if(data){
         if(new Date(data.expire) > new Date()){
           loggedUser = new User();
           loggedUser.id = data.id;
           loggedUser.email = data.email;
           loggedUser.lastName = data.lastName;
           loggedUser.type = data.type;
           loggedUser.token = data.key;
           loggedUser.firstName = data.firstName;
           loggedUser.permissions = data.permissions;
           this.userService.loggedUser.next(loggedUser);
           this.router.navigate(['/assets-list']);
         }
       }
   }

   login():void {
     let pass = window.btoa(this.formGroup.controls["password"].value);
     const user = new User();
     user.password = pass;
     user.email = this.formGroup.controls["email"].value;
     this.loading = true;
     this.userService.login(user).subscribe(res => {
       this.userService.loggedUser.next(res);
       this.saveLocalData(res);
       this.router.navigate(['/assets-list']);
     },err => {

        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.alertItem.type = 'error';
            this.alertItem.title = 'Error';
            this.alertItem.text = 'Usuario no Autorizado'
            this.alertItem.timer = 2900;
            this.alertItem.Show().then(res => {
              this.router.navigate(['/login']);
            })
          }
        }

       this.loading = false;
     });
   }

   onKeydown(event) {
    if (event.key === "Enter") {
     this.login();
    }
  }

  rememberme($event:any){
    debugger;
    if($event.checked){
      window.localStorage.setItem('AssetAppDataUserName', this.formGroup.controls['email'].value);
      this.rememberUser = true;
    }else{
      this.rememberUser = false;
      window.localStorage.removeItem('AssetAppDataUserName');
    }
  }

   saveLocalData(res:User){
     let localData = new LocalInformation();
     localData.id = res.id;
     localData.firstName = res.firstName;
     localData.lastName = res.lastName;
     localData.email = res.email;
     localData.key = res.token;
     localData.type = res.type;
     localData.permissions = res.permissions;
     localData.expire = new Date(Date.now() + (30 * 60 * 1000));
     window.localStorage.setItem('AssetAppData', JSON.stringify(localData));
     if(this.rememberUser){
      this.rememberme({checked:true});
     }
   }

}
