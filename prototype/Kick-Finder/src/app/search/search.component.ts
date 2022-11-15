import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  data:any;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  getproductsSearch(name: any) {
    const keyword = name.target.value;
    const search = this.dataService.getSearchProductName(keyword);

  }
}
