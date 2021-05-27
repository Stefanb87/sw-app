import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './components/modal/modal.component';
import { DropDownComponent } from './components/drop-down/drop-down.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';



@NgModule({
  declarations: [
    ModalComponent,
    DropDownComponent,
    LoaderComponent,
    SearchComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ModalComponent,
    DropDownComponent,
    LoaderComponent,
    SearchComponent,
    TableComponent
  ]
})
export class SharedModule { }
