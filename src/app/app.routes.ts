import {Routes} from '@angular/router';
import {WebsiteComponent} from "./website/website.component";


export const routes: Routes = [

  // Average initial loading time around 15ms
  {
    path: 'test', component: WebsiteComponent
  },
  // Wildcard route seems to be the core of the problem: Average initial loading time around 300ms
  {
    path: '**', component: WebsiteComponent
  },
];
