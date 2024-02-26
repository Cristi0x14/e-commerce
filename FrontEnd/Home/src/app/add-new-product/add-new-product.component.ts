import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/_model/product.model';
import { ProductService } from '../_services/product.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { FileHandle } from 'src/_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent {
  product: Product = {
    productId: "",
    productName: "",
    productDescription: "",
    productDiscountedPrice: 0,
    productActualPrice: 0,
    category:"",
    brand:"",
    gender:"",
    productImages: [],
    colorSizes: []
  }

  currentColor: string = "";
  currentSize: string = "";

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.product = this.activatedRoute.snapshot.data['product'];
  }

  addProduct(productForm: NgForm) {

    const productFormData = this.prepareFormData(this.product);

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        productForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  prepareFormData(product: Product): FormData {
    const formData = new FormData();

    formData.append(
      'product',
      new Blob([JSON.stringify(product)], { type: 'application/json' })
    );

    for (let i = 0; i < product.productImages.length; i++) {
      formData.append(
        'image_file',
        product.productImages[i].file,
        product.productImages[i].file.name
      );
    }
    formData.append('variations',
    new Blob([JSON.stringify(product.colorSizes)], { type: 'application/json' }));

    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];

      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      }

      this.product.productImages.push(fileHandle)

    }
  }

  removeImages(i: number) {
    this.product.productImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.product.productImages.push(fileHandle);
  }

  TestProduct() {
    const product = {
      productName: "Example Product",
      productDescription: "Product Description",
      productDiscountedPrice: 20.50,
      productActualPrice: 30.00,
      category: "Example Category",
      brand: "Example Brand",
      gender: "Male" 
    };

    const images: any[] = []; 
    const variations = [
      { color: "Red", sizes: "Small, Medium" },
      { color: "Blue", sizes: "Medium, Large" }
    ]; 

    const formData = new FormData();

    formData.append('product', 
    new Blob([JSON.stringify(product)], { type: 'application/json' }));

    for (let i = 0; i < this.product.productImages.length; i++) {
      formData.append(
        'image_file',
        this.product.productImages[i].file,
        this.product.productImages[i].file.name
      );
    }

    formData.append('variations',
    new Blob([JSON.stringify(variations)], { type: 'application/json' }));

    this.addProduct1(formData);
    
  }
  addProduct1(productFormData : FormData) {

    this.productService.addProduct(productFormData).subscribe(
      (response: Product) => {
        console.log("OK");
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  addColorSize() {
    if (this.currentColor && this.currentSize) {
      this.product.colorSizes.push({ color: this.currentColor, sizes: this.currentSize });
      this.currentColor = "";
      this.currentSize = "";
    }
  }

  removeColorSize(index: number) {
    this.product.colorSizes.splice(index, 1);
  }
}


