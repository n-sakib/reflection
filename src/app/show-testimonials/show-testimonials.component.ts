import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-show-testimonials',
  templateUrl: './show-testimonials.component.html',
  styleUrls: ['./show-testimonials.component.css']
})
export class ShowTestimonialsComponent implements OnInit {

  @Input() testiInfo;
  constructor() { }

  ngOnInit(): void {
    console.log(this.testiInfo)
  }

}
