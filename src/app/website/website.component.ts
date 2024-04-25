import {Component, Inject, makeStateKey, OnInit, PLATFORM_ID, TransferState} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {isPlatformBrowser, isPlatformServer, JsonPipe, NgForOf} from "@angular/common";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

const DATA_KEY = makeStateKey<{ data: any }>('data');

@UntilDestroy()
@Component({
  selector: 'app-website',
  standalone: true,
  imports: [
    JsonPipe,
    NgForOf
  ],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent implements OnInit {
  result: object | undefined;


  constructor(
    private httpClient: HttpClient,
    @Inject(PLATFORM_ID) private platformID: object,
    private transferState: TransferState,
  ) {
  }

  ngOnInit() {

    if (isPlatformServer(this.platformID)) {
      this.httpClient
        .get(
          'https://api.open-meteo.com/v1/forecast?latitude=52.462&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m',
        )
        .pipe(
          tap(result => {
            this.transferState.set(DATA_KEY, {data: result});
          }),
          untilDestroyed(this),
        )
        .subscribe();
    } else if (isPlatformBrowser(this.platformID)) {
      this.result = this.transferState.get<{ data: any }>(DATA_KEY, {data: null})?.data;
      this.transferState.remove(DATA_KEY);
    }
  }
}
