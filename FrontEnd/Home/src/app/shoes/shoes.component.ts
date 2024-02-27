import { Component, HostListener } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './shoes.component.html',
  styleUrls: ['./shoes.component.css']
})
export class ShoesComponent {

  products: Product[] = [];
  displayedProducts: Product[] = [];
  pageNumber: number = 1;
  showLoadButton = false;
  category: string = "";
  subcategory: string = "";
  subsubcategory: string = "";
  breakpoint: any;
  pageCount: number = 0;
  showSelectList: boolean =true;

  colors: string[] = [
    'Black', 'Blue', 'Brown', 'Green', 'Grey',
    'Multi-Colour', 'Orange', 'Pink', 'Purple',
    'Red', 'White', 'Yellow'
  ];
  selectedColors: boolean[] = [];
  toggleColorSelection(index: number) {
    this.selectedColors[index] = !this.selectedColors[index];
  }

  shoeSizes: number[] = [
    33.5, 34, 35, 35.5, 36, 36.5, 37.5, 38, 38.5, 39,
    40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5,
    46, 47
  ];

  selectedSize: boolean[] = [];
  toggleSizeSelection(index: number) {
    this.selectedSize[index] = !this.selectedSize[index];
  }

  constructor(private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { 

      this.selectedColors = new Array(this.colors.length).fill(false);
      this.selectedSize = new Array(this.shoeSizes.length).fill(false);
      
      this.genderForm = this.formBuilder.group({
        men: false,
        women: false,
        unisex: false,
        boys: false,
        girls: false,
      });

      this.categoryForm = this.formBuilder.group({
        shoes:true,
        clothes:false,
        gym:false,
      });

      this.brandForm = this.formBuilder.group({
        nike:false,
        adidas:false,
      });

      this.genderForm.valueChanges.subscribe(value => {
        this.GenderFilterChange(value);
      });

      this.categoryForm.valueChanges.subscribe(value => {
        this.CategoryFilterChange(value);
      });

      this.brandForm.valueChanges.subscribe(value => {
        this.BrandFilterChange(value);
      });

    }


    genderForm: FormGroup;
    categoryForm: FormGroup;
    brandForm: FormGroup;

    selectedGenders: string[] = [];

    selectedBrands: string[] = [];

    selectedCategory: string[] = ["shoes"];

    selectedSizeString : string [] = ["45","44"];
    selectedColorString : string [] = ["red","white"];


    GenderFilterChange(value: any) {
      const selectedGenders: string[] = [];
      Object.keys(value).forEach(key => {
        if (value[key]) {
          selectedGenders.push(key);
        }
      });
      this.selectedGenders=selectedGenders;
      this.getAllProduct();
    }

    CategoryFilterChange(value: any) {
      const selectedCategory: string[] = [];
      Object.keys(value).forEach(key => {
        if (value[key]) {
          selectedCategory.push(key);
        }
      });
      this.selectedCategory=selectedCategory;
      this.getAllProduct();
    }

    BrandFilterChange(value: any) {
      const selectedBrands: string[] = [];
      Object.keys(value).forEach(key => {
        if (value[key]) {
          selectedBrands.push(key);
        }
      });
      this.selectedBrands=selectedBrands;
      this.getAllProduct();
    }

  ngOnInit(): void {
    this.products = [];
    this.route.params.subscribe(params => {
      this.category = params['category'] || '';
      this.subcategory = params['subcategory'] || '';
      this.subsubcategory = params['subsubcategory'] || '';
      this.getAllProduct();
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


  public getAllProduct() {
    this.products = [];
    this.productService.getProducts(this.selectedBrands,this.selectedCategory,this.selectedGenders,this.selectedColorString,this.selectedSizeString)
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
    this.getAllProduct();
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
    this.getAllProduct();
  }
  pageForward() {
    if (this.pageNumber>= this.pageCount) {
      return;
    }
    this.pageNumber = this.pageNumber + 1;
    this.getAllProduct();
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
    this.getAllProduct();
  }
}
