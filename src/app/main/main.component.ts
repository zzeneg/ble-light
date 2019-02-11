import { Component, OnInit } from '@angular/core';
import { LightService } from '../light.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import iro from '@jaames/iro';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private colorPicker: any;

  constructor(private lightService: LightService) { }

  ngOnInit() {
    this.colorPicker = new iro.ColorPicker('#color-picker-container', {
      width: 320,
      height: 320,
      color: '#f00'
    });

    this.colorPicker.on('color:change', (color, changes) => {
      console.log(color.rgb);
      this.lightService.setColor(color.rgb.r, color.rgb.g, color.rgb.b);
    });
  }

  turnOn() {
    this.lightService.turnOn();
  }

  turnOff() {
    this.lightService.turnOff();
  }
}
