import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appBanner]'
})
export class BannerDirective implements OnInit{

  url:string='http://image.tmdb.org/t/p/original/'
  tempUrl='https://www.beano.com/wp-content/uploads/legacy/88190_logo1-b.jpg?strip=all&quality=86&w=887'

  @Input('appBanner')  img:string

  constructor(private el:ElementRef,
              private r2:Renderer2) { }

  ngOnInit(): void {
    if(this.img) {
      this.r2.setStyle(this.el.nativeElement, 'backgroundImage', `url(${this.url}${this.img})`)
    }
    else {
      this.r2.setStyle(this.el.nativeElement, 'backgroundImage', `url(${this.tempUrl})`)
      //this.r2.setStyle(this.el.nativeElement, 'backgroundSize', 'contain')
    }
  }

}
