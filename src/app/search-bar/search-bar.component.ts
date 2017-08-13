import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Profile, ProfileService } from '../profile.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() onSearch = new EventEmitter<string>();

  constructor(private profileService: ProfileService, private router: Router) { }

  currentProfiles: Profile[];
  searchTerm: string = '';
  visible: boolean = false;

  nameFilter: any = { lastName: '' };

  ngOnInit() {
    this.profileService.getProfiles().then(profiles => { console.log(profiles); this.currentProfiles = profiles });
  }



  searchUsers(f: NgForm) {
    console.log(f.value.searchTerm);
    this.nameFilter.lastName = f.value.searchTerm;
    this.onSearch.emit(f.value);
    if (this.nameFilter.lastName.length > 0) {
      this.visible = true;
    }
  }

  test() {
    console.log("it worked");
  }

  hide() {
    this.visible = false;
  }

  goToProfile(id) {
    console.log(id);
    this.visible = false;
    this.router.navigate(['/profile/' + id]);
  }

}
