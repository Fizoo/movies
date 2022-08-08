import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPoster]'
})
export class PosterDirective implements OnInit{

 @Input('appPoster') img: string

  url:string='http://image.tmdb.org/t/p/w500//'

  constructor(private el:ElementRef,
              private r2:Renderer2
              ) { }

  ngOnInit(): void {
    this.r2.setStyle(this.el.nativeElement,'backgroundImage',`url(${this.url}${this.img})`)
  }


}
