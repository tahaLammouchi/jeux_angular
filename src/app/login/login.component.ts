import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/videogame.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {
  user = new User();
  erreur=0;
  err:number = 0;
  constructor(private authService : AuthService,private router : Router) { }

  ngOnInit(): void {
  }
  onLoggedin(){
    this.authService.login(this.user).subscribe({
      next: (data) => {
      let jwToken = data.headers.get('Authorization')!;
      this.authService.saveToken(jwToken);
      this.router.navigate(['/']); 
      },
      error: (err: any) => {
      this.err = 1; 
      }
      });
    }
    
  
}
