import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() onValueChange = new EventEmitter<string>();

  searchText = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSearch() {
    this.onValueChange.emit(this.searchText);
  }

}
