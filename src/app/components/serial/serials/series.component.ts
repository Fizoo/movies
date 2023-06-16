import {Component, OnDestroy, OnInit} from '@angular/core';
import {RootTvResults} from "../model/root";
import {SerialService} from '../serial.service';
import {getGenres} from "../../shared/helper/genres";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-serials',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit,OnDestroy {

  listTv: RootTvResults[]=[]
  tempListTv: RootTvResults[]=[]
  private unsubscribe$ =new Subject<void>()

  page=1

  constructor(private serialService: SerialService) { }

  ngOnInit(): void {
  this.serialService.serialList$.pipe(takeUntil(this.unsubscribe$)).subscribe(data=>{
      this.listTv=[...this.tempListTv,... data]
    })
   this.serialService.serialTempList$.pipe(takeUntil(this.unsubscribe$)).subscribe(data=>this.tempListTv=data)

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
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
