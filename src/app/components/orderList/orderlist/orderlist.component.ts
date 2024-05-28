import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/dataService/data.service';
import { HttpService } from 'src/app/services/httpService/http.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {

  orderList! : any[];
  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      this.dataService.currOrderList.subscribe(res=>{
      this.orderList=res
    },err=>console.log(err))
    
  }
  }
}
