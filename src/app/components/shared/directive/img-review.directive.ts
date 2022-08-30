import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appImgReview]'
})
export class ImgReviewDirective implements OnInit{

@Input('appImgReview') value: string

  constructor(private el:ElementRef,
              private r2:Renderer2) { }

  ngOnInit(): void {
  this.r2.setAttribute(this.el.nativeElement,'src',this.getImgRev(this.value))
  }

  getImgRev(value:string):string{
    if(!!value) {
      let url = value.slice(1)

      if (url.split(':')[0] === 'https')
        return url
      else
        return  `http://image.tmdb.org/t/p/w500/${url}`
    }
    else
      return '../../../../assets/logo/logo-2.png'
  }

}
