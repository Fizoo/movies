import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appPoster]'
})
export class PosterDirective implements OnInit{

 @Input('appPoster') img: string

  url:string='http://image.tmdb.org/t/p/w500//'
 // url:string='http://image.tmdb.org/t/p/w500//3V447myclihccqnSiVFVdlnNjZs.jpg'

  tempUrl='https://www.beano.com/wp-content/uploads/legacy/88190_logo1-b.jpg?strip=all&quality=86&w=887'

  constructor(private el:ElementRef,
              private r2:Renderer2
              ) { }

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
