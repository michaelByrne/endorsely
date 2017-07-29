import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ProfileService, Profile, TempProfile } from '../profile.service';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';
import { ContactsModalComponent } from '../contacts-modal/contacts-modal.component';

@Component({
  selector: 'upload-base',
  templateUrl: './upload-base.component.html'
})
export class UploadBaseComponent {

  constructor(private modalService: NgbModal) { }


  openImport() {
    const modalRef = this.modalService.open(UploadModalComponent);
  }

  openContacts() {
    const modalRef = this.modalService.open(ContactsModalComponent);
  }

}
