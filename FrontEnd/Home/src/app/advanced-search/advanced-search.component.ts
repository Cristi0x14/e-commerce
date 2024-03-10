import { Component, HostListener } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Router, ActivatedRoute, ActivatedRouteSnapshot, ParamMap } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Form, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.css']
})
export class AdvancedSearchComponent {

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private imageProcessingService: ImageProcessingService,
    private router: Router,
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
      shoes: false,
      clothes: false,
      gym: false,
    });

    this.brandForm = this.formBuilder.group({
      nike: false,
      adidas: false,
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

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const gender = params.get('gender') || '';
      const category = params.get('category') || '';
      this.handleQueryParams(gender, category);
    });
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.updateBreakpoint(event.target.innerWidth);
  }

  handleQueryParams(gender: string, category: string) {
    this.selectedGenders = [];
    this.selectedCategory = [];
    
    if (gender) {
      this.selectedGenders.push(gender);
    }
    if (category) {
      this.selectedCategory.push(category);
    }

    this.updateBreakpoint(window.innerWidth);
    this.getAllProduct();
    this.checkGenderCategoryForms(gender, category);
  }

  products: Product[] = [];
  displayedProducts: Product[] = [];
  pageNumber: number = 0;
  showLoadButton = false;
  subcategory: string = "";
  subsubcategory: string = "";
  breakpoint: any;
  pageCount: number = 0;
  showSelectList: boolean = true;

  colors: string[] = [
    'Black', 'Blue', 'Brown', 'Green', 'Grey',
    'Multi-Colour', 'Orange', 'Pink', 'Purple',
    'Red', 'White', 'Yellow'
  ];

  selectedColors: boolean[] = [];

  toggleColorSelection(index: number) {
    this.selectedColorString = [];
    this.selectedColors[index] = !this.selectedColors[index];
    for (let i = 0; i < this.colors.length; i++) {
      if (this.selectedColors[i]) {
        this.selectedColorString.push(this.colors[i]);
      }
    }
    console.log(this.selectedColorString);
  }

  shoeSizes: number[] = [
    33.5, 34, 35, 35.5, 36, 36.5, 37.5, 38, 38.5, 39,
    40, 40.5, 41, 42, 42.5, 43, 44, 44.5, 45, 45.5,
    46, 47
  ];

  selectedSize: boolean[] = [];

  toggleSizeSelection(index: number) {
    this.selectedSizeString = [];
    this.selectedSize[index] = !this.selectedSize[index];
    if (this.selectedSize[index]) {
      for (let i = 0; i < this.shoeSizes.length; i++) {
        if (this.selectedSize[i]) {
          this.selectedSizeString.push(this.shoeSizes[index].toString());
        }
      }
    }
    console.log(this.selectedSizeString);
  }


  genderForm: FormGroup;
  categoryForm: FormGroup;
  brandForm: FormGroup;

  selectedGenders: string[] = [];

  selectedBrands: string[] = [];

  selectedCategory: string[] = [];

  selectedSizeString: string[] = [];
  selectedColorString: string[] = [];


  GenderFilterChange(value: any) {
    const selectedGenders: string[] = [];
    Object.keys(value).forEach(key => {
      if (value[key]) {
        selectedGenders.push(key);
      }
    });
    this.selectedGenders = selectedGenders;
  }

  CategoryFilterChange(value: any) {
    const selectedCategory: string[] = [];
    Object.keys(value).forEach(key => {
      if (value[key]) {
        selectedCategory.push(key);
      }
    });
    this.selectedCategory = selectedCategory;
  }

  BrandFilterChange(value: any) {
    const selectedBrands: string[] = [];
    Object.keys(value).forEach(key => {
      if (value[key]) {
        selectedBrands.push(key);
      }
    });
    this.selectedBrands = selectedBrands;
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

  totalCount: number = 0;

  public getAllProduct() {
    this.products = [];
    this.productService.getProducts(this.selectedBrands, this.selectedCategory, this.selectedGenders, this.selectedColorString, this.selectedSizeString, this.pageNumber, 12)
      .pipe(
        map((x: Product[]) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
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
    this.productService.getProductsTotalCount(this.selectedBrands, this.selectedCategory, this.selectedGenders, this.selectedColorString, this.selectedSizeString, this.pageNumber, 12)
      .subscribe(
        (data: number) => {
          this.totalCount = data;
          console.log("Total Products", this.totalCount);
        }
      );
  }

  public showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails/', { productId: productId }]);
  }


  getDiscount(productActualPrice: number, productDiscountedPrice: number) {
    return (((productActualPrice - productDiscountedPrice) / productActualPrice) * 100).toFixed(0);
  }

  pageBack() {
    if (this.pageNumber == 0) {
      return;
    }
    this.pageNumber = this.pageNumber - 1;
    this.getAllProduct();
  }
  pageForward() {
    if (this.products.length < 12) {
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
  toggleSelectList() {
    this.showSelectList = !this.showSelectList;
  }

  onSelectionChange(event: any): void {
    this.pageNumber = + event.target.value;
  }


  private checkGenderCategoryForms(gender: string, category: string): void {
    this.genderForm.reset();
    this.categoryForm.reset();
    switch (gender) {
      case 'men':
        this.genderForm.patchValue({ men: true });
        break;
      case 'women':
        this.genderForm.patchValue({ women: true });
        break;
      case 'unisex':
        this.genderForm.patchValue({ unisex: true });
        break;
      case 'boys':
        this.genderForm.patchValue({ boys: true });
        break;
      case 'girls':
        this.genderForm.patchValue({ girls: true });
        break;
      default:
        break;
    }
    switch (category) {
      case 'shoes':
        this.categoryForm.patchValue({ shoes: true });
        break;
      case 'clothes':
        this.categoryForm.patchValue({ clothes: true });
        break;
      case 'gym':
        this.categoryForm.patchValue({ gym: true });
        break;
      default:
        break;
    }
  }
}