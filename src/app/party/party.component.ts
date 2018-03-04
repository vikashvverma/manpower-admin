import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Party } from './shared/party.models';
import { PartyService } from './shared/party.service';
import { AuthenticationService } from '../login/shared/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-party',
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {

  displayedColumns = ['name', 'business', 'website', 'address', 'city', 'state', 'pin', 'country', 'mobile', 'email', 'query'];
  dataSource: MatTableDataSource<Party>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private _router: Router, private _service: AuthenticationService,
              private partService: PartyService, public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    if (!this._service.checkCredentials()) {
      this.snackBar.open('Please login to access this section!', '', { duration: 2000});
      this._service.logout();
      return;
    }
    this.search();
  }

  search() {
    this.partService.party().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.setSortPaginator();
    }, err => {
      this.snackBar.open('Could not fetch queries!', '', { duration: 2000, extraClasses: ['snackbar']});
    });
  }

  setSortPaginator() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
