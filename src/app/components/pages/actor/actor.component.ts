import {Component, OnInit} from '@angular/core';
import {CastService} from "../../shared/services/cast.service";
import {Actor} from "../../shared/model/actor";
import {ActivatedRoute} from "@angular/router";
import {map, switchMap, tap} from "rxjs";
import {ActorFilmsCast} from "../../shared/model/actorFilms";

@Component({
  selector: 'app-actor',
  templateUrl: './actor.component.html',
  styleUrls: ['./actor.component.scss']
})
export class ActorComponent implements OnInit {

  actor: Actor
  filmList: ActorFilmsCast[]
  id:number
  age:number

  constructor(private cast:CastService,
              private route:ActivatedRoute
              ) { }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map(params => params['id']),
       tap(id=>this.cast.getMovieActor(id).
       subscribe(data => {
         this.filmList = data.filter(el=>!!el.poster_path)
           .map(el=>({...el,poster_path:`http://image.tmdb.org/t/p/w500/${el.poster_path}`}))
           .sort((a,b)=>{
             if(!!a.release_date && !!b.release_date) {
               let aX = a?.release_date.split('-')[0]
               let bX = b?.release_date.split('-')[0]
               if (aX > bX)
                 return -1
               else return 1
             }
             return 1
           })

       }
       )),
       // tap(id => (this.id = +id)),
        switchMap(id=>this.cast.getActor(id)),
        map((el:Actor) =>({...el,profile_path:`http://image.tmdb.org/t/p/w500/${el.profile_path}`}))
        )
      .subscribe(data=> {
        this.actor = data
        this.age=new Date().getFullYear()-Number(data.birthday.split('-')[0])
      })


  }

}
