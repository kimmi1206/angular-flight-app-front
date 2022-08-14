import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Bookmark } from '../../../../app/shared/models/bookmark';
import { FlightsService } from '../../services/flights.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css']
})
export class BookmarksComponent implements OnInit {

  constructor() { }
  headerLabel = 'headers.bookmarks.label';
  bdcrumbsLabel = 'bdcrumbs.bookmarks.label';
  showBookmark = true;
  isHidden = false;
  iconLabel = 'bookmark_border';
  ngOnInit(): void {
  }
  changeVisibility() {
    this.isHidden = !this.isHidden;
  }
}
