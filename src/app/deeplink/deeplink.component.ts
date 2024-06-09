import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DeviceDetectorService } from 'ngx-device-detector';
import { DeepLinks } from '../shared/deeplinks';

@Component({
  selector: 'app-deeplink',
  templateUrl: './deeplink.component.html',
  styleUrls: ['./deeplink.component.scss'],
})
export class DeeplinkComponent implements OnInit {
  constructor(
    private deviceDetectorService: DeviceDetectorService,
    private route: ActivatedRoute
  ) {}

  public brand: string;
  public platform: string;
  public deeplinks: any;
  
  ngOnInit(): void {
    this.brand = this.route.snapshot.paramMap.get('brand');
    this.platform = this.deviceDetectorService.getDeviceInfo()?.os || 'desktop';
    this.deeplinks = DeepLinks[this.brand];

    if (this.platform == 'iOS') {
      window.location.replace(this.deeplinks.ios);
      setTimeout(() => {
        window.location.replace(this.deeplinks.appstore);
      }, 10000);
    } else if (this.platform == 'Android') {
      window.location.replace(this.deeplinks.android);
      setTimeout(() => {
        window.location.replace(this.deeplinks.playmarket);
      }, 10000);
    }
  }
}
