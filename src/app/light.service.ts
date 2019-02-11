import { Injectable } from '@angular/core';
import { Constants } from './constants';
import { BehaviorSubject } from 'rxjs';
import { ConditionalExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class LightService {

  private characteristic: BluetoothRemoteGATTCharacteristic;

  device$ = new BehaviorSubject<BluetoothDevice>(null);

  constructor() { }

  connect() {
    navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: [Constants.guids.service] })
      .then(device => {
        console.log(device);
        device.addEventListener('gattserverdisconnected', () => {
          alert('DISCONNECTED');
        });
        this.device$.next(device);
        return device.gatt.connect();
      })
      .then(server => {
        console.log(server);
        return server.getPrimaryService(Constants.guids.service);
      })
      .then(service => {
        console.log(service);
        return service.getCharacteristic(Constants.guids.characteristic);
      })
      .then(characteristic => {
        console.log(characteristic);
        this.characteristic = characteristic;
      })
      .catch(error => { this.disconnect(); alert(error); });
  }

  disconnect() {
    if (this.device$.value) {
      this.device$.value.gatt.disconnect();
    }
    this.device$.next(null);
    this.characteristic = null;
  }

  turnOn() {
    if (this.characteristic) {
      this.characteristic.writeValue(Constants.commands.turnOn);
    }
  }

  turnOff() {
    if (this.characteristic) {
      this.characteristic.writeValue(Constants.commands.turnOff);
    }
  }

  setColor(red: number, green: number, blue: number) {
    let value = new Uint8Array([0x56, red, green, blue, 0xFF, 0xF0, 0xAA]);
    this.characteristic.writeValue(value);
  }

  setWarmWhite(brightness: number) {
    let value = new Uint8Array([0x56, 0, 0, 0, brightness, 0x0F, 0xAA]);
    this.characteristic.writeValue(value);
  }
}
