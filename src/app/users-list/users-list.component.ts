import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  users: any[];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.http.get<any[]>('http://localhost:9091/user/all').subscribe(
      (response) => {
        // Filtrer les utilisateurs dont "désactiver" est false
        this.users = response.filter(user => user.desactiver === false);
      },
      (error) => {
        console.log(error);
      }
    );}
  searchValue: string = '';
  searchResults: any[] = [];

  searchUsers(): void {
    if (this.searchValue.trim() !== '') {
      const [name, lastname] = this.searchValue.trim().split(' ');

      fetch(`http://localhost:9091/user/${name}/${lastname}`)
        .then(response => response.json())
        .then(users => {
          this.searchResults = users.filter((user: any) => user.desactiver === true);
          this.users=users.filter((user: any) => user.desactiver === false);
          console.log(users);
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de la recherche des utilisateurs:', error);
        });
    }
  }

}
