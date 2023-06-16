import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appImgSimilar]'
})
export class ImgSimilarDirective {
@Input() url: string

  constructor() { }

}
