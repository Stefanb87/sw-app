import { Component, OnInit } from '@angular/core';

import { HomePageService } from './service/home-page.service';
import { baseUrl } from '../../../../../environments/environment';
import { LoaderService } from 'src/app/shared/components/loader/services/loader.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  collectionSize: number;
  page = 1;
  pageSize = 10;
  maxPageSize = 5;
  allSWData: any[];
  allSWDataToDisplay: any[];
  allSWDataMapped: any[];
  cats: any[] = [
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
  dataForModal: any;
  modalHeaderText = 'Details';
  showModal = false;

  constructor(
    private homePageService: HomePageService,
    private loaderService: LoaderService
  ) { }

  ngOnInit(): void {
    this.homePageService.getAllItems(baseUrl);

    this.homePageService.itemsSubject.pipe().subscribe((data: any[]) => {
      data.forEach((item: any) => {
        for (let prop in item) {
          if (typeof item[prop] !== 'string') {
            delete item[prop];
          }
        }
      });
      this.allSWData = data;
      this.allSWDataToDisplay = data;
      this.collectionSize = data.length;
      this.loaderService.loaderSubject.next(false);
      this.refreshItems();
    });
  }

  onSearch(event: string) {
    if (!this.dataToSearch.length) {
      this.dataToSearch = [...this.allSWDataToDisplay];
    }

    if (!event) {
      this.allSWDataToDisplay = [...this.allSWData];
      this.dataToSearch = [];
      this.collectionSize = this.allSWData.length;
      this.refreshItems();

      const filtered = this.allSWData.filter(item => item.category === this.selectedCategory);
      this.allSWDataToDisplay = [...filtered];
      this.collectionSize = filtered.length;
      this.dataToSearch = [];
      this.refreshItems();
      return;
    }

    const res = this.dataToSearch.filter((obj: any) => JSON.stringify(obj).toLowerCase().includes(event.toLowerCase()));
    this.allSWDataToDisplay = [...res];
    this.collectionSize = res.length;
    this.refreshItems();
    console.log("res", res)
  }

  refreshItems() {
    console.log("this.allSWDataToDisplay", this.allSWDataToDisplay)
    this.allSWDataMapped = this.allSWDataToDisplay
      .map((item: any, i: number) => ({id: i + 1, ...item}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  onCategorySelected(event: any) {
    this.selectedCategory = event.value;

    if (this.selectedCategory === 'all') {
      this.allSWDataToDisplay = [...this.allSWData];
      this.collectionSize = this.allSWData.length;
      this.dataToSearch = [];
      this.refreshItems();
      return;
    }

    const filtered = this.allSWData.filter(item => item.category === this.selectedCategory);
    this.allSWDataToDisplay = [...filtered];
    this.collectionSize = filtered.length;
    this.dataToSearch = [];
    this.refreshItems();
  }

  onViewDetails(data: any) {
    this.showModal = true;
    this.dataForModal = data;
  }

  onCloseModal(event: boolean) {
    this.showModal = event;
  }
}
