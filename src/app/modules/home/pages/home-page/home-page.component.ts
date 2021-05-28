import { Component, OnInit } from '@angular/core';

import { HomePageService } from './service/home-page.service';
import { baseUrl } from '../../../../../environments/environment';
import { LoaderService } from 'src/app/shared/components/loader/services/loader.service';
import { DropDownItem, SWItem } from './models/home-page.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  allSWData: SWItem[];
  allSWDataToDisplay: SWItem[];
  allSWDataMappedForTable: SWItem[];

  collectionSize: number;
  page = 1;
  pageSize = 10;
  maxPageSize = 5;

  cats: DropDownItem[] = [
    { value: 'all', selected: true },
    { value: 'people', selected: false },
    { value: 'planets', selected: false },
    { value: 'films', selected: false },
    { value: 'species', selected: false },
    { value: 'vehicles', selected: false },
    { value: 'starships', selected: false }
  ];
  selectedCategory = 'all';

  dataToSearch: any[] = [];

  dataForModal: SWItem;
  modalHeaderText = 'Details';
  showModal = false;

  constructor(
    private homePageService: HomePageService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.homePageService.getAllItems(baseUrl);
    this.loaderService.loaderSubject.next(true);
    this.homePageService.itemsSubject.subscribe((data: SWItem[]) => {
      this.allSWData = [...data];
      this.allSWDataToDisplay = [...data];
      this.collectionSize = data.length;
      this.loaderService.loaderSubject.next(false);
      this.refreshTableItems();
    });
  }

  onSearch(event: string) {
    if (!this.dataToSearch.length) {
      this.dataToSearch = [...this.allSWDataToDisplay];
    }

    if (!event) {
      this.onCategorySelected({ value: this.selectedCategory, selected: true });
      return;
    }

    const filteredBySearch = this.dataToSearch.filter((obj: any) => JSON.stringify(obj).toLowerCase().includes(event.toLowerCase()));
    this.allSWDataToDisplay = [...filteredBySearch];
    this.collectionSize = filteredBySearch.length;
    this.refreshTableItems();
  }

  refreshTableItems() {
    this.allSWDataMappedForTable = this.allSWDataToDisplay
      .map((item: any, i: number) => ({id: i + 1, ...item}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onCategorySelected(event: DropDownItem) {
    this.selectedCategory = event.value;
    this.dataToSearch = [];

    if (this.selectedCategory === 'all') {
      this.allSWDataToDisplay = [...this.allSWData];
      this.collectionSize = this.allSWData.length;
      this.refreshTableItems();
      return;
    }

    const filteredByCategory = this.allSWData.filter(item => item.category === this.selectedCategory);
    this.allSWDataToDisplay = [...filteredByCategory];
    this.collectionSize = filteredByCategory.length;
    this.refreshTableItems();
  }

  onViewDetails(data: SWItem) {
    this.showModal = true;
    this.dataForModal = data;
  }

  onCloseModal(event: boolean) {
    this.showModal = event;
  }
}
