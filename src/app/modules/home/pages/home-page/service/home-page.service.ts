import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ApiData, ApiDataSaved, MainApis, SWItem } from '../models/home-page.model';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  apiData: ApiDataSaved[] = [];
  itemsSubject = new Subject<SWItem[]>();

  constructor(private httpClient: HttpClient) { }

  public getAllItems(url: string) {
    return this.httpClient.get<MainApis>(url).pipe(
      tap((allMainApis: MainApis) => {
        this.saveUrlInfo(allMainApis);

        return allMainApis;
      }),
      switchMap((allMainApis: MainApis) => {
        const allMainApiRequests: Observable<any>[] = this.setUrlRequests(allMainApis);

        return forkJoin(allMainApiRequests);
      }),
      switchMap((allApiData: ApiData[]) => {
        const allApiRequests: Observable<any>[] = this.setAllApiRequests(allApiData);

        return forkJoin(allApiRequests);
      })
    )
    .subscribe((allPages: ApiData[]) => {
      this.saveItemsData(allPages);
      this.flattenDataArr(this.apiData);
      this.saveCategoryToMainData();
      const allDataToDisplay: SWItem[] = this.setDataForDisplay();
      this.itemsSubject.next(allDataToDisplay);
    });
  }

  private saveUrlInfo(data: any) {
    for (let item in data) {
      const mainApiSplitted: string[] = data[item].split('/');
      const category: string = mainApiSplitted[mainApiSplitted.length - 2];

      this.apiData.push({
        url: data[item],
        category: category,
        items: []
      });
    }
  }

  private saveNumberOfPages(data: ApiData, index: number): number {
    const numberOfPages = Math.ceil((data.count) / 10);

    this.apiData[index].numberOfPages = numberOfPages;
    this.apiData[index].count = data.count;

    return numberOfPages;
  }

  private setUrlRequests(urlData: MainApis): Observable<any>[] {
    const urls: string[] = Object.values(urlData);
    return urls.map((url: string) => this.httpClient.get(url));
  }

  private setAllApiRequests(data: ApiData[]): Observable<any>[] {
    const allApiRequests: Observable<any>[] = [];

    data.forEach((item: ApiData, index: number) => {
      const pages: number = this.saveNumberOfPages(item, index);

      for (let i = 1; i <= pages; i++) {
        allApiRequests.push(this.httpClient.get(`http://swapi.dev/api/${this.apiData[index].category}?page=${i}`));
      }
    });

    return allApiRequests;
  }

  private saveItemsData(pages: ApiData[]) {
    pages.forEach((page: ApiData) => {
      this.apiData.forEach((apiData: ApiDataSaved) => {
        if (page.count === apiData.count) {
          apiData.items.push(page.results)
        }
      });
    });
  }

  private flattenDataArr(data: ApiDataSaved[]) {
    data.forEach((item: ApiDataSaved) => {
      item.items = [].concat.apply([], item.items);
    });
  }

  private saveCategoryToMainData() {
    this.apiData.forEach((apiData: ApiDataSaved) => {
      apiData.items.forEach((item: SWItem) => {
        item.category = apiData.category;
      });
    });
  }

  private setDataForDisplay(): SWItem[] {
    const allDataToDisplay: SWItem[] = [];

    this.apiData.forEach((apiData: ApiDataSaved) => {
      apiData.items.forEach((item: SWItem) => {
        allDataToDisplay.push(item);
      });
    });

    const trimmedData: SWItem[] = this.removeComplexValues(allDataToDisplay);

    return trimmedData;
  }

  private removeComplexValues(data: SWItem[]): SWItem[] {
    const newData: SWItem[] = [...data];

    newData.forEach((item: any) => {
      for (let prop in item) {
        if (typeof item[prop] !== 'string') {
          delete item[prop];
        }
      }
    });

    return newData;
  }
}
