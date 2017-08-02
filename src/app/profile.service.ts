// TODO: Update API to handle inactive users
// Done 7-31: updated add profile function in service

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

import { UUID } from 'angular2-uuid';


export class Profile {
  constructor(
    public firstName: string,
    public lastName: string,
    public linkedInID: string = null,
    public email: string = null,
    public publicProfileUrl: string = null,
    public active: boolean = false,
    public endorsements: number = 10,
    public endorsementsReceived: number = 0,
    public id: string = UUID.UUID()
  ) {

  }
}

export class TempProfile {
  constructor(public firstName: string,
    public lastName: string,
    public email: string,
  ) { }
}

@Injectable()
export class ProfileService {
  constructor(private http: Http) {

  }
  public currentProfile: Profile;
  private rxProfile = new Subject<Profile>();
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private profilesUrl = 'https://sleepy-beyond-77887.herokuapp.com/profiles';



  sendRxProfile(profile: Profile) {
    this.rxProfile.next(profile);
  }

  getRxProfile(): Observable<Profile> {
    return this.rxProfile.asObservable();
  }

  getProfiles(): Promise<Profile[]> {
    console.log("getting profiles");
    return this.http.get(this.profilesUrl)
      .toPromise()
      .then(response => response.json() as Profile[])
      .catch(this.handleError);

  };

  getProfile(uid: string): Promise<Profile> {
    const url = `${this.profilesUrl}/${uid}`;
    console.log(uid);
    return this.http.get(url)
      .toPromise()
      .then(response => { this.currentProfile = response.json(); return response.json() as Profile })
      .catch(this.handleError);
  }

  updateEndorsement(profile: Profile): Promise<Profile> {
    const url = `${this.profilesUrl}/${profile.id}`;
    return this.http.put(url, profile)
      .toPromise()
      .then(response => { console.log(response); return response.json() as Profile })
  }

  updateProfile(uid: string): Promise<Profile> {
    const url = `${this.profilesUrl}/${uid}`;
    return this.http.put(url, this.currentProfile)
      .toPromise()
      .then(response => { console.log(response); return response.json() as Profile });
  }

  getLoggedInProfile(): Profile {
    if (this.currentProfile) {
      this.sendRxProfile(this.currentProfile);
    }
    return this.currentProfile;
  }

  putLoggedInProfile(profile: Profile): void {
    this.currentProfile = profile;
    this.updateProfile(this.currentProfile.id);
  }

  addProfile(firstName: string, lastName: string, imageUrl: string, active: boolean, linkedInId: string): Promise<Profile> {
    let newProfile = new Profile(firstName, lastName, linkedInId, null, imageUrl, true);
    console.log(newProfile)
    return this.http.post(this.profilesUrl, JSON.stringify(newProfile), { headers: this.headers })
      .toPromise()
      .then(res => { this.currentProfile = res.json(); return res.json() as Profile })
      .catch(this.handleError);
  }

  addInactive(firstName: string, lastName: string, imageUrl: string, active: boolean): Promise<Profile> {
    let newProfile = new Profile(firstName, lastName, imageUrl);
    return this.http.post(this.profilesUrl, JSON.stringify(newProfile), { headers: this.headers })
      .toPromise()
      .then(res => { this.currentProfile = res.json(); return res.json() as Profile })
      .catch(this.handleError);
  }


  private handleError(error: any): Promise<any> {
    console.error("an error happened here", error);
    return Promise.reject(error.message || error);
  }
}
