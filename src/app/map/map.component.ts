import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  icon,
  latLng,
  marker,
  tileLayer,
  Map,
  Control,
  LocationEvent,
} from 'leaflet';

import { EMPTY, Subject } from 'rxjs';
import {
  takeUntil,
  catchError,
  mergeMap,
  switchMap,
  exhaustMap,
  concatMap,
  tap,
} from 'rxjs/operators';

import { ScootersService } from '../services/scooters.service';
import { SharedService } from '../services/shared.service';

import { Scooter } from '../models/scooter';

import { NgElement, WithProperties } from '@angular/elements';
import { MapPopupComponent } from './map-popup/map-popup.component';

import { MatDialog } from '@angular/material/dialog';
import { PreciseLocationComponent } from './precise-location/precise-location.component';

import { GoogleAnalyticsService } from 'ngx-google-analytics';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  reloadCmd$ = new Subject<Event>();

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private scootersService: ScootersService,
    private sharedService: SharedService,
    private matDialog: MatDialog,
    private $gaService: GoogleAnalyticsService
  ) {}

  // map configuration
  private mapTilesLayer = tileLayer(
    'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=' +
      environment.mapboxToken,
    {
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>, © <a href="https://www.mapbox.com/" target="_blank">Mapbox</a>',
    }
  );

  public mapOptions = {
    layers: [this.mapTilesLayer],
    zoom: 15,
    // maxZoom: 17, // wikimaps
    minZoom: 13,
    center: latLng([49.840817, 24.028381]),
  };

  public markerClusterData: any[] = [];
  public markerClusterOptions = {
    showCoverageOnHover: true,
    zoomToBoundsOnClick: true,
    spiderfyOnMaxZoom: false,
    disableClusteringAtZoom: 18,
  };

  // geoLocation
  public map: Map;
  public locateOptions: Control.LocateOptions = {
    keepCurrentZoomLevel: true,
    showPopup: false,
    // showCompass: true,
    flyTo: true,
    // https://leafletjs.com/reference.html#locate-options
    locateOptions: {
      enableHighAccuracy: true,
      watch: false,
    },
    // clickBehavior: {
    //   inView: 'stop',
    //   outOfView: 'setView',
    //   inViewNotFollowing: 'setView',
    // },
  };

  openPreciseLocationDialog() {
    this.matDialog.open(PreciseLocationComponent, {
      width: '80vw',
      maxWidth: '480px',
      maxHeight: '80vh',
      data: '',
      autoFocus: false,
    });
  }

  // Sets a map view that contains the given scooters with the maximum zoom level possible.
  private zoomToShowScootersNearLocation(
    locationLatLng: any,
    qtyOfScootersToShow: number = 1
  ): void {
    const close_markers = this.markerClusterData
      .map((m) => [m.getLatLng().distanceTo(locationLatLng), m.getLatLng()])
      .sort((a, b) => {
        return a[0] < b[0] ? -1 : 1;
      })
      .slice(0, qtyOfScootersToShow + 0.5)
      .map((d) => d[1]);

    close_markers.push(locationLatLng);

    console.log('>>', close_markers);

    if (close_markers.length > 0) {
      this.map.flyToBounds(close_markers);
    }
  }

  public onMapReady(map: Map) {
    this.map = map;
  }

  public onNewLocation(location: LocationEvent) {
    console.log('>', location);

    //ga
    try {
      this.$gaService.event(
        'myevent',
        'mylocation',
        `${location?.latlng?.lat},${location?.latlng?.lat},${location?.accuracy}`
      );
    } catch (error) {
      console.error(error);
    }

    // iphone Precise Location Off
    if (location?.accuracy > 100) {
      return this.openPreciseLocationDialog();
    }

    this.zoomToShowScootersNearLocation(location.latlng, 2);
  }

  private getMarkerPopup(scooter: Scooter): any {
    const popupEl: NgElement & WithProperties<MapPopupComponent> =
      document.createElement('map-popup-element') as any;

    popupEl.scooter = scooter;

    // Listen to the close event
    popupEl.addEventListener('closed', () =>
      document.body.removeChild(popupEl)
    );

    document.body.appendChild(popupEl);
    return popupEl;
  }

  private showMapWithScooters(scooters: Scooter[]): void {
    if (!scooters.at(0).brand) {
      return;
    }

    const markers = this.markerClusterData.filter(
      (s) => s.brand !== scooters.at(0).brand
    );
    this.markerClusterData = [];

    scooters.map((scooter: Scooter) => {
      const markerItem = marker([scooter.latitude, scooter.longitude], {
        icon: icon({
          iconUrl: `/assets/icons/marker-icon-${scooter.color}.png`,
          iconRetinaUrl: `/assets/icons/marker-icon-2x-${scooter.color}.png`,
          shadowUrl: 'leaflet/marker-shadow.png',
          tooltipAnchor: [16, -28],
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
          className: scooter.brand,
        }),
      }).bindPopup(() => this.getMarkerPopup(scooter), {
        autoClose: true,
        closeButton: false,
      });
      markerItem['brand'] = scooter.brand;
      markers.push(markerItem);
    });

    this.markerClusterData = [...markers];

    this.sharedService.loading$.next(false);
  }

  ngOnInit(): void {
    this.sharedService.cmdReload$
      .pipe(
        switchMap(() => this.scootersService.getScooters()),
        takeUntil(this.destroy$)
      )
      .subscribe((scooters) => {
        // console.log('!!', scooters);
        if (!scooters) {
          return;
        }
        this.showMapWithScooters(scooters);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
