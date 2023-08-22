import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SharedService } from './services/shared.service';
import { AboutComponent } from './about/about.component';

enum Texts {
  ERROR_NOT_ONLINE = 'No Internet connection!\nДля коректної роботи додатку необхідне підключення до інтернет.',
  OK = 'OK',
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(
    private sharedService: SharedService,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  private destroy$: Subject<boolean> = new Subject<boolean>();

  public lastUpdated$: Observable<string>;
  public isLoading$: Observable<boolean>;
  public isOnline$: Observable<boolean>;

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

  ngOnInit(): void {
    this.lastUpdated$ = this.sharedService.lastupdated$;
    this.isLoading$ = this.sharedService.loading$;
    this.isOnline$ = this.sharedService.checkNetworkStatus();

    this.isOnline$.pipe(takeUntil(this.destroy$)).subscribe((isOnline) => {
      let snackBarRef = this.matSnackBar;
      if (!isOnline) {
        snackBarRef.open(Texts.ERROR_NOT_ONLINE, Texts.OK);
      } else {
        snackBarRef.dismiss();
        this.sharedService.doReload();
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
