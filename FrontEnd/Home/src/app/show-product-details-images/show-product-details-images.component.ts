import {Component, Inject} from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { FileHandle } from 'src/_model/file-handle.model';

@Component({
  selector: 'app-show-product-details-images',
  templateUrl: './show-product-details-images.component.html',
  styleUrls: ['./show-product-details-images.component.css']
})
export class ShowProductDetailsImagesComponent {

  constructor( @Inject(MAT_DIALOG_DATA) public data : any){}

  reciveImages(){
    console.log(this.data.images);
  }

  ngOnInit():void{
    this.reciveImages();
  }
}
