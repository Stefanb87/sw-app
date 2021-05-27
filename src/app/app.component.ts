import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/components/loader/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'sw-app';
  loading = true;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.loaderSubject.subscribe((loading: boolean) => this.loading = loading);
  }
}
