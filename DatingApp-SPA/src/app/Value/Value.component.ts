import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Value',
  templateUrl: './Value.component.html',
  styleUrls: ['./Value.component.scss']
})
export class ValueComponent implements OnInit {

  private baseUrl:string = 'http://localhost:5000/Values';
  values:any;
  constructor(private http:HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  getValues(){
    return  this.http.get(this.baseUrl).subscribe(response=>{
      this.values = response;
  },error =>{
    console.log(error);
  }
  );
  }

}
