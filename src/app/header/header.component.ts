import { Component, OnInit } from '@angular/core';
import { LightService } from '../light.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  deviceName$: Observable<string>;

  constructor(private lightService: LightService) { }

  ngOnInit() {
    this.deviceName$ = this.lightService.device$.pipe(map(x => x ? x.name : ''));
  }

  onConnect() {
    this.lightService.connect();
  }

  onDisconnect() {
    this.lightService.disconnect();
  }

}
