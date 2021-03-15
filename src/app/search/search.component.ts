import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpParams, } from '@angular/common/http';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { debounce, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  public inputValue = '';
  public searchSubject: Subject<string> = new Subject<string>();
  public searchResult$: Observable<any> | undefined;
  private subscriptions: Array<Subscription> = new Array<Subscription>();
  public isSearching = false;
  public columns: string[] = ['Project Name', 'Stars', 'Detail'];
  public dataSource: Array<any> = new Array<any>();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.subscriptions.push(this.searchSubject.pipe(
      debounce(() => timer(1000)),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.isSearching = false;
      if (value.length > 0) {
        this.searchResult$ = this.http.get('https://api.github.com/search/repositories',
          {
            params: new HttpParams()
              .set('q', value)
              .set('per_page', '10')
          }
        );
      }
    }));
  }

  public search(): void {
    this.isSearching = true;
    this.searchSubject.next(this.inputValue);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}
