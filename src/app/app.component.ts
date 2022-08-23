
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { APIService } from './api.service';
import { map, pairwise, filter, throttleTime,   } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit   {
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;
  
  title = 'test';
  items: any[] = [];

  pageSize = 100;
  pageNumber = 1;

  loading = false;

  constructor(private test: APIService, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.getData(this.pageNumber, this.pageSize);
  }
  
  getData(pageNumber, pageSize) {
    this.loading = true;
    this.test.dummyData(pageNumber, pageSize).pipe(map((el: any) => {
      return [...this.items, ...el.data]
    })).subscribe((res: any) => {
      this.items = res;
      this.loading = false;
    })
  }

  test2(e) { 
    // console.log(e) 
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => { 
        return (y2 < y1 && y2 < 140)
      }),
      throttleTime(1000)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.getData(this.pageNumber++, this.pageSize)
      });
    }
    );
  }

}

