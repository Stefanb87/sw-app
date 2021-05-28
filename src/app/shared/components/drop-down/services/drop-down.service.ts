import { Injectable } from '@angular/core';
import { DropDownItem } from 'src/app/modules/home/pages/home-page/models/home-page.model';

@Injectable({
  providedIn: 'root'
})
export class DropDownService {

  constructor() { }

  getSelectedValue(items: DropDownItem[]) {
    return items.find((item: DropDownItem) => item.selected);
  }
}
