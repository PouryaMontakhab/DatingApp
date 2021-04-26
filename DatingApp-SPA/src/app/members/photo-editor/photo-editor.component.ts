import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from 'src/app/_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_Services/auth.service';
import { UserService } from 'src/app/_Services/user.service';
import { AlertifyService } from 'src/app/_Services/alertify.service';




@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos : Photo[];
  @Output() getMemberPhotoChange = new EventEmitter<string>();
  currentMain : Photo;
  baseUrl = environment.apiUrl;

  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  response:string;

  ngOnInit() {
  }


constructor (private authService : AuthService , private userService : UserService , private alertService : AlertifyService){
  this.uploader = new FileUploader({
    url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
    authToken : 'Bearer ' + localStorage.getItem('token'),
    allowedFileType:['image'],
    removeAfterUpload:true,
    autoUpload:false,
    maxFileSize : 10*1024*1024,
    formatDataFunction: async (item) => {
      return new Promise( (resolve, reject) => {
        resolve({
          name: item._file.name,
          length: item._file.size,
          contentType: item._file.type,
          date: new Date()
        });
      });
    }
  });

  this.hasBaseDropZoneOver = false; 
  this.response = '';
  this.uploader.onAfterAddingFile = (file) =>{file.withCredentials=false};
  this.uploader.onSuccessItem = (item,response,status,headers) =>{
    if(response){
      const res : Photo = JSON.parse(response);
      const photo  = {
        id:res.id,
        url:res.url,
        dateAdded:res.dateAdded,
        description : res.description,
        isMain:res.isMain
      }
      this.photos.push(photo);
      if(photo.isMain){
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
      }
    }
  }
  this.uploader.response.subscribe( res => this.response = res );
}



 fileOverBase(e:any):void {
  this.hasBaseDropZoneOver = e;
}

setMainPhoto(photo : Photo){
  this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(()=>{
    this.currentMain = this.photos.filter(p=> p.isMain === true)[0];
    this.currentMain.isMain=false;
    photo.isMain = true;
    this.authService.changeMemberPhoto(photo.url);
    this.authService.currentUser.photoUrl = photo.url;
    localStorage.setItem('user',JSON.stringify(this.authService.currentUser));
  },error=>{this.alertService.error(error)})
}

deletePhoto(id:number){
  this.alertService.confirm("Are you sure you want to delete this photo ? " , ()=>{
    this.userService.deletePhoto(this.authService.decodedToken.nameid , id).subscribe(result =>{
      this.photos.splice(this.photos.findIndex(p => p.id === id),1);
      this.alertService.success("photo has been deleted");
    },error=>{this.alertService.error(error)})
  })
}

}
