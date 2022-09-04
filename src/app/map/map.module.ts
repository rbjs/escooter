import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MapRoutingModule } from './map-routing.module';
import { MapComponent } from './map.component';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';

import { createCustomElement } from '@angular/elements';
import { MapPopupComponent } from './map-popup/map-popup.component';

import { PreciseLocationComponent } from './precise-location/precise-location.component'
import { MaterialModule } from '../shared/material.module';


@NgModule({
  declarations: [MapComponent, MapPopupComponent, PreciseLocationComponent],
  imports: [
    CommonModule,
    MapRoutingModule,
    LeafletModule,
    LeafletMarkerClusterModule,
    NgxLeafletLocateModule,
    MaterialModule,
  ],
  providers: [
  ],
  entryComponents: [MapPopupComponent]
})
export class MapModule {
  constructor(private injector: Injector) {
    // Register the custom element with the browser.
    const MapPopupElement = createCustomElement(MapPopupComponent, {injector});
    customElements.define('map-popup-element', MapPopupElement);
  }
}
