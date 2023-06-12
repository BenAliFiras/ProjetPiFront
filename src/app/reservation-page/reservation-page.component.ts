import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

export class events {
  text!: string;
  startDate!: Date;
  endDate!: Date;
  idReservation!: any;
}

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrls: ['./reservation-page.component.scss']
})

export class ReservationPageComponent implements OnInit {
  appointmentsData: any;
   total: any;


   currentDate: Date = new Date(2023, 3, 29);

  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.appointmentsData = this.getAppointments(1);
    // this.total = this.getAppointments(1);
  }
  getAppointments(id: any): void {
    this.http.get<events[]>("http://localhost:9090/reservation/"+id)
      .subscribe((data : events[])=> {
        let renamedData = data.map((appointment: any) => {
          let reservationId = '';
      for (let reservation of appointment.reservations) {
        if (reservationId === '' && reservation.idReservation) {
          reservationId = reservation.idReservation;
        }
      }
          return {
            text: appointment.title,
            startDate: appointment.dateDebut,
            endDate: appointment.dateFin,
            idReservation: reservationId
          };
        });
        this.total =renamedData.length;
        this.appointmentsData = renamedData;
      });
  }

 
  deleteEventaa(id: any){
    const url = `http://localhost:9090/reservation/archiverReservation/${id}`;
    return this.http.post(url,{});
  }
  
  deleteEvent(event: any) {
    let eventId = event.appointmentData.idReservation; // Récupérer l'identifiant de l'événement
    // Supprimer l'événement correspondant à partir de votre base de données en utilisant l'identifiant de l'événement
  this.deleteEventaa(eventId).subscribe((response: any) => {});
}
}