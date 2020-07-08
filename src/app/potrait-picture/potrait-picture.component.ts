import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-potrait-picture',
  templateUrl: './potrait-picture.component.html',
  styleUrls: ['./potrait-picture.component.css']
})
export class PotraitPictureComponent implements OnInit {
  
  @Input() potraitInfo;
  breakpoint;
  constructor() { }

  ngOnInit(): void {
    console.log(this.potraitInfo)
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 825) ? 1 : 2;
    }
}
