import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { Router } from '@angular/router';


declare var IN: any;


@Component({
  selector: 'login',
  template: `
  <div class="container ln-login">
    <a class="btn btn-social btn-linkedin" (click)="signIn('linkedin')"><span class="fa fa-linkedin"></span>Login with LinkedIn</a></div>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  public user;
  sub: any;
  constructor(public _auth: AuthService, private router: Router) { };

  signIn(provider) {
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data);
        this.user = data;
        let firstName = this.user.name.split(" ")[0];
        let lastName = this.user.name.split(" ")[1];
        this.router.navigate(['/profile', this.user.uid, firstName, lastName]);
      }
    )
  }

  logout() {
    this._auth.logout().subscribe(
      (data) => { console.log(data); this.user = null; }
    )
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
