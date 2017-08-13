import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import 'rxjs/add/operator/switchMap';
import { Subscription } from 'rxjs/Subscription';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ProfileService, Profile } from '../profile.service';
import { UIStateService } from '../ui-state.service';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'profile-component',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profiles: Profile[];
  currentProfile: Profile;
  viewedProfile: Profile;
  subscriptionOne: Subscription;
  subscriptionTwo: Subscription;
  subscriptionThree: Subscription;
  addedNew: boolean = false;
  searchTerm: string = '';



  constructor(
    private profileService: ProfileService,
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private uiState: UIStateService,
    private location: Location) {
    this.subscriptionOne = this.profileService.getRxProfile().subscribe(profile => { this.currentProfile = profile });
    this.subscriptionTwo = this.profileService.getRxViewedProfile().subscribe(profile => { console.log(profile); this.viewedProfile = profile });
    this.subscriptionThree = this.route.params.subscribe(params => {
      console.log(params.id);
      this.profileService.getProfileByID(params.id).then(profile => { console.log(profile); this.viewedProfile = profile });
    });
  }


  ngOnInit(): void {

  };

  onSearch(term: any) {
    console.log(term.searchTerm);
    this.searchTerm = term.searchTerm;
  }

  openImport() {
    const modalRef = this.modalService.open(UploadModalComponent);
  }


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
    this.subscriptionOne.unsubscribe();
    this.subscriptionTwo.unsubscribe();
    this.subscriptionThree.unsubscribe();
  }

}
