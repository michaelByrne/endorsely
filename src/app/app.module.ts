import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent }  from './app.component';
// import { ImportContactsComponent } from './import-contacts.component';
// import { LoginComponent } from './login.component';
// import { UploadModalComponent, UploadModalContent } from './upload-modal.component';
import { ProfileService } from './profile.service';
// import { ProfileComponent } from './profile.component';
// import { ImportService } from './contact-import.service';
// import { HeaderService } from './header.service';

import { Angular2SocialLoginModule } from "angular2-social-login";
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadBaseComponent } from './upload-base/upload-base.component';
import { UploadModalComponent } from './upload-modal/upload-modal.component';

let providers = {
  "linkedin": {
    "clientId": "86s8ieyp5jk1fs"
  }
};

@NgModule({
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    CollapseModule.forRoot(),
    AppRoutingModule,
    Angular2SocialLoginModule,
    HttpModule,
    FormsModule,

  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    UploadBaseComponent,
    UploadModalComponent,

    // ImportContactsComponent,


  ],
  bootstrap: [AppComponent],
  entryComponents: [UploadModalComponent],
  providers: [ProfileService]
})
export class AppModule {
  constructor(router: Router) { };
}

Angular2SocialLoginModule.loadProvidersScripts(providers);
