import {Component, OnInit} from '@angular/core';
import {RootTvResults} from "../model/root";
import {SerialService} from '../serial.service';
import {getGenres} from "../../shared/helper/genres";

@Component({
  selector: 'app-serials',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.scss']
})
export class SeriesComponent implements OnInit {

  listTv: RootTvResults[]=[]

  constructor(private serialService: SerialService) { }

  ngOnInit(): void {
    this.serialService.getTv().subscribe(data=>{
      this.listTv=data
      console.log(data)
    })

  }

  getGenres(id: number) {
    return getGenres(id)
  }


}
