import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  currentPage = 'login'
  @Output() username = ''

  handleLogin(newUserName: string) {
    this.currentPage = 'game'
    this.username = newUserName
  }

}
