import { Component, OnInit } from '@angular/core';

import { Profile, ProfileService } from '../profile.service';

import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { UploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  currentProfile: Profile;

  constructor(private profileService: ProfileService, private modalService: NgbModal) { }

  ngOnInit(): void {
    if (this.profileService.getLoggedInProfile()) {
      this.currentProfile = this.profileService.getLoggedInProfile();
      console.log(this.currentProfile);
    }
    else {
      console.log("no profile");
    }
  };

  openImport() {
    const modalRef = this.modalService.open(UploadModalComponent);
  }

}
