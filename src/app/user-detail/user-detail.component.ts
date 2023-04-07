import { Component, OnInit } from '@angular/core';
import { User } from '../modules/module/user';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/service.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
 
   public userID!: number;
   public userDetails!:User;
 

constructor(private activedRoute:ActivatedRoute, private route:Router,private api:ApiService, ){}

  ngOnInit(): void {
  this.activedRoute.params.subscribe(res=>{
    this.userID = res['id'];
    this.fetchUserDetails(this.userID);
  })
  }
   
 fetchUserDetails(userID:number){
 this.api.getRegistrationUserId(userID).subscribe(res=>{
  this.userDetails = res;
  console.log(this.userDetails);
 })
 }
 back(){
  this.route.navigate(['list'])
 }

}
