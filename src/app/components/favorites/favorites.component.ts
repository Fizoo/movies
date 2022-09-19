import { Component, OnInit } from '@angular/core';
import { RootObject } from '../shared/model/model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {
  favoriteArr: RootObject[];

  constructor() { }

  ngOnInit(): void {
  }

}
