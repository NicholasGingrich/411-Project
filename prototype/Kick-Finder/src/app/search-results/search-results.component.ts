import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { BehaviorSubject, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  constructor(public http: HttpClient) {this.serverMessageSubject= new BehaviorSubject<any>(null) }

  search_query : string = "";
  search_response = [];
  search_name_price : any[] = [];
  hasSearched: boolean = false;


  serverMessageSubject: BehaviorSubject<any>;
  serverMessage$: Observable<any>;


  ngOnInit(): void {

  }

  extractNamePrice(){
    for (var shoeRecord of this.search_response) {
      this.search_name_price.push([shoeRecord["name"], shoeRecord["estimatedMarketValue"], shoeRecord["links"]["goat"], 
      shoeRecord["image"]["small"]])
    }
  }

  getData() {
    this.http
      .get<any>('http://127.0.0.1:5002/sneakers/'.concat(this.search_query))
      .pipe(
        tap((result) => {
          this.serverMessageSubject.next(result);
        })
      )
      .subscribe((data) => {console.log(data);this.search_response = data.results;this.extractNamePrice()});
  }

  receiveQuery(event : any) {
    this.search_query = event
    this.hasSearched = true;

    this.getData();
    this.serverMessage$= this.serverMessageSubject.asObservable();
    this.serverMessage$.subscribe((result)=>
    {
       result
    })
  }


}
