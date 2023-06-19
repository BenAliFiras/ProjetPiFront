import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models/Post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }


  getPostData(): Observable<Post> {
    // Effectuez votre logique pour récupérer les données existantes
    // Par exemple, effectuez une requête HTTP GET vers votre API

    // Exemple de requête HTTP GET vers une API fictive
      return this.http.get<Post>('http://localhost:9090/post');
  }

  getByIdPost(postId: number): Observable<Post> {
    const url = ('http://localhost:9090/post/'+ postId);
    return this.http.get<Post>(url);
  }

  updateData(post: Post): Observable<Post> {
    // Effectuez votre logique de mise à jour ici
    // Par exemple, effectuez une requête HTTP PUT/POST vers votre API

    // Exemple de requête HTTP PUT vers une API fictive
    return this.http.put<Post>('http://localhost:9090/post/update' +post.idPost,post);
  }

  addCommentToPost(postId: number, commentaire: any): Observable<any> {
    const url = "http://localhost:9090/post/${postId}/comments"; // Remplacez "/posts/${postId}/comments" par le chemin de votre API pour ajouter un commentaire à un poste
    return this.http.post(url, commentaire);
  }
}
