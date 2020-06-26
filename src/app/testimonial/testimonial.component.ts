import { Component, OnInit } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  completed: boolean = false;
  state: string;
  
  done() {
      this.completed = true;
      this.state = 'done';
  }
}
