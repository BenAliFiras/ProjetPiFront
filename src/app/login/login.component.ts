import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {


  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
  }
  ngOnDestroy() {
  }

  username: string;
  password: string;
  rememberMe: boolean;


  login() {
    const loginDto = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://localhost:9090/api/auth/login', loginDto).subscribe({
      next: (response: any) => {
        const token = response.accessToken;
        console.log(token)
        if (token) {
          // Stocker le token dans le local storage ou dans un service d'authentification
          localStorage.setItem('token', token);
          console.log(token);

          // Redirection vers user-profile
          this.router.navigate(['/profile']);
        } else {
          console.log('Le token est vide');
        }
      },
      error: (error) => {
        // Traitement de l'erreur en cas d'échec de la connexion
        console.error(error);
      }})
    }


}
