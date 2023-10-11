import { Genre } from "./genre.model";
import { Image } from "./image.model"
export class Videogame {
    idVideogame? : number;
    nomVideogame? : string;
    prixVideogame? : number;
    dateCreation? : Date ;
    genre! : Genre ;
    images!: Image[];
    imageStr!:string ;

    }

export class User{
   username?:string ;
   password?: string ;
   roles?:string[];
     }