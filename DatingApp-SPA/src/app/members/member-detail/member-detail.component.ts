import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/alertify.service';
import { UserService } from 'src/app/_Services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  constructor(private userService :UserService ,
     private alertService : AlertifyService ,
     private route : ActivatedRoute) { }

     galleryOptions: NgxGalleryOptions[];
     galleryImages: NgxGalleryImage[];
     @ViewChild('memberTabs',{ static: true }) memberTabs : TabsetComponent; 
     user : User;
  ngOnInit() {
    this.route.data.subscribe((data) =>{
      this.user = data['user']
    })
    this.route.queryParams.subscribe(params => {
      const selectedTab = params['tab'];
      this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active=true;
    })

    this.galleryOptions = [
            {
                width: '500px',
                height: '500px',
                imagePercent : 100,
                thumbnailsColumns: 4,
                imageAnimation: NgxGalleryAnimation.Slide,
                preview : true
            }]
    this.galleryImages = this.getImages();
            
  }

  getImages(){
    const imageUrls = [];
    for (const item of this.user.photos) {
      imageUrls.push({
        small : item.url,
        medium : item.url,
        big : item.url,
        description : item.description
      });
    }
    return imageUrls;
  }

  selectTab(tabId:number){
    this.memberTabs.tabs[tabId].active =true;
  }

  

}
