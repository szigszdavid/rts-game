import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output() loginEvent = new EventEmitter();
  username: string = ""

  constructor() {}

  onSubmit(): void {
    this.loginEvent.emit(this.username)
  }
}
