import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DropDownItem } from 'src/app/modules/home/pages/home-page/models/home-page.model';
import { DropDownService } from './services/drop-down.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  @Input() items: DropDownItem[];
  @Output() onValueChange = new EventEmitter<DropDownItem>();

  selectedValue: string;

  constructor(private dropDownService: DropDownService) { }

  ngOnChanges(changes: SimpleChanges) {
    const itemsChange = changes['items'];

    if (itemsChange && itemsChange.currentValue.length) {
      const selectedValue: any = this.dropDownService.getSelectedValue(itemsChange.currentValue);

      this.selectedValue = selectedValue.value;
    }
  }

  ngOnInit(): void {
  }

  onValueChanged(value: string) {
    this.setSelectedFlag(value);
    const selectedValue: any = this.dropDownService.getSelectedValue(this.items);
    this.onValueChange.emit(selectedValue);
  }

  setSelectedFlag(selectedValue: string) {
    this.items.map((item: DropDownItem) => item.selected = item.value === selectedValue);
  }

}
