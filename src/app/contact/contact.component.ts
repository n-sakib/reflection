import { ViewChild } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, AfterViewInit } from '@angular/core';
import { } from 'googlemaps';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements AfterViewInit {
  
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;

  constructor() { }
  ngAfterViewInit(): void {
    const mapProperties = {
      center: new google.maps.LatLng(35.2271, -80.8431),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapProperties);
  }
}
