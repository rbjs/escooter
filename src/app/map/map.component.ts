import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  icon,
  latLng,
  marker,
  tileLayer,
  Map,
  Control,
  LocationEvent,
  control,
} from 'leaflet';

import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { tap, throttleTime, delay, mergeMap, repeat } from 'rxjs/operators';

import { ScootersService } from '../services/scooters.service';
import { SharedService } from '../services/shared.service';

import { Scooter } from '../models/scooter';

import { NgElement, WithProperties } from '@angular/elements';
import { MapPopupComponent } from './map-popup/map-popup.component';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { PreciseLocationComponent } from './precise-location/precise-location.component';

import { GoogleAnalyticsService } from 'ngx-google-analytics';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  @Input()
  reloadCmd$ = new Subject<Event>();

  private subscription$: Subscription[] = [];

  constructor(
    private scootersService: ScootersService,
    private sharedService: SharedService,
    private router: Router,
    private matDialog: MatDialog,
    private $gaService: GoogleAnalyticsService
  ) {}

  // map configuration
  // private mapTilesLayer = tileLayer(
  //   'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
  //   {
  //     id: 'mapbox/streets-v11',
  //     tileSize: 512,
  //     zoomOffset: -1,
  //     attribution:
  //       'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  //   }
  // );

  private mapTilesLayer = tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      // id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
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
    // keepCurrentZoomLevel: true,
    flyTo: true,
    locateOptions: {
      enableHighAccuracy: true,
      watch: true,
    },
    clickBehavior: {
      inView: 'stop',
      outOfView: 'setView',
      inViewNotFollowing: 'setView',
    },
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

  private makeDataLayer(): void {
    const markers = [];
    this.subscription$[0] = this.scootersService.getScooters().subscribe({
      next: (brandNetwork) => {
        brandNetwork.map((scooters) =>
          (scooters as unknown as Scooter[]).map((scooter) => {
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

            markers.push(markerItem);
          })
        );

        this.markerClusterData = [...markers];
        // this.zoomToShowScootersNearLocation(this.map.getCenter(), 30);
      },
      error: (error) => console.log(error),
    });
  }

  ngOnInit(): void {
    this.subscription$[1] = this.sharedService.cmdReload$
      .pipe(tap(() => this.sharedService.loading$.next(true)))
      .pipe(delay(400))
      .pipe(tap(() => this.sharedService.loading$.next(false)))
      .pipe(throttleTime(5000))
      .pipe(tap(() => this.sharedService.loading$.next(true)))
      // .pipe(tap(this.makeDataLayer), delay(1000 * 60 * 5), repeat())
      .subscribe(() => {
        this.makeDataLayer();
      });
  }

  ngOnDestroy(): void {
    this.subscription$.forEach((subscription) => subscription.unsubscribe());
  }
}
