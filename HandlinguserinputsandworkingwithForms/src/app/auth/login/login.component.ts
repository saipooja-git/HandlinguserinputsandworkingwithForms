
// ----------------reactive approach----------------
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

function mustContainQuestionMark(control:AbstractControl){
if(control.value.includes('?')){
  return null;
}
return {
  doesnotContainQuestionMark : true
}
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports :[ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('',{
      validators: [Validators.email,Validators.required]
    }),
    password: new FormControl('',{
      validators: [Validators.minLength(6), Validators.required,mustContainQuestionMark]
    })
  });

  get emailInvalid(){ // u can write it in html or else here like this as get method for email invalid
    return this.form.controls.email.touched && this.form.controls.email.dirty && this.form.controls.email.invalid

  }

  get passwordInvalid(){
    return this.form.controls.password.touched && this.form.controls.password.dirty && this.form.controls.password.invalid
  }
  onSubmit(){
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail,enteredPassword);
  }
}


// -------------------------template driven approach------------------------------------------------
// import { afterNextRender, Component, DestroyRef, inject, viewChild } from '@angular/core';
// import { FormsModule, NgForm } from '@angular/forms';
// import { debounce, debounceTime } from 'rxjs';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [FormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css',
// })
// export class LoginComponent {
// private form = viewChild.required<NgForm>('form');
// private destroyRef = inject(DestroyRef);
// constructor(){
//   afterNextRender(()=>{

//     const savedForm = window.localStorage.getItem('saved-login-form');
//     if(savedForm){
//       const loadedForm = JSON.parse(savedForm);
//       const savedEmail = loadedForm.email;
//       setTimeout(()=>{
//         this.form().controls['email'].setValue(savedEmail);
//       },1);
//     }
//     const subscription = this.form().valueChanges?.pipe(debounceTime(500)).subscribe({ //here if the user is entering and stopped meanwhile it will 
//     // caluculate those seconds and only after that it will consider as next value
//       next:(value)=>
//       window.localStorage.setItem('saved-login-form',JSON.stringify({email:value.email}))
      
//     });
//   this.destroyRef.onDestroy(()=>{
//     subscription?.unsubscribe()
//   });
//   });
// }
//   onSubmit(formData: NgForm){
//     console.log(formData);// ela manam raskumapud manaki console lo value ane dantla email and
//     // password kanipisthai so ah values ni extract cheyadaniki we use the below way.
//     const enteredEmail =formData.form.value.email;
//     const enteredPassword =formData.form.value.password;

//     console.log(enteredEmail);
//     console.log(enteredPassword);
//     console.log(formData);
// formData.form.reset();
//   }
// }
