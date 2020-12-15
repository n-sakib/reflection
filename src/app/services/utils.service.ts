import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastr: ToastrService) {}

  showError = (message) => {
    this.toastr.error(message);
  }
}
