import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { CentreService } from '../centre.service';
import * as events from 'events';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-add-cerntre',
  templateUrl: './add-cerntre.component.html',
  styleUrls: ['./add-cerntre.component.scss']
})
export class AddCerntreComponent implements OnInit {

  userForm = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    ville: ['', [Validators.required]],
    
   
  });
  total: any;
  errorMessage!: string;
  constructor(
    private fb: FormBuilder,
    private service:CentreService,
    private http: HttpClient
    ) {}
    ngOnInit(): void {
    }
  register() {
     const login=this.userForm.controls.name.value
     const password=this.userForm.controls.description.value
     const birthYear=this.userForm.controls.ville.value
     const params={
      "name":login,
      "description":password,
      "ville":birthYear
    }
    this.http.post("http://localhost:9091/api/centres", params).subscribe(
      data => {
        // La réservation a été effectuée avec succès
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'La réservation a été effectuée avec succès.'
        });
        this.total = this.total + 1;
      },
    (error: HttpErrorResponse) => {
    
      if (error.error instanceof ErrorEvent) {
        this.errorMessage = 'Une erreur s\'est produite lors de la réservation.';
      } else {
        // Afficher le corps de la réponse de la requête qui a échoué
        this.errorMessage = error.error.error;
        
      }
       // Afficher la boîte de dialogue d'erreur
       Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: this.errorMessage
      });
    }
    );
    //  this.service.addCentre(login,password,birthYear).subscribe(data=>{
    //    error:()=>{
      
      
    //    }
    //  })
  }
 

  

}
