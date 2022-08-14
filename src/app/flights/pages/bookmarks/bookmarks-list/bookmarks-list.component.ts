import { Component, OnInit, ViewChild, OnDestroy, TemplateRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { Bookmark } from '../../../../../app/shared/models/bookmark';
import { FlightsService } from '../../../../../app/flights/services/flights.service';
import { Subscription } from 'rxjs';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';

@Component({
  selector: 'app-bookmarks-list',
  templateUrl: './bookmarks-list.component.html',
  styleUrls: ['./bookmarks-list.component.css'],
  animations: [  
    trigger("listAnimation", [
      transition("* => *", [
        // each time the binding value changes
        query(
          ":leave",
          [
            style({transform: 'translateX(0)', opacity: 1}),
            animate('1000ms', style({transform: 'translateX(100%)', opacity: 0}))
          ],
          { optional: true }
        )
      ])
    ]),
  ]    
})
export class BookmarksListComponent implements OnInit, OnDestroy {

  bookmarks = new MatTableDataSource<Bookmark>();
  getBookmarkSub: Subscription;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  loading = false;

  displayedColumns: string[] = [
    'idBookmark',
    'title',
    'addingDate',
    'nbFlights',
    'view'];
  constructor(private readonly flightsService: FlightsService, private dialog: MatDialog) { }
  ngOnDestroy() {
    this.getBookmarkSub.unsubscribe();
  }

  ngOnInit(): void {
    this.bookmarks.paginator = this.paginator;
    this.bookmarks.sort = this.matSort;
    this.loading = true;
    this.getBookmarkSub = this.flightsService.getBookmarkList().subscribe(bookmarks => {
      this.bookmarks.data = bookmarks;
      this.loading = false;
    })
  }
  viewBookmark(idBookmark: number) {
    this.flightsService.viewBookmark(idBookmark);
  }
  deleteBookmark(bookmark: Bookmark) {
    this.flightsService.deleteBookmark(bookmark.idBookmark).subscribe(data => { 
      const newData = this.bookmarks.data;
      newData.splice(newData.indexOf(bookmark), 1);
      this.bookmarks.data = newData;    
      });      
  }
  openDialogWithRef(ref: TemplateRef<any>) {
    this.dialog.open(ref);
  }
  deleteAllBookmark() {
    this.flightsService.deleteAllBookmark().subscribe(data => {
      const newData = this.bookmarks.data;
      newData.splice(0,this.bookmarks.data.length);
      this.bookmarks.data = newData;
    });
  }
}
