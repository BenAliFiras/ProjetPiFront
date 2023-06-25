import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observer } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  nom: string = '';
  prenom: string = '';
  telephone: number = 0;
  age: number = 0;
  username: string = '';
  password: string = '';
  prenomPere: string = '';
  roleName: string = '';
  adresse: string = '';

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  register() {
    const registerDto = {
      nom: this.nom,
      prenom: this.prenom,
      telephone: this.telephone,
      age: this.age,
      username: this.username,
      password: this.password,
      prenomPere: this.prenomPere,
      roleName: this.roleName,
      adresse: this.adresse
    };

    const observer: Observer<any> = {
      next: response => {
        console.log('User registered successfully!');
        // Traitez la réponse de la requête si nécessaire
      },
      error: error => {
        console.error('Failed to register user:', error);
        // Traitez l'erreur de la requête si nécessaire
      },
      complete: () => {
        // Le cas échéant, effectuez des actions à l'achèvement de la requête
      }
    };

    this.httpClient.post('http://localhost:9090/api/auth/register', registerDto).subscribe(observer);
  }
}
