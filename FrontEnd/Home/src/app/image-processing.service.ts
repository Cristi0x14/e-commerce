import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/_model/file-handle.model';
import { Product } from 'src/_model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor() { }

  public createImages(product: any): any {
    const productImages = product.productImages || []; 

    if (productImages.length === 0) {
      return product; 
    }

    const productImagesToFilesHandle: any[] = [];
    for (let i = 0; i < productImages.length; i++) {
      const imageData = productImages[i];
      if (!imageData) continue; 

      const imageBlob = this.dataURItoBlob(imageData.picByte, imageData.type);
      const imageFile = new File([imageBlob], imageData.Name, { type: imageData.type });

      const finalFileHandle: any = {
        file: imageFile,
        url: window.URL.createObjectURL(imageFile)
      };
      productImagesToFilesHandle.push(finalFileHandle);
    }
    product.productImages = productImagesToFilesHandle;
    return product;
  }

  public dataURItoBlob(picBytes: any, imageType: any): Blob {
    if (!picBytes) return new Blob;
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}