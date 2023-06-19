import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.scss']
})
export class DetailsPostComponent implements OnInit {
  postId: number;
  posts: any[];
  showDetails: boolean = false;
  showButton: boolean = false;
  postDetails: boolean[] = [];
  postLikes: number[] = [];

  constructor(private http: HttpClient, private router:Router) {
    //this.postId = 0;
    this.posts = [];
  }

  ngOnInit(): void {
        this.getPostDetails();

  }

  getupdate(){
    this.router.navigate(['post/update/:postId']);
  }
  getPostDetails() {
    const url = 'http://localhost:9090/post'; // Remplacez par l'URL de votre endpoint backend

    this.http.get<any>(url).subscribe(
      response => {
        this.posts = response; // Stocker les détails du post dans la propriété "post"
      },
      error => {
        console.error('Erreur lors de la récupération des détails du post :', error);
      }
    );
  }

  toggleDetails(index: number) {
    this.postDetails[index] = !this.postDetails[index];
    this.showButton = true;
  }

  toggleLike(index: number) {
    if (this.postLikes[index]) {
      this.postLikes[index] = 0;
    } else {
      this.postLikes[index] = 1;
    }
  }

}
