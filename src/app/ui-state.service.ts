import { Injectable } from '@angular/core';
import { Profile, TempProfile } from './profile.service';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';



export class UIState {
  constructor(
    public loggedIn: Subject<boolean>,
    public currentProfile: Profile,
    public currentMembers: Profile[]
  ) { }
}


@Injectable()
export class UIStateService {
  state: UIState;
  private loggedIn = new Subject<boolean>();

  sendLoggedState(logged: boolean) {
    console.log(logged);
    this.loggedIn.next(logged);
  }

  getLoggedState(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }
}
