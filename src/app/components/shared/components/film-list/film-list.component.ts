import {Component, OnInit} from '@angular/core';
import {FilmService} from "../../services/film.service";
import {IGenres, RootObject} from "../../model/model";
import {genres} from "../../../../../assets/data/dataGenres";
import {Router} from "@angular/router";
import {arrDate} from "../../../../../assets/data/dataYear";
import {FormControl} from "@angular/forms";
import {filter, tap} from 'rxjs';
import {regions} from "../../../../../assets/data/dataRegion";
import {RegionResults} from "../../model/region";
import {sortBy} from "../../../../../assets/data/dataSort";
import {SortChild} from "../../model/sort";


@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.scss']
})
export class FilmListComponent implements OnInit {

  list!: RootObject[]
  tempList: RootObject[]=[]
  page=1
  arrYear=arrDate
  genres:IGenres[]=genres
  regions=regions
  regName:string='Regions'
  sortArr=sortBy
  sortName:string='SortBy'

  selectYear=new FormControl()
  selectGenre=new FormControl()
  selectRegion=new FormControl(this.regions[0].english_name)



  constructor(private filmService: FilmService,
              public router: Router
  ) {
  }

  ngOnInit(): void {
    this.filmService.filmList$.subscribe(el=> {
      this.list = [...this.tempList,...el]
    })

    this.selectYear.valueChanges.pipe(
      filter(Boolean),
      tap(el=>this.filmService.addParams({primary_release_year:el}))).subscribe()

    this.selectGenre.valueChanges.pipe(
      filter(Boolean),
      tap(el=>this.filmService.addParams({with_genres:el})),).subscribe()

    this.selectRegion.valueChanges.pipe(
      filter(Boolean),
      tap(el=>this.filmService.addParams({region:el}))).subscribe()


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


  allFilm() {
    this.tempList=[]
    this.filmService.params$.next({})
    this.page=1
    this.selectGenre.reset()
    this.selectYear.reset()
    this.selectRegion.reset()
    this.regName='Regions'
  }

  selectReg(reg:RegionResults){
    this.filmService.addParams({region:reg.iso_3166_1})
    this.regName=reg.english_name
  }


  sortBy(item:SortChild) {
    this.filmService.addParams({sort_by:item.fn})
    this.sortName=item.name
  }
}
