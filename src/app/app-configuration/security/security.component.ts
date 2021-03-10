import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/models/User';
import { AlertItem } from 'src/app/helpers/AlertItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  user:User;
  _jsonURL = 'assets/securityItems.json';
  formGroup:FormGroup;
  Permissions:any;
  users:Array<User>;
  alertComponent:AlertItem;

  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  constructor(private http:HttpClient,
    private userService: UserService,
    public router: Router) {
    this.formGroup = new FormGroup({});
    this.getJSON().subscribe(res =>{
      let config = {};
      res.forEach(it => {
        it.permissions.forEach(el => {
          config[el.value] = new FormControl('');
        });
      });
      this.formGroup = new FormGroup(config);
      this.Permissions = res;
    });

    this.alertComponent = new AlertItem();
    this.alertComponent.timer = 2500;
  }

  ngOnInit() {
    this.userService.get().subscribe(res => this.users = res);
  }

  selectUser($event){
    this.user = this.users.find(x=> x.id == $event.value);
    let values = this.user.permissions.split(';');
    values.forEach(it => {
      if(it.length>0){
        try{
          this.formGroup.controls[it].setValue(true);
        }catch(err){
          console.log(it);
        }
      }
    });
  }

  savePermission(){
    let perms = '';
    this.Permissions.forEach(it => {
      it.permissions.forEach(el => {
        let ctl = this.formGroup.controls[el.value];
        if(ctl){
          if(ctl.value == true){
            perms += `${el.value};`;
          }
        }
      });
    });
    this.user.permissions = perms;
    this.userService.edit(this.user, this.user.id).subscribe(res => {
      this.alertComponent.text = 'Estado del Acrticulo modificado exitosamente!';
      this.alertComponent.type = 'success';
      this.alertComponent.Show();
    });
  }

  selectAll($event){
    let value = false;
    if($event.checked){
      value = true;
    }else{
      value = false;
    }
    this.Permissions.forEach(it => {
      it.permissions.forEach(el => {
        let ctl = this.formGroup.controls[el.value];
        if(ctl){
          ctl.setValue(value);
        }
      });
    });
  }

  cancel(){
    this.router.navigate(['/user-list']);
  }

}
