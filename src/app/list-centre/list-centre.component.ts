import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-centre',
  templateUrl: './list-centre.component.html',
  styleUrls: ['./list-centre.component.scss']
})
export class ListCentreComponent implements OnInit {
  ListCentr:any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getCentre()
  }
  getCentre() {
    this.http.get("http://localhost:9091/api/centres").subscribe(
      data => {
       this.ListCentr=data
       
      }
    );
  }

}
