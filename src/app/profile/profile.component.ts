import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { ProfileService, Profile } from '../profile.service';
import { UIStateService } from '../ui-state.service';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profiles: Profile[];
  currentProfile: Profile;
  subscription: Subscription;
  addedNew: boolean = false;

  constructor(
    private profileService: ProfileService,
    private route: ActivatedRoute,
    private uiState: UIStateService,
    private location: Location) {
    this.subscription = this.profileService.getRxProfile().subscribe(profile => { this.currentProfile = profile });
  }


  ngOnInit(): void {
    if (this.profileService.getLoggedInProfile()) {
      this.currentProfile = this.profileService.getLoggedInProfile();
    }
    else {
      console.log("no profile");
    }
  };


  fetchProfiles(): void {
    this.profileService.getProfiles().then(profiles => { this.profiles = profiles; console.log(profiles) });
  }



  public isCollapsed: boolean = true;

  public collapsed(event: any): void {
    console.log(event);
  }

  public expanded(event: any): void {
    console.log(event);
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
