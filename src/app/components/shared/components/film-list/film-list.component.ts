import {Component, OnDestroy, OnInit} from '@angular/core';
import {filter, Subscription, tap} from 'rxjs';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";

import {FilmService} from "../../services/film.service";
import {RootObject} from "../../model/model";
import {genres} from "../../../../../assets/data/dataGenres";
import {regions} from "../../../../../assets/data/dataRegion";


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit,OnDestroy {

  list!: RootObject[]
  tempList: RootObject[]=[]
  page=1

  regions=regions

  selectYear=new FormControl()
  selectGenre=new FormControl()
  selectRegion=new FormControl(this.regions[0].english_name)

  subscriptions: Subscription[] = [];
  aSub:Subscription
  bSub:Subscription
  cSub:Subscription
  dSub:Subscription



  constructor(private filmService: FilmService,
              public router: Router
  ) {
  }

  ngOnInit(): void {
    this.aSub= this.filmService.filmList$.subscribe(el=> {
      this.list = [...this.tempList,...el]
    })

    this.bSub=this.selectYear.valueChanges.pipe(
      filter(Boolean),
      tap(el=>this.filmService.addParams({primary_release_year:el}))).subscribe()

    this.cSub=this.selectGenre.valueChanges.pipe(
      filter(Boolean),
      tap(el=>this.filmService.addParams({with_genres:el})),).subscribe()

    this.dSub=this.selectRegion.valueChanges.pipe(
      filter(Boolean),
      tap(el=>this.filmService.addParams({region:el}))).subscribe()

    this.subscriptions.push(this.aSub,this.bSub,this.cSub,this.dSub)

  }

  getGenres(id: number) {
    return genres.filter(el => el.id === id).map(el => el.name)
  }

  load() {
    this.page+=1
    this.tempList=this.list
    this.filmService.addParams({page:this.page})
    //this.filmService.addSearchParams( {page:this.page})
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub=>sub.unsubscribe())
  }
}
