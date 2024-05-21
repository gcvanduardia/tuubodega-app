import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonTitle, IonToolbar, IonContent, IonItem, IonLabel, IonInput, IonButton, IonGrid, IonRow, IonCol, IonCard, IonImg } from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from "../../shared/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonImg, IonCard, IonCol, IonRow, IonGrid, CommonModule, FormsModule, IonButton, IonInput, IonLabel, IonItem, RouterModule, IonContent, IonToolbar, IonTitle, IonHeader]
})
export class LoginPage implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      alert('Formulario inválido');
      return;
    }
    const { username, password } = form.value;
    if (!username || !password) {
      alert('Usuario y contraseña son requeridos');
      return;
    }
    console.log('username:', username);
    console.log('password:', password);
    this.auth.login(username, password);
  }

}
