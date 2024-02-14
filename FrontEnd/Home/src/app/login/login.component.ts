import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {
  constructor(
    private userService : UserService,
    private router: Router,
    private userAuthService : UserAuthService,
  ) {}

  ngOnInit(): void {}

  login(loginForm:NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any)=>{
        console.log(response.jwtToken);
        console.log(response.user.role);
        console.log(response.user.role[0]);

        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);
        
        const role = response.user.role[0];
      
        if(role.roleName== "Admin"){
          
          this.router.navigate(['/admin'])
        }
        else {
          //this.router.navigate(['/user']);
          this.router.navigate(['/allsports']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  registerUser(){
    this.router.navigate(['/register']);
  }
}
