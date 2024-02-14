import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { faK } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css'],
})
export class SubCategoryComponent {
  subcategory: any[] = [];
  showSubcategories: boolean = false;
  subcategoryTitle: String = "";
  showSideBar: boolean = true;
  constructor(private router: Router,private dialog: MatDialog) { }

  @Input()
  subcategories: any[] = []; // Add @Input() decorator here
  @Input()
  Title: String = "";
  toggleSubcategories(category: any) {
    console.log("show = " + category.showSubcategories);
    category.showSubcategories = !category.showSubcategories;
  }
  closeCategoryDialog() {
    const dialogRef = this.dialog.closeAll();
  }

  renderSubcategories(subcategories: any[],Title: String,route:string) {
    console.log('Render subcategories:', subcategories);
    if(subcategories == undefined){
      this.router.navigate([route]);
      this.closeCategoryDialog();
    }
    else{
      this.subcategory=subcategories;
      this.subcategoryTitle=Title;
      this.showSubcategories=!this.showSubcategories;
    }
  }

  handleClick(subcategories: any[]) {
    console.log('Clicked:', subcategories);
    // Implement event handling for subcategory click
  }
  
}
