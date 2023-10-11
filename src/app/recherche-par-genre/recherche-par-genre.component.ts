import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { Videogame } from '../model/videogame.model';
import { AuthService } from '../services/auth.service';
import { VideogameService } from '../services/videogame.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styleUrls: []
})
export class RechercheParGenreComponent implements OnInit {
   videogames! : Videogame[];
   IdGenre! : number ;
   genres! : Genre[];
  constructor(private videogameService : VideogameService,public authService: AuthService) { }

  ngOnInit(): void {
    this.videogameService.listeGenres().subscribe(gen => {this.genres = gen._embedded.genres;
    console.log(gen);})
  }

  onChange(){
    this.videogameService.rechercherParGenre(this.IdGenre).subscribe(vid => {this.videogames=vid})
  }
 
  supprimerVideogame(v: Videogame){
    let conf = confirm("Do you really want to delete this game ?");
    if (conf)
    this.videogameService.supprimerVideogame(v.idVideogame!).subscribe(() => {
      console.log("Jeu supprimé");
      this.ngOnInit();
    });
  }

}
