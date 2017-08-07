import { Component, OnInit, Input } from '@angular/core';

import { Profile, ProfileService } from '../profile.service'

@Component({
  selector: 'app-search-output',
  templateUrl: './search-output.component.html',
  styleUrls: ['./search-output.component.css']
})
export class SearchOutputComponent implements OnInit {

  private _searchTerm = '';
  public searchObject = { fullName: '' };

  @Input()
  set searchTerm(searchTerm: string) {
    this._searchTerm = searchTerm;
    this.searchObject.fullName = searchTerm;
    console.log(searchTerm);
  }

  get searchTerm(): string { return this._searchTerm; }


  @Input() currentProfiles: Profile[];

  constructor() { }



  ngOnInit() {
    console.log(this.currentProfiles);
  }

  showAll() {
    this.searchObject.fullName = '';
  }

}
