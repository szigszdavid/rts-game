import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-gameover-dialog',
  templateUrl: './gameover-dialog.component.html',
  styleUrls: ['./gameover-dialog.component.css']
})
export class GameoverDialogComponent {

  @Output() closeEvent = new EventEmitter()

  handleCloseButtonClick() {
    this.closeEvent.emit()
  }
}
