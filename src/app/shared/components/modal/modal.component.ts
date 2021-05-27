import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() data: any;
  @Input() headerText: string;
  @Output() onCloseModal = new EventEmitter<boolean>();

  dataToDisplay: any[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    const dataChange = changes['data'];

    if (dataChange && dataChange.currentValue) {
      console.log("dataChange", dataChange)
      for (const [key, value] of Object.entries(dataChange.currentValue)) {
        this.dataToDisplay.push({
          key: key,
          value: value
        });
      }
      console.log("this.dataToDisplay", this.dataToDisplay)
    }
  }

  ngOnInit(): void {
  }

  onMouseenter(event: MouseEvent) {
    event.preventDefault();
  }

  onClose() {
    this.onCloseModal.emit(false);
  }

}
