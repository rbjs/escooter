import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './services/shared.service';
import { delay } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { AboutComponent } from './about/about.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private sharedService: SharedService,
    private matDialog: MatDialog
  ) {}
  private subscription$: Subscription[] = [];

  public lastUpdate: string;

  public btnReload() {
    this.sharedService.doReload();
  }

  openDialog() {
    this.matDialog.open(AboutComponent, {
      width: '80vw',
      maxWidth: '480px',
      maxHeight: '80vh',
      data: '',
      autoFocus: false,
    });
  }

  public isOnline: boolean;
  public loading: boolean;

  ngOnInit(): void {
    this.subscription$[0] = this.sharedService.lastupdated$
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((lastUpdate) => {
        this.lastUpdate = lastUpdate;
        this.sharedService.loading$.next(false);
      });

      this.subscription$[1] =  this.sharedService.loading$
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
        .subscribe((loading) => {
        this.loading = loading
      });
    
    this.subscription$[2] = this.sharedService
      .checkNetworkStatus()
      .subscribe((isOnline) => {
        this.isOnline = isOnline;
        if (!this.isOnline) {
          alert("No Internet connection!\nДля коректної роботи додатку необхідне підключення до інтернет.");
        }
      });
    
    
    
  }

  ngOnDestroy(): void {
    this.subscription$.forEach((subscription) => subscription.unsubscribe());
  }
}
