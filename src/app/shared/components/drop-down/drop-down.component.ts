import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { DropDownService } from './services/drop-down.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss']
})
export class DropDownComponent implements OnInit {
  @Input() items: any[];
  @Output() onValueChange = new EventEmitter<string>();

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
    const selectedValue = this.dropDownService.getSelectedValue(this.items);
    this.onValueChange.emit(selectedValue);
  }

  setSelectedFlag(selectedValue: string) {
    this.items.map((item: any) => item.selected = item.value === selectedValue);
  }

}
