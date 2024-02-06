import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import {faUserCircle,faShoppingCart,faSearch,faClose, faTimes,faGear,faInfo,faDoorOpen, faL} from "@fortawesome/free-solid-svg-icons";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('out', style({
        transform: 'translateY(100%)',
        opacity: 0
      })),
      transition('in => out', animate('200ms ease-out')),
      transition('out => in', animate('200ms ease-in'))
    ])
  ]
})
export class HeaderComponent implements OnInit{

  logoUrl: string = "movement.jpg";

  UserIcon = faUserCircle;
  CartIcon = faShoppingCart;
  SearchIcon= faSearch;
  CloseIcon=faClose;
  GearIcon=faGear;
  InfoIcon=faInfo;
  LogoutIcon=faDoorOpen;


  products: Product[] = [];
  pageNumber: number = 0;
  searchKey: String = "";

  public getAllProduct(searchKey: String = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey)
      .pipe(
        map((x: Product[], i) => x.map((product: Product) => this.imageProcessingService.createImages(product)))
      )
      .subscribe(
        (data: Product[]) => {
          data.forEach(p => this.products.push(p));
          console.log('Products:', this.products);
        },
        (error) => {
          console.error('Error fetching products:', error);
        }
      );
  }


  constructor(private userAuthService : UserAuthService,private router: Router,private productService: ProductService,
    private imageProcessingService: ImageProcessingService,private elementRef: ElementRef){}
  ngOnInit(): void {
  }
  public isLoggedIn():string | null{
    return this.userAuthService.isLoggedIn();
  }
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin(){
    return this.userAuthService.isAdmin();
  }

  public isUser(){
    return this.userAuthService.isUser();
  }


  showDropdown: boolean = false;
  userIconClicked:boolean = false;
  searchIcon = faSearch;
  closeIcon = faTimes;

  
  public showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails/', { productId: productId }]);
  }

  public searchByKeyword(searchKeyword: String) {
    if(searchKeyword!=""){
    //console.log(searchKeyword);
    this.searchKey = searchKeyword;
    this.pageNumber = 0;
    this.products = [];
    this.getAllProduct(this.searchKey);
    }
    else{
      this.products=[];
    }
  }
  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
    this.userIconClicked = !this.userIconClicked;
    if (!this.showDropdown) {
      this.userIconClicked = false;
    }
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if(this.showDropdown){
      console.log("clicked out boss");
      if (!this.elementRef.nativeElement.contains(event.target)) {
        this.showDropdown = false;
        this.userIconClicked = false;
      }
      this.toggleDropdown(event);
    }
  }
}
