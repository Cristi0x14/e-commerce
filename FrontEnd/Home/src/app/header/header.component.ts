import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  constructor(private userAuthService : UserAuthService){}
  ngOnInit(): void {
  }
  public isLoggedIn():string | null{
    return this.userAuthService.isLoggedIn();
  }
  public logout() {
    this.userAuthService.clear();
  }
}
