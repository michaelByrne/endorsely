import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { Profile, ProfileService } from '../profile.service';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  @Output() onSearch = new EventEmitter<string>();

  constructor(private profileService: ProfileService) { }

  currentProfiles: Profile[];
  searchTerm: string = '';

  ngOnInit() {
    this.profileService.getProfiles().then(profiles => { console.log(profiles); this.currentProfiles = profiles });
  }

  searchUsers(f: NgForm) {
    console.log(f.value);
    this.onSearch.emit(f.value);
  }

}
