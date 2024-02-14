import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { UserAuthService } from '../_services/user-auth.service';
import { Router } from '@angular/router';
import { faUserCircle, faShoppingCart, faSearch, faClose, faTimes, faGear, faInfo, faDoorOpen, faBox, faHeart, faStore, faRoad, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ProductService } from '../_services/product.service';
import { Product } from 'src/_model/product.model';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { SearchPopupComponent } from '../search-popup/search-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CategoryTabComponent } from '../category-tab/category-tab.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
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
export class HeaderComponent implements OnInit {

  logoUrl: string = "movement.jpg";

  UserIcon = faUserCircle;
  CartIcon = faShoppingCart;
  SearchIcon = faSearch;
  CloseIcon = faClose;
  GearIcon = faGear;
  InfoIcon = faInfo;
  LogoutIcon = faDoorOpen;
  BoxIcon = faBox;
  StoreIcon = faStore;
  showDropdown: boolean = false;
  userIconClicked: boolean = false;
  searchIcon = faSearch;
  closeIcon = faTimes;
  heartIcon = faHeart;
  roadIcon= faRoad;
  locationIcon= faLocationDot;

  products: Product[] = [];
  pageNumber: number = 0;
  searchKey: String = "";

  showFiller = false;

  private searchSubject = new Subject<string>();

  constructor(private userAuthService: UserAuthService, private router: Router, private productService: ProductService,
    private imageProcessingService: ImageProcessingService, private elementRef: ElementRef, private dialog: MatDialog) {
    this.searchSubject.pipe(
      debounceTime(800)
    ).subscribe(searchKeyword => {
      this.openSearchDialog(searchKeyword);
    });
  }
  ngOnInit(): void {
  }

  public getAllProduct(searchKey: String = "") {
    this.productService.getAllProducts(this.pageNumber, searchKey,"","")
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

  public isLoggedIn(): string | null {
    return this.userAuthService.isLoggedIn();
  }
  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  public showProductDetails(productId: number) {
    this.router.navigate(['/productViewDetails/', { productId: productId }]);
  }
  toggleDropdown(event: Event) {
    if (!this.isLoggedIn()) {
      this.router.navigate(['login']);
      this.showDropdown = false;
    }
    else {
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
      this.userIconClicked = !this.userIconClicked;
      if (!this.showDropdown) {
        this.userIconClicked = false;
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickOut(event: any) {
    if (this.showDropdown) {
      this.toggleDropdown(event);
    }
  }

  private openSearchDialog(searchKeyword: string) {
    if (searchKeyword !== "" && !this.dialog.openDialogs.length) {
      const dialogRef = this.dialog.open(SearchPopupComponent, {
        width: '100%', // Cover the entire width
        height: '80vh', // 80% of the viewport height
        position: { bottom: '0' }, // Start from the bottom
        panelClass: 'search-popup-dialog',
        autoFocus: false,
        data: { searchKeyword }
      });
    }
  }

  public searchByKeyword(searchKeyword: String) {
    if (searchKeyword != "" && !this.dialog.openDialogs.length) {
      this.searchKey = searchKeyword;
      this.pageNumber = 0;
      this.products = [];
      this.getAllProduct(this.searchKey);
      this.searchSubject.next(searchKeyword.trim());
    }
    else {
      this.products = [];
    }
  }

  openCategoryDialog() {
    const dialogRef = this.dialog.open(CategoryTabComponent, {
      // Set the width of the dialog
      position: { left: '0' }, // Position the dialog to pop up from the right side
      hasBackdrop: true, // Enable the backdrop
      backdropClass: 'custom-backdrop' // Custom class for the backdrop without gray scale
    });
  }
}

