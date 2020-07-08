import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-digital-picture',
  templateUrl: './digital-picture.component.html',
  styleUrls: ['./digital-picture.component.css']
})
export class DigitalPictureComponent implements OnInit {

  breakpoint;
  @Input() digitalInfo;

  constructor() { }

  ngOnInit(): void {
    console.log(this.digitalInfo)
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 825) ? 1 : 2;
    }
}
