import { Component, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Scooter } from '../../models/scooter';
import { DeepLinks } from '../../shared/deeplinks';

@Component({
  selector: 'app-map-popup',
  templateUrl: './map-popup.component.html',
})
export class MapPopupComponent {
  @Input() scooter: Scooter;
  constructor(private deviceDetectorService: DeviceDetectorService) { }

  private platform: string;
  private deeplinks: any;

  openApp(): void {
    const brand = this.scooter.brand.toLowerCase().replace('-', '');
    this.platform = this.deviceDetectorService.getDeviceInfo()?.os || 'desktop';
    this.deeplinks = DeepLinks[brand];

    let url: string;
    if (this.platform == 'iOS') {
      url = this.deeplinks.ios;
    } else if (this.platform == 'Android') {
      url = this.deeplinks.android;
    }
    const iosWindowOpenHack = window.open(url, '_blank');
    iosWindowOpenHack.location.replace(`/deeplink/${brand}`);
  }
}
