import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  constructor() { }

  getSelectedValue(items: any[]) {
    return items.find((item: any) => item.selected);
  }
}
