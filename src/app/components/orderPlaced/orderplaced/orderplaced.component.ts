import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/httpService/http.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.scss']
})
export class OrderplacedComponent implements OnInit {
orderDetail :any
  constructor(private route: ActivatedRoute,private dataService:DataService,private httpService:HttpService) { }

  ngOnInit(): void {
}
}
