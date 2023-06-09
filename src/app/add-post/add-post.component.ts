import { Component, OnInit, ViewChild, ElementRef, NgZone, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MapsAPILoader } from '@agm/core';
import { Inject } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  post: any;
  private adresse!: L.Map;
  @ViewChild('addressInput', { static: true }) mapContainer!: ElementRef;
  constructor(private http: HttpClient) {
    this.post = {
      link_piecejointe: '',
      link: '',
      description: '',
      adresse: '',
      date: ''
    };
  }

  ngOnInit(): void {
    this.adresse = L.map('adresse').setView([51.505, -0.09], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
    }).addTo(this.adresse);
  }

  placeMarkerOnMap(lat: number, lng: number): void {
    const marker = L.marker([lat, lng]).addTo(this.adresse);
    console.log(marker);
  }

  addPost() {
    const url = 'http://localhost:9090/post'; // Remplacez par l'URL de votre endpoint backend

    const postData = {
      // Les données du formulaire à envoyer
      link_piecejointe: this.post.link_piecejointe,
      link: this.post.link,
      description: this.post.description,
      adresse: this.post.adresse,
      date: this.post.date
    };

    this.http.post(url, postData).subscribe(
      () => {
        // La requête POST a réussi
        alert('Post ajouté avec succès');
      },
      (error) => {
        // Une erreur s'est produite lors de la requête POST
        console.error('Erreur lors de l\'ajout du post :', error);
      }
    );
  }

  submitForm() {
      this.addPost();
    this.post = {}; // Réinitialiser les valeurs des champs
  }

}
