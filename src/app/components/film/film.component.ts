import {Component, OnInit} from '@angular/core';
import {FilmService} from "../services/film.service";
import {imgOriginal, imgW500} from "../helper/img";
import {IDetail} from "../model/model";
import {CreditsCast} from "../model/credits";
import {Video, VideoResults} from "../model/video";

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  film!:IDetail
  imgMini:string
  imgOriginal:string
  casts:CreditsCast[]

  videos:VideoResults[]
  videoYoutube:string[]


  constructor(private filmService:FilmService) { }

  ngOnInit(): void {
    this.filmService.getDetailFilm(507086).subscribe((el:any)=> {
      this.film = el
      this.imgMini= imgW500(this.film.poster_path)
      this.imgOriginal= imgOriginal(this.film.backdrop_path)
    })
    this.filmService.getMovieCredits(507086).subscribe(el=>{
      this.casts=el.cast.filter((a,i)=>i<5)
    })

    this.filmService.getMovieVideo(507086).subscribe((el:Video)=>{
      this.videos=el.results.map(a=>{
        return ({...a,key:`https://www.youtube.com/embed/${a.key}`})
      }).slice(0,2)
      this.videoYoutube=this.videos.map(a=>a.key)

    })



  }

   imgW500 (value:string):string  {
    return `http://image.tmdb.org/t/p/w500/${value}`
  }
  video(key:string){
    return `https://www.youtube.com/embed/${key}`
  }
}

