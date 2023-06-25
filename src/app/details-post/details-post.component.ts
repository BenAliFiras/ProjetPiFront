import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,  Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PostService } from '../post.service';

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

  constructor(private http: HttpClient, private router:Router, private postService: PostService) {
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

    this.postService.getPostNotArchived().subscribe(
      response => {
        this.posts = response; // Stocker les détails du post dans la propriété "post"
        console.log(response);
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
    const post = this.posts[index];
    if (post.nbrLikes) {
      post.nbrLikes = 0;
    } else {
      post.nbrLikes = 1;
    }
  }


  archiverPost(postId: number) {
    this.postService.archiverPost(postId).subscribe(
      () => {
        console.log('Post archivé avec succès');
        // Mettre à jour la liste des posts affichés dans votre application frontend

        this.getPostDetails();
      },
      (error) => {
        console.error('Erreur lors de l\'archivage du post :', error);
        // Gérer les erreurs et afficher des messages d'erreur à l'utilisateur
      }
    );
  }
}
