import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/_model/file-handle.model';
import { Product } from 'src/_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer:DomSanitizer) { }

  public createImages(product : Product){
    const productImages: any[] = product.productImages;
    const productImagesToFilesHandle : FileHandle[] = [];
    for ( let i = 0 ; i < productImages.length; i ++)  {
      const imageFileData = productImages[i];
      
      const imageBlob = this.dataURItoBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.Name, {type :imageFileData.type})
      
      const finalFileHandle : FileHandle = {
        file: imageFile,
        url: window.URL.createObjectURL(imageFile)
      };
      productImagesToFilesHandle.push(finalFileHandle);
    }
    product.productImages = productImagesToFilesHandle;
    return product;
  }
  
  public dataURItoBlob (picBytes : any, imageType : any){
    const byteString =  window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for(let i = 0 ; i < byteString.length; i ++){
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], {type : imageType});
    return blob;
  }
}
