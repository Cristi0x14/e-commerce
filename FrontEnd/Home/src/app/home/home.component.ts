import { Component, HostListener } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  products: Product[] = [];
  pageNumber: number = 1;
  showLoadButton = false;
  category: string = "";
  subcategory: string = "";
  subsubcategory: string = "";
  breakpoint: any;
  pageCount: number = 0;
  showSelectList: boolean =true;

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.products = [];
    this.route.params.subscribe(params => {
      this.category = params['category'] || '';
      this.subcategory = params['subcategory'] || '';
      this.subsubcategory = params['subsubcategory'] || '';
      this.getAllProduct(this.category, this.subcategory, this.subsubcategory);
    });
    this.updateBreakpoint(window.innerWidth);
    this.getPageCount(12, this.category, this.subcategory, this.subsubcategory);

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateBreakpoint(event.target.innerWidth);
  }


  private updateBreakpoint(windowWidth: number): void {
    if (windowWidth <= 600) {
      this.breakpoint = 2;
    }
    else if (windowWidth <= 1020) {
      this.breakpoint = 3
    }
    else if (windowWidth <= 1440) {
      this.breakpoint = 4;
    }
    else {
      this.breakpoint = 4;
    }
  }

  public getAllProduct(category: string = "", subcategory: string = "", subsubcategory: string = "") {
    this.products = [];
    this.productService.getAllProducts(this.pageNumber -1, category, subcategory, subsubcategory)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (data: Product[]) => {
          if (data.length == 12) {
            this.showLoadButton = true;
          }
          else {
            this.showLoadButton = false;
          }
          data.forEach(p => this.products.push(p));
          console.log('Products:', this.products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }

  public showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails/', { productId: productId }]);
  }

  public searchByKeyword(searchKeyword: string) {
    this.category = searchKeyword;
    this.pageNumber = 0;
    this.products = [];
    this.getAllProduct(this.category, this.subcategory, this.subsubcategory);
  }

  getDiscount(productActualPrice: number, productDiscountedPrice: number) {
    return (((productActualPrice - productDiscountedPrice) / productActualPrice) * 100).toFixed(0);
  }
  getPageCount(pageSize: number = 0, category: string = "", subcategory: string = "", subsubcategory: string = "") {
    this.productService.getPageCount(pageSize, category, subcategory, subsubcategory)
      .subscribe((pageCount: number) => {
        this.pageCount = pageCount;
        this.populateDropdown();
      });
  }

  pageBack() {
    if (this.pageNumber == 1) {
      return;
    }
    this.pageNumber = this.pageNumber - 1;
    this.getAllProduct(this.category, this.subcategory, this.subsubcategory);
  }
  pageForward() {
    if (this.pageNumber>= this.pageCount) {
      return;
    }
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct(this.category, this.subcategory, this.subsubcategory);
  }

  populateDropdown(): void {
    const numberSelect: HTMLSelectElement | null = document.getElementById("numberSelect") as HTMLSelectElement | null;

    if (numberSelect) {
      for (let i = 1; i <= this.pageCount; i++) {
        const option: HTMLOptionElement = document.createElement("option");
        option.value = i.toString();
        option.text = i.toString();
        numberSelect.appendChild(option);
      }
    }
  }
  toggleSelectList(){
    this.showSelectList=!this.showSelectList;
  }

  onSelectionChange(event: any): void {
    this.pageNumber =+ event.target.value;
    this.getAllProduct(this.category,this.subcategory,this.subsubcategory);
  }
}
