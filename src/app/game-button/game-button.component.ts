import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-button',
  templateUrl: './game-button.component.html',
  styleUrls: ['./game-button.component.css']
})
export class GameButtonComponent {
  @Input() text: string = ""
  @Input() disabled: boolean = false
  @Output() clickEvent = new EventEmitter()

  handleClick() {
    this.clickEvent.emit()
  }
}
