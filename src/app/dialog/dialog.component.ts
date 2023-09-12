import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  @Output() closeDialogEvent = new EventEmitter();
  @Output() createWarriorsRequestEvent = new EventEmitter<number>();
  @Input() availableWarriorNumber = 0

  warriorForm = this.formBuilder.group({
    numberOfWarriors: 0
  });

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  handleCloseButtonClick() {
    this.closeDialogEvent.emit()
  }

  handleSaveButtonClick() {
    this.createWarriorsRequestEvent.emit(this.warriorForm.value.numberOfWarriors!)
  }
}
