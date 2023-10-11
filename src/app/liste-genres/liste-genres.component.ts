import { Component, OnInit } from '@angular/core';
import { Genre } from '../model/genre.model';
import { AuthService } from '../services/auth.service';
import { VideogameService } from '../services/videogame.service';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  styleUrls: []
})
export class ListeGenresComponent implements OnInit {
 genres! : Genre[];
 ajout:boolean=true;
 updatedGen:Genre = {"idGen":0,"nomGen":""};
  constructor(private videogameService : VideogameService, public authService : AuthService) { }

  ngOnInit(): void {
    //this.videogameService.listeGenres().subscribe(vid => {this.genres = vid._embedded.genres;
     // console.log(vid); } );
     this.chargerGenres();
  }
genreUpdated(gen : Genre){
  console.log("Genre updated event",gen);
  this.videogameService.ajouterGenre(gen).subscribe(
    ()=> this.chargerGenres()
  );
}

chargerGenres(){
  this.videogameService.listeGenres().subscribe(gen => {this.genres = gen._embedded.genres;
  console.log(gen);})
}

updateGen(gen:Genre){
  this.updatedGen = gen ;
  this.ajout = false ; 
}

supprimerGenre(gen : Genre){
  let conf = confirm("Are you sure ?");
  if(conf){
    this.videogameService.supprimerGenre(gen.idGen).subscribe(() => {
      console.log("Genre supprimé");
      this.chargerGenres();});
    }
  }
}
