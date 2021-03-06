// Built-in Angular modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


// Outside modules
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterPipeModule } from 'ngx-filter-pipe';

// Outside Services
import { UUID } from 'angular2-uuid';

// Routes
import { AppRoutingModule } from './app-routing.module';

// Services
import { ProfileService } from './profile.service';
import { UIStateService } from './ui-state.service';
import { LinkedService } from './linked.service';

// Directives
import { ClickOutsideDirective } from './click-outside.directive';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UploadModalComponent } from './upload-modal/upload-modal.component';
import { ContactsModalComponent } from './contacts-modal/contacts-modal.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchOutputComponent } from './search-output/search-output.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

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
    FilterPipeModule


  ],
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    UploadModalComponent,
    ContactsModalComponent,
    SearchBarComponent,
    SearchOutputComponent,
    NavBarComponent,
    ClickOutsideDirective
  ],
  bootstrap: [AppComponent],
  entryComponents: [UploadModalComponent, ContactsModalComponent],
  providers: [
    LinkedService,
    UUID,
    ProfileService,
    UIStateService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
})
export class AppModule {
  constructor(router: Router) { };
}

Angular2SocialLoginModule.loadProvidersScripts(providers);
