import { Component, OnInit,Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-digital-picture',
  templateUrl: './digital-picture.component.html',
  styleUrls: ['./digital-picture.component.css']
})
export class DigitalPictureComponent implements OnInit {

  breakpoint;
  @Input() digitalInfo;

  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.digitalInfo)
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 825) ? 1 : 2;
    }
    getSanitizedFrame() {
      return this._sanitizer.bypassSecurityTrustStyle(`url(${this.digitalInfo.frameURL}) 30 stretch`);
    }
}
