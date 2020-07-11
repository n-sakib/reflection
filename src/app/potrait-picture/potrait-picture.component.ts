import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-potrait-picture',
  templateUrl: './potrait-picture.component.html',
  styleUrls: ['./potrait-picture.component.css']
})
export class PotraitPictureComponent implements OnInit {
  
  @Input() potraitInfo;
  breakpoint;
  constructor(private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    console.log(this.potraitInfo)
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 825) ? 1 : 2;
    }
    getSanitizedFrame() {
      return this._sanitizer.bypassSecurityTrustStyle(`url(${this.potraitInfo.frameURL}) 30 stretch`);
    }
}
