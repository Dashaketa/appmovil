import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private router: Router) { }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() {
  }
  
  user = {
    usuario: "",
    password: ""
  }

  ingresar(){
    let navigationextras: NavigationExtras = {
      state: {
        user: this.user
      }
    };
    this.router.navigate(['/home'], navigationextras)
  }

}
