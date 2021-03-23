import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Moment } from '../../../model/moment';
import { AuthService } from '../../../service/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-list-moment',
  templateUrl: './list-moment.component.html',
  styleUrls: ['./list-moment.component.css']
})
export class ListMomentComponent implements OnInit {

  public displayedColumns = ['fileName', 'title', 'tags', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Moment>();
  base64Image : any;
  imageUrl;
  constructor(public authService: AuthService,private sanitizer:DomSanitizer) { }

  ngOnInit() {
    this.getAllMoments();
  }

  public getAllMoments = () => {
    this.authService.getAllMoments().subscribe(res => {
      this.dataSource.data = res as Moment[];
    });
  }

  public displayImage = (fileName: string) => {
    this.authService.getMomentImage(fileName).subscribe(res => {
      console.log(res);
      this.base64Image = res;
      let imageBase64String= btoa(this.base64Image);
      this.imageUrl = 'data:image/jpeg;base64,' + imageBase64String;
    })
  }

  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.base64Image);
}

  public DeleteMoment = (id:string) => {
    this.authService.deleteMoment(id).subscribe(res => {
      console.log(res);
      if(res._id == id){
        console.log("successfully deleted");
        //or check status code or send status code from backend in response
      }
    })
  }

}
