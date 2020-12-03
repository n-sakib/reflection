import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-primary-header',
  templateUrl: './primary-header.component.html',
  styleUrls: ['./primary-header.component.scss']
})
export class PrimaryHeaderComponent implements OnInit {

  user = null;

  constructor(private afAuth: AngularFireAuth, public auth: AuthService) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
  }
}
