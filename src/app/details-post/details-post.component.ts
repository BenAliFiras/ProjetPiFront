import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  newComment: string = '';

  constructor(private http: HttpClient, private router: Router, private postService: PostService) {
    this.posts = [];
  }

  ngOnInit(): void {
    this.getPostDetails();
  }

  getupdate() {
    this.router.navigate(['post/update/:postId']);
  }

  getPostDetails() {
    const url = 'http://localhost:9091/post'; // Remplacez par l'URL de votre endpoint backend

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

  ajouterCommentaire(postId: number, content: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:9091/api/auth/current', { headers }).subscribe({
      next: (user: any) => {
        const url = `http://localhost:9091/commentaire/addCommentaire/${user.idUser}/${postId}`;
        const commentaireData = {
          content: content, // Remplacez par le contenu du commentaire
          createdAt: new Date(), // Ajoutez la date de création du commentaire ici
          archive: false, // Ajoutez la valeur d'archivage du commentaire ici
          usercommentaire: { idUser: user.idUser },
          post: { idPost: postId }
          // Ajoutez d'autres champs du modèle de commentaire selon vos besoins
        };

        this.http.post(url, commentaireData, { headers }).subscribe(
          () => {
            console.log('Commentaire ajouté avec succès');
            console.log(commentaireData);
            //this.newComment = '';
            // Mettre à jour les détails du post ou rafraîchir la liste des commentaires
          },
          (error) => {
            console.error('Erreur lors de l\'ajout du commentaire :', error);
            // Gérer les erreurs et afficher des messages d'erreur à l'utilisateur
          }
        );
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de l\'utilisateur actuel :', error);
        // Gérer les erreurs et afficher des messages d'erreur à l'utilisateur
      }
    });
  }
}
