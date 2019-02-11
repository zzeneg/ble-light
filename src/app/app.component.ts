import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LightService } from './light.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isConnected$: Observable<boolean>;

  constructor(private lightService: LightService) { }

  ngOnInit() {
    if (!navigator.bluetooth) {
      alert('Web Bluetooth API is not supported on this device');
    }

    this.isConnected$ = this.lightService.device$.pipe(map(x => !!x));

    window.onbeforeunload = (ev) => this.lightService.disconnect();
  }

}
