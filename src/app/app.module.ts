import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobComponent } from './job/job.component';
import { HomeComponent } from './home/home.component';
import { JobService } from './job/shared/job.service';
import { JobDialogComponent } from './job/job-dialog/job-dialog.component';
import { PartyComponent } from './party/party.component';
import { PartyService } from './party/shared/party.service';


@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    HomeComponent,
    JobDialogComponent,
    PartyComponent
  ],
  imports: [
    BrowserModule,
    CdkTableModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [JobService, PartyService],
  bootstrap: [AppComponent],
  entryComponents: [JobDialogComponent]
})
export class AppModule {
}
