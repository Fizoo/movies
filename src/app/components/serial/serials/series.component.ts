import {Component, OnDestroy, OnInit} from '@angular/core';
import {RootTvResults} from "../model/root";
import {SerialService} from '../serial.service';
import {getGenres} from "../../shared/helper/genres";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-serials',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit,OnDestroy {

  listTv: RootTvResults[]=[]
  tempListTv: RootTvResults[]=[]

  page=1

  aSub:Subscription
  bSub:Subscription

  constructor(private serialService: SerialService) { }

  ngOnInit(): void {
   this.aSub= this.serialService.serialList$.subscribe(data=>{
      this.listTv=[...this.tempListTv,... data]
    })

    this.bSub=this.serialService.serialTempList$.subscribe(data=>this.tempListTv=data)

  }

  getGenres(id: number) {
    return getGenres(id)
  }


  load() {
    this.page+=1
    this.serialService.serialTempList$.next(this.listTv)
    this.serialService.addParams(this.page)

  }

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe()
    }
    if(this.bSub){
      this.bSub.unsubscribe()
    }
  }
}
