import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';


import { Profile, TempProfile, ProfileService } from '../profile.service';
import { ProfileComponent } from './../profile/profile.component';


@Component({
  selector: 'app-contacts-modal',
  templateUrl: './contacts-modal.component.html',
  styleUrls: ['./contacts-modal.component.css'],

})
export class ContactsModalComponent implements OnInit {

  currentProfiles: Profile[];
  public searchText: any = { lastName: '' };

  constructor(private profileService: ProfileService) { }



  ngOnInit() {
    this.profileService.getProfiles().then(profiles => { console.log(profiles); this.currentProfiles = profiles });
  }



}
