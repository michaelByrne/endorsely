import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import { ProfileService, Profile } from '../profile.service';

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
    private location: Location) {
    this.subscription = this.profileService.getRxProfile().subscribe(profile => { this.currentProfile = profile });
  }


  ngOnInit(): void {
    if (this.profileService.getLoggedInProfile()) {
      this.currentProfile = this.profileService.getLoggedInProfile();
    }
    else {
      let id = this.route.snapshot.params['id'];
      let firstName = this.route.snapshot.params['firstName'];
      let lastName = this.route.snapshot.params['lastName'];
      this.route.paramMap
        .switchMap((params: ParamMap) => this.profileService.getProfile(id))
        .subscribe(profile => {
          this.currentProfile = profile;
          console.log(profile);
          if (!profile) {
            this.profileService.addProfile(id, firstName, lastName).then(profile => {
              this.currentProfile = profile;
              console.log(profile);
              this.addedNew = true;
            });
          }
        });
    }
  };


  fetchProfiles(): void {
    this.profileService.getProfiles().then(profiles => { this.profiles = profiles; console.log(profiles) });
  }

  addProfile(): void {
    this.profileService.addProfile("001", "mr", "burns");
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