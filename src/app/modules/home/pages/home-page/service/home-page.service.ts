import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomePageService {
  apiData: any[] = [];
  itemsSubject = new Subject<any>();
  allResultsToDisplay: any[] = [];

  constructor(private httpClient: HttpClient) { }

  public getAllItems(url: string) {
    return this.httpClient.get(url).pipe(
      switchMap((allMainApis: any) => {
        const mainApiUrls: string[] = Object.values(allMainApis);
        const allMainApiRequests: any[] = mainApiUrls.map((url: string) => this.httpClient.get(url));

        for (let mainApi in allMainApis) {
          const mainApiSplitted: string[] = allMainApis[mainApi].split('/');
          const category: string = mainApiSplitted[mainApiSplitted.length - 2];

          this.apiData.push({
            url: allMainApis[mainApi],
            category: category,
            items: []
          });
        }

        return forkJoin(allMainApiRequests);
      }),
      switchMap((allApiData: any[]) => {
        console.log("allApiData", allApiData)
        const allApiRequests: any = [];

        // const cats: string[] = Object.keys(this.mainApisWithCategories);

        allApiData.forEach((apiData: any, index: number) => {
          const numberOfPages = Math.ceil((apiData.count) / 10);

          this.apiData[index].numberOfPages = numberOfPages;
          this.apiData[index].count = apiData.count;

          for (let i = 1; i <= numberOfPages; i++) {
            allApiRequests.push(this.httpClient.get(`http://swapi.dev/api/${this.apiData[index].category}?page=${i}`));
          }
        });

        console.log("this.apiData", this.apiData)
        return forkJoin(allApiRequests);
      })
    )
    .subscribe((allPages: any[]) => {
      console.log("allPages", allPages)
      const allDataToDisplay: any[] = [];

      allPages.forEach((page: any) => {
        this.apiData.forEach((apiData: any) => {
          if (page.count === apiData.count) {
            apiData.items.push(page.results)
          }
        });
      });

      this.apiData.forEach((apiData: any) => {
        apiData.items = [].concat.apply([], apiData.items);
      });

      this.apiData.forEach((apiData: any) => {
        apiData.items.forEach((item: any) => {
          item.category = apiData.category;
        });
      });

      this.apiData.forEach((apiData: any) => {
        apiData.items.forEach((item: any) => {
          allDataToDisplay.push(item);
        });
      });

      console.log("allDataToDisplay", allDataToDisplay)
      this.itemsSubject.next(allDataToDisplay);
    });
  }
}
