import {Component, Input, OnInit} from '@angular/core';


import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { UUID } from 'angular2-uuid';

import { ProfileService, Profile, TempProfile } from '../profile.service';

@Component({
  selector: 'upload-modal',
  templateUrl: './upload-modal.component.html',
  styleUrls: ['./upload-modal.component.css']
})
export class UploadModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, public profileService: ProfileService) { }


  connex: string[][];
  currentProfile: any;
  selectedContact: TempProfile;
  invites: Profile[] = new Array();
  requestConfirmation: boolean = false;




  ngOnInit(): void {
    this.currentProfile = this.profileService.getLoggedInProfile();
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
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i = 0; i < allTextLines.length; i++) {
      var data = allTextLines[i].split(',');
      var tarr = [];
      for (var j = 0; j < data.length; j++) {
        if (j == 1)
          tarr.push(data[j].replace(/['"]+/g, ''));
        else if (j == 3)
          tarr.push(data[j].replace(/['"]+/g, ''));
        else if (j == 5)
          tarr.push(data[j].replace(/['"]+/g, ''));
      }
      if (tarr[2])
        lines.push(tarr);
    }
    lines.shift();
    this.connex = lines;
  }

  onSelect(contact: string[]): void {
    console.log(this.currentProfile.endorsements);
    if (this.currentProfile.endorsements > 0) {
      console.log(contact);
      let newContact = new Profile(contact[0], contact[1], null, contact[2]);
      console.log(newContact);
      this.invites.push(newContact);
      this.currentProfile.endorsements--;
    }
  }

  isInvited(contact: string[]): boolean {
    return this.invites.filter(function(invite) { return invite.email === contact[2] }).length > 0;
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


}
