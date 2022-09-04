import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from 'rxjs';
import {AuthFireService} from "../../auth-fire.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;

  submitted = false
  errorMessage: string

  aSub: Subscription
  bSub: Subscription

  constructor(
    private router: Router,
    private authFire: AuthFireService
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),
      checkbox: new FormControl(false, [])
    })

    this.aSub = this.authFire.error$.subscribe(el => this.errorMessage = el)
  }

  onSubmit() {

    if (this.form.invalid) {
      return
    }
    this.submitted = true

    let user = {
      email: this.form.value.email,
      password: this.form.value.password
    }

   this.bSub= this.authFire.login(user).subscribe({
        next: () => {
          this.submitted = false

          if (!this.form.value.checkbox) {
            this.form.reset()
          }
          this.authFire.error$.next('Success')

          setTimeout(() => {
            this.router.navigate(['/'])
          }, 500)
        },
        error: () => {
          this.submitted = true
        }
      }
    )
  }

  get email() {
    return this.form.controls['email']
  }

  get password() {
    return this.form.controls['password']
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
    if (this.bSub) {
      this.bSub.unsubscribe()
    }
  }

}
