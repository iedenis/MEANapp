import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { FormsModule } from '@angular/forms';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import {Router} from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show("please fill all fields", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show("please fill the email correctly", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.authService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log('success')
        this.flashMessage.show("you are registered now and can log in", { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login'])
      } else {
        console.log("ERROR in registering")
        this.flashMessage.show("Something went wrong", { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register'])

      }
    })
  }
}
