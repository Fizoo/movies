import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilmService} from "../shared/services/film.service";
import {IGenres, RootObject} from "../shared/model/model";
import {Subscription} from "rxjs";
import {genres} from "../../../assets/data/dataGenres";
import {arrDate} from "../../../assets/data/dataYear";
import {regions} from "../../../assets/data/dataRegion";
import {sortBy} from "../../../assets/data/dataSort";
import {RegionResults} from "../shared/model/region";
import {SortChild} from "../shared/model/sort";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit,OnDestroy {

  list: RootObject[]=[]

  private aSub: Subscription;

  arrYear:number[] =arrDate
  genres:IGenres[]=genres
  regions:RegionResults[]=regions
  sortArr:SortChild[]=sortBy

  genreName='Genres'
  sortName='SortBy'
  yearName='Years';
  countryName='Country'

  constructor(private filmService: FilmService) {
  }

  ngOnInit(): void {
   this.aSub= this.filmService.filmList$.subscribe(data=> {
     this.list = data
     console.log(data)
   })
  }

  getGenres(id: number) {
    return genres.filter(el => el.id === id).map(el => el.name)
  }


  sortBy(item: SortChild) {
    this.filmService.addParams({sort_by:item.fn,'vote_count.gte':1000})
    this.sortName=item.name
  }

  selectGenre(item: IGenres) {
    this.filmService.addParams({with_genres:item.id})
    this.genreName=item.name
  }


  selectYear(item: number) {
    this.filmService.addParams({year:item})
    this.yearName=item.toString()

  }

  selectCountry(item: RegionResults) {
    this.filmService.addParams({region:item.iso_3166_1})
    this.countryName=item.english_name
  }

  resetFilter() {
    this.filmService.resetParams()
    this.genreName='Genres'
    this.sortName='SortBy'
    this.yearName='Years';
    this.countryName='Country'
  }

  ngOnDestroy(): void {
    this.aSub.unsubscribe()
  }


}
