import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { catchError, map, Observable, tap } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { Brands } from '../shared/brands';
import { Scooter } from '../models/scooter';

@Injectable()
export class ScootersInterceptor implements HttpInterceptor {
  constructor(private sharedService: SharedService) {}

  private brandKeys: string[] = Object.keys(Brands);
  private brandKeysPattern = new RegExp(this.brandKeys.join('|'));

  private transformBodyResponse(httpEvent: any): any {
    const key = this.brandKeys.find((key) => httpEvent.url.includes(key));
    const brand = Brands[key];
    const data = brand
      .parseFn(brand.name, httpEvent.body)
      .filter((item: Scooter) => item?.latitude && item?.longitude);
    return data;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.brandKeysPattern.test(request.url)) {
      return next.handle(request).pipe(
        tap((x) => console.log),
        map((event: HttpEvent<unknown>) => {
          if (event instanceof HttpResponse) {
            event = event.clone({
              body: this.transformBodyResponse(event),
            });
          }

          return event;
        })
      );
    }
    return next.handle(request);
  }
}
