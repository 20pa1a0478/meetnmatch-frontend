import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrls: ['./payment-form.component.css']
})
export class PaymentFormComponent implements OnInit {
  paymentForm!: FormGroup;

  private apiUrl = 'http://localhost:8080/api/payment'; // Your API endpoint

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.paymentForm = this.fb.group({
      phno: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      paymentmode: ['', [Validators.required]],
      cardNumber: [''],
      expiryDate: [''],
      cvv: [''],
      upiId: ['']
    });

    this.paymentForm.get('paymentmode')?.valueChanges.subscribe(value => {
      this.onPaymentModeChange(value);
    });
  }

  onPaymentModeChange(paymentMode: string): void {
    if (paymentMode === 'card') {
      this.paymentForm.get('cardNumber')?.setValidators([Validators.required]);
      this.paymentForm.get('expiryDate')?.setValidators([Validators.required]);
      this.paymentForm.get('cvv')?.setValidators([Validators.required]);
      this.paymentForm.get('upiId')?.clearValidators();
    } else if (paymentMode === 'upi') {
      this.paymentForm.get('cardNumber')?.clearValidators();
      this.paymentForm.get('expiryDate')?.clearValidators();
      this.paymentForm.get('cvv')?.clearValidators();
      this.paymentForm.get('upiId')?.setValidators([Validators.required]);
    } else {
      this.paymentForm.get('cardNumber')?.clearValidators();
      this.paymentForm.get('expiryDate')?.clearValidators();
      this.paymentForm.get('cvv')?.clearValidators();
      this.paymentForm.get('upiId')?.clearValidators();
    }
    this.paymentForm.get('cardNumber')?.updateValueAndValidity();
    this.paymentForm.get('expiryDate')?.updateValueAndValidity();
    this.paymentForm.get('cvv')?.updateValueAndValidity();
    this.paymentForm.get('upiId')?.updateValueAndValidity();
  }

  onSubmit(): void {
    if (this.paymentForm.valid) {
      const formData = this.paymentForm.value;

      this.http.post(this.apiUrl, formData).subscribe({
        next: (response) => {
          console.log('Success!', response);
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
    }
  }
}
