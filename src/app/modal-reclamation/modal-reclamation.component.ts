import { Component, OnInit } from '@angular/core';

import { Reclamation } from 'src/app/models/Reclamation';


@Component({
  selector: 'app-modal-reclamation',
  templateUrl: './modal-reclamation.component.html',
  styleUrls: ['./modal-reclamation.component.scss'],

})
export class ModalReclamationComponent implements OnInit {

  claim: Reclamation;
  constructor() {  this.claim = history.state.claim;}

  
  ngOnInit(): void {
  }


  changeStatus(status: boolean) {
    this.claim.status = status; // Update the claim status
  }

}
