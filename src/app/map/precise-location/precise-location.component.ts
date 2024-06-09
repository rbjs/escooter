import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService, DeviceInfo } from 'ngx-device-detector';

@Component({
  selector: 'app-precise-location',
  templateUrl: './precise-location.component.html',
  styleUrls: ['./precise-location.component.scss']
})
export class PreciseLocationComponent implements OnInit {

  deviceInfo: DeviceInfo;
  is_iOS: boolean = false;

  constructor(private deviceDetectorService: DeviceDetectorService) { }
  
  ngOnInit(): void {
    this.deviceInfo = this.deviceDetectorService.getDeviceInfo();
    this.is_iOS = this.deviceInfo.os == 'iOS'
  }

}
