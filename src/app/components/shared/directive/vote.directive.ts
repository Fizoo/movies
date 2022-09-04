import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appVote]'
})
export class VoteDirective implements OnInit{

  votes: number[] = []
  voteAll: number[]

  @Input('appVote') vote: number

  constructor(private el:ElementRef,
              private r2:Renderer2) { }

  ngOnInit(): void {

    this.votes = Array(Math.floor(this.vote)).fill(1)
    this.voteAll =this.vote < 9 ? Array(9 - Math.floor(this.vote)).fill(1) : []

   this.votes.forEach(()=>{
     let i1 = this.r2.createElement('i');
     this.r2.setAttribute(i1, 'class', 'bi bi-star-fill text-danger');

     this.r2.appendChild(this.el.nativeElement,i1);
   })

    if(this.vote<=9){
      let i2 = this.r2.createElement('i');
      this.r2.setAttribute(i2, 'class', 'bi bi-star-half text-danger');
      this.r2.appendChild(this.el.nativeElement,i2);
    }

    this.voteAll.forEach(()=>{
      let i3 = this.r2.createElement('i');
      this.r2.setAttribute(i3, 'class', 'bi bi-star text-danger');
      this.r2.appendChild(this.el.nativeElement,i3);
    })

  }

}
