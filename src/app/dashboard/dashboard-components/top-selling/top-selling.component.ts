import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Product,TopSelling} from './top-selling-data';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

  topSelling:Product[];
  claims: any[] = [];
  
  

  constructor(private http:HttpClient,private router:Router) { 

    this.topSelling=TopSelling;
  }
  
  
  ngOnInit(): void {
    this.getClaims
  }

  getClaims() {
    this.http.get<any[]>('http://localhost:8081/reclamation/getall').subscribe(response => {
      this.claims = response;
    });
  }

  readRec(){
      this.router.navigate(["dashboard/reclamations"])
  }

}
  
