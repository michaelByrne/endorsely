import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// import { ImportContactsComponent } from './import-contacts.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';



const appRoutes: Routes = [
  // { path: 'import-ctx', component: ImportContactsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileComponent },
  { path: '*', component: AppComponent }
  // { path: 'profiles', component: ProfileComponent },
  // { path: 'profile/:id/:firstName/:lastName', component: ProfileComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
