import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { response } from 'express';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private userService : UserService, private router: Router){

  }

  register(registerForm: NgForm){
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) =>{
        this.router.navigate(['/login']);
        console.log(response);
      },
      (error) =>{
        console.log(error);
      }
    );
  }
}
