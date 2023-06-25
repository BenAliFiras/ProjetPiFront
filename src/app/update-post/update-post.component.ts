import { Component, OnInit, Inject } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/Post';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent implements OnInit {
  //formData: any = {};// Utilisez cet objet pour stocker les données du formulaire
  selectedImage: string = '';
  //postId: number;
  //post:Post;
  post: Post = new Post();

  constructor(private postService:PostService, private ac: ActivatedRoute, private _router:Router) { }

  updatePost(){
    this.postService.updatePost(this.post).subscribe(res=>this._router.navigateByUrl("/post/details"));
  }
  ngOnInit(): void {
    let id= this.ac.snapshot.params['postId'];
    this.postService.getByIdPost(id).subscribe(res=> this.post = res);
    //this.ac.paramMap.subscribe(res=>this.postService.getByIdPost(res.get('idPost')).subscribe(
      //  res=> {this.post = res}));
      // Utilisez postId pour charger les données du post à modifier
  }

  /* getPostData() {
    // Appelez votre service pour récupérer les données existantes
    this.postService.getByIdPost(id: Number).subscribe(
      response => {
        // Assignez les données récupérées à formData
        this.post = response;
      },
      error => {
        console.error('Erreur lors de la récupération des données', error);
      }
    );
  } */

  // onSubmit() {
  //   // Appelez la méthode du service de mise à jour pour effectuer la mise à jour
  //   this.postService.updateData(this.formData)
  //     .subscribe(
  //       response => {
  //         // Gérez la réponse réussie de la mise à jour
  //         console.log('Mise à jour réussie', response);
  //       },
  //       error => {
  //         // Gérez les erreurs de mise à jour
  //         console.error('Erreur lors de la mise à jour', error);
  //       }
  //     );
  // }
  onFileSelected(event: any) {
    const file = File= event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };

    reader.readAsDataURL(file);
  }

}
