import { Component, OnInit , Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  @Input() paintingInfo;


  constructor() { }

  ngOnInit(): void {
    console.log(this.paintingInfo);
  }
  
}
