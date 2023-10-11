import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { Genre } from '../model/genre.model';
import { Videogame } from '../model/videogame.model';
import { VideogameService } from '../services/videogame.service';
import {Image} from "../model/image.model"
@Component({
  selector: 'app-add-videogame',
  templateUrl: './add-videogame.component.html',
  styleUrls: []
})
export class AddVideogameComponent implements OnInit {
  newVideogame = new Videogame();
  genres! : Genre[];
  newIdGen!: number;
  newGenre! : Genre ;
  uploadedImage!: File;
  imagePath: any;
  constructor(private videogameService : VideogameService,private router : Router) { }

  ngOnInit(): void {
    //this.genres = this.videogameService.listeGenres();
   this.videogameService.listeGenres().subscribe(gen =>{ console.log(gen); this.genres = gen._embedded.genres;
 })
  }

addVideogame(){
  
//this.newVideogame.image=img;
this.newVideogame.genre = this.genres.find(gen => gen.idGen == this.newIdGen)!;
this.videogameService.ajouterVideogame(this.newVideogame)
.subscribe((vid) => {
this.videogameService.uploadImageVid(this.uploadedImage, this.uploadedImage.name,vid.idVideogame!)

.subscribe(() => {
this.router.navigate(['videogames']);
});
});

}
onImageUpload(event: any) {
  this.uploadedImage = event.target.files[0];
  var reader = new FileReader();
  reader.readAsDataURL(this.uploadedImage);
  reader.onload = (_event) => { this.imagePath = reader.result; }
  }
  
}
