import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/services/httpService/http.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.scss']
})
export class OrderplacedComponent implements OnInit {
orderDetail :any
  constructor(private route: ActivatedRoute,private httpService:HttpService) { }

  ngOnInit(): void {
  this.httpService.getAllOrder().subscribe(result1=>{
    this.route.params.subscribe((result2) => {
      console.log(result1.data);
      
      this.orderDetail = result1.data.filter((e: any) => e.orderId == result2['orderId']);
      console.log(this.orderDetail);
      console.log(this.orderDetail[0].addressMobileNumber);
      
    })
  });

}
}
