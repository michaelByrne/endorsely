import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { UIStateService } from './ui-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router, private stateService: UIStateService) {
    this.subscription = this.stateService.getLoggedState().subscribe(loggedState => { this.loggedState = loggedState });
  };
  title = 'app';
  subscription: Subscription;
  loggedState: boolean = false;


  goToLogin() {
    this.router.navigate(['/login']);
  }
}
