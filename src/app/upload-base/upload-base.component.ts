import {Component, Input, OnInit} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import { ProfileService, Profile, TempProfile } from '../profile.service';
import { UploadModalComponent } from '../upload-modal/upload-modal.component';

@Component({
  selector: 'upload-base',
  templateUrl: './upload-base.component.html'
})
export class UploadBaseComponent {

  constructor(private modalService: NgbModal) { }


  open() {
    const modalRef = this.modalService.open(UploadModalComponent);
    modalRef.result.then(what => console.log(what));

  }

}
