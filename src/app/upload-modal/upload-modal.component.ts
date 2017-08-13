import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'angular2-uuid';

import { ProfileService, Profile, TempProfile } from '../profile.service';

@Component({
  selector: 'upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public profileService: ProfileService, public router: Router) { }


  connex: string[][];
  currentProfile: any;
  selectedContact: TempProfile;
  invites: Profile[] = new Array();
  currentProfiles: Profile[] = new Array();
  incomingProfiles: Profile[] = new Array();
  requestConfirmation: boolean = false;
  public searchText: any = { lastName: '' };



  ngOnInit(): void {
    this.currentProfile = this.profileService.getLoggedInProfile();
    this.profileService.getProfiles().then(profiles => { console.log(profiles); this.currentProfiles = profiles });
    console.log(this.currentProfile);

  }

  changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {
    var file: File = inputValue.files[0];
    var myReader: FileReader = new FileReader();
    var p = this;

    myReader.onloadend = function(e) {
      p.processData(myReader.result);
    }

    myReader.readAsText(file, 'iso-8859-2');
  }

  processData(csv: any) {
    console.log(this.currentProfiles);
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    var profiles = [];
    for (var i = 0; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(',');
      var tarr = [];
      for (var j = 0; j < data.length; j++) {
        if (j == 1)
          tarr.push(data[j].replace(/['"]+/g, ''));
        else if (j == 3) {
          tarr.push(data[j].replace(/['"]+/g, ''));
          var fullName = tarr[0] + " " + tarr[1];
          tarr.push(fullName);
        }
        else if (j == 5) {
          tarr.push(data[j].replace(/['"]+/g, ''));
          var id;
          var exists = this.currentProfiles.filter(function(profile) { id = profile.id; return profile.email === eval(data[j]) && profile.active == true }).length > 0;
          if (exists) {
            tarr.push(true);
          }
          else {
            tarr.push(false);
          }
          tarr.push(data[31].replace(/['"]+/g, ''));
          tarr.push(data[29].replace(/['"]+/g, ''));
        }

      }
      if (tarr[2]) {
        lines.push(tarr);
        let tempProfile = new Profile(tarr[0], tarr[1], tarr[2], null, tarr[3], null, tarr[4], null, tarr[5], tarr[6], 10, 0, tarr[7] || null);
        profiles.push(tempProfile);
      }
      // console.log(profiles);
      // console.log(tarr);
    }
    lines.shift();
    profiles.shift();
    this.connex = lines;
    this.incomingProfiles = profiles;
    console.log(this.incomingProfiles);
  }

  onSelect(contact: Profile): void {
    console.log(this.currentProfile.endorsements);
    if (this.currentProfile.endorsements > 0) {
      contact.endorsementsReceived++;
      this.invites.push(contact);
      this.currentProfile.endorsements--;
    }
  }

  isInvited(contact: Profile): boolean {
    return this.invites.filter(function(invite) { return invite.email === contact.email }).length > 0;
  }

  advanceToConfirmation(): void {
    this.requestConfirmation = true;
  }

  confirmInvites(): void {
    this.profileService.addInactiveBatch(this.invites);
    this.profileService.putLoggedInProfile(this.currentProfile);
    this.profileService.sendRxProfile(this.currentProfile);
    this.activeModal.dismiss();
  }

  goToProfile(profile: Profile): void {
    this.profileService.sendRxViewedProfile(profile);
    console.log(profile);
    this.router.navigate(['/profile/' + profile.id]);
    this.activeModal.dismiss();
  }


}
