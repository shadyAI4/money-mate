import { Component } from '@angular/core';
import { NavigationUrl } from 'src/app/shared/navbar/navigation';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  navigation:any

  constructor(
    public nav: NavigationUrl,
  ){
    this.navigation= nav.get()
  }

}
