import { Component, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Output() queryEvent = new EventEmitter<string>();

  constructor() { }

  sendQuery(event : any) {
    this.queryEvent.emit(event.target.value)
  }

  ngOnInit(): void {
  }

}
