import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { DialogComponent } from './dialog/dialog.component';
import { GameoverDialogComponent } from './gameover-dialog/gameover-dialog.component';
import { GameButtonComponent } from './game-button/game-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GameComponent,
    DialogComponent,
    GameoverDialogComponent,
    GameButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
