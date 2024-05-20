import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/httpService/http.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {

  orderList! : any[];
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    if (localStorage.getItem('authToken') != null) {
      this.httpService.getAllOrder().subscribe(res=>{
      this.orderList=res.data
    },err=>console.log(err))
    
  }
  }
}
