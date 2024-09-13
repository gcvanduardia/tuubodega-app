import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonButton, IonCard, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonInput, IonItem, IonLabel, IonRow, IonText, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthService } from "../../shared/services/auth/auth.service";
import { RegisterService } from 'src/app/shared/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonImg,
    IonCard,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    IonInput,
    IonLabel,
    IonItem,
    RouterModule,
    IonContent,
    IonToolbar,
    IonTitle,
    IonHeader,
    IonCardTitle,
    IonText

  ]
})
export class RegisterPage implements OnInit {

  passwordMatch: boolean = false;
  loadingValidateCode: boolean = false;
  showSendCode: boolean = false;
  codeValidationEmail: string = '';
  valuesRegister: any = {};

  passwordMatchValidator: ValidatorFn = ((formGroup: AbstractControl): ValidationErrors | null => {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmarPassword')?.value;

    if (password === confirmPassword) {
      this.passwordMatch = true;
      return null
    } else {
      this.passwordMatch = false;
      return { 'passwordMismatch': true };
    }
  });

  formRegister = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    document: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl(''),
    department: new FormControl(''),
    city: new FormControl(''),
    address: new FormControl(''),
    addressAdd: new FormControl(''),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmarPassword: new FormControl('', [Validators.required]),
  },
  {
    validators: this.passwordMatchValidator
  }
);

  constructor(
    private auth: AuthService,
    private register: RegisterService,
    private router: Router,
  ) { }


  ngOnInit() {}

  async onSubmit() {
    if(this.formRegister.invalid) return;
    this.valuesRegister = this.formRegister.value;

    this.showSendCode = true;
    const data = await this.register.sendCode({ email: this.valuesRegister.email! });
    if(data?.Error) {
      this.showSendCode = false;
      setTimeout(() => {
        alert(data.Message)
      }, 100);
    }
  }

  async sendCode() {
    if(!this.codeValidationEmail) return
    this.loadingValidateCode = true;
    const data = await this.register.validateCode({ email: this.valuesRegister.email!, code: this.codeValidationEmail });
    if(data?.Error) {
      alert(data.Message)
    } else if(data?.data) {
      const res = await this.register.register(this.valuesRegister);
      if(res?.Error) {
        alert(res.Message)
      } else if(res?.data) {
        this.auth.login(this.valuesRegister.email!, this.valuesRegister.password!)
      }
    }
  }

  goToRegister() {
    this.router.navigate(['/']);
  }

}
