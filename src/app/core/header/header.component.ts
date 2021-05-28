import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DropDownItem } from 'src/app/modules/home/pages/home-page/models/home-page.model';

import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUsername = '';
  dropDownData: DropDownItem[] = [
    { value: '', selected: true },
    { value: 'Logout', selected: false }
  ];

  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    const currentUser = JSON.parse(this.authenticationService.currentUserValue);

    if (currentUser) {
      this.currentUsername = currentUser.userName;
      this.dropDownData[0].value = currentUser.userName;
      return;
    }

    this.authenticationService.currentUsernameSubject.pipe().subscribe((userName: string) => {
      this.currentUsername = userName;
      this.dropDownData[0].value = userName;
    });
  }

  onCategorySelected(event: any) {
    if (event.value.toLowerCase() === 'logout') {
      this.authenticationService.logout();
      this.currentUsername = '';
      this.router.navigate(['/logout']);
    }
  }
}
