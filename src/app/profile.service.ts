import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


export class Profile {
  constructor(public linkedInId: string,
    public firstName: string,
    public lastName: string,
  ) { }
}

export class TempProfile {
  constructor(public firstName: string,
    public lastName: string,
    public email: string,
  ) { }
}

@Injectable()
export class ProfileService {
  constructor(private http: Http) { }
  public currentProfile: Profile;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private profilesUrl = 'https://sleepy-beyond-77887.herokuapp.com/profiles';

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

  getLoggedInProfile(): Profile {
    return this.currentProfile;
  }

  putLoggedInProfile(profile: Profile): void {
    this.currentProfile = profile;
    console.log(this.currentProfile);
  }

  addProfile(id: string, firstName: string, lastName: string): Promise<Profile> {
    return this.http.post(this.profilesUrl, JSON.stringify({ id: id, firstName: firstName, lastName: lastName }), { headers: this.headers })
      .toPromise()
      .then(res => { this.currentProfile = res.json(); return res.json() as Profile })
      .catch(this.handleError);
  }

  inviteUsers(invites: TempProfile[]): Promise<any> {
    return this.http.post(this.profilesUrl + '/invites', JSON.stringify(invites), { headers: this.headers })
      .toPromise()
      .then(res => res)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error("an error happened here", error);
    return Promise.reject(error.message || error);
  }
}
