import { Component, OnInit } from '@angular/core';
import { Videogame } from '../model/videogame.model';
import { AuthService } from '../services/auth.service';
import { VideogameService } from '../services/videogame.service';
import { interval } from 'rxjs';
import { Image } from '../model/image.model';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-videogames',
  templateUrl: './videogames.component.html',
  styleUrls: []
})
export class VideogamesComponent implements OnInit {
// videogames: string[] ;
  videogames! : Videogame[];
  apiURL: string = 'http://localhost:8091/videogames/api';
  constructor(private videogameService : VideogameService,public authService: AuthService, private http : HttpClient) { 
      //this.videogames =videogameService.listeVideogames();
      }
  //  this.videogames = ["Phasmophobia","Valorant","Dead by Daylight"];
  

  ngOnInit(): void {
   this.chargerVideogames();

  }

  chargerVideogames(){
    this.videogameService.listeVideogames().subscribe(vids =>{console.log(vids);
    this.videogames = vids 
     
    this.videogames.forEach((vid) => {
      this.http.get<Image[]>(this.apiURL + "/imagesByVid/" + vid.idVideogame).subscribe(
        images => {
          vid.images = images;
      vid.imageStr = 'data:' + vid.images[0].type + ';base64,' + 
      vid.images[0].image;
      }); 
    ;});})}

  supprimerVideogame(v: Videogame){
    let conf = confirm("Do you really want to delete this game ?");
    if (conf)
    this.videogameService.supprimerVideogame(v.idVideogame!).subscribe(() => {
      console.log("Jeu supprimé");
      this.chargerVideogames();
    });
  }

}
