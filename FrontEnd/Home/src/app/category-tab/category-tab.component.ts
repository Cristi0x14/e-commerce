import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faL } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.css']
})
export class CategoryTabComponent {
showSubcategories: Boolean = false;
subcategory: any[] = [];
subcategoryTitle: String = "";

  constructor (private dialog: MatDialog){
    
  }
  categories = [
    {
      name: 'Men', showSubcategories: false, subcategories: [
        {
          name: 'Clothing', showSubcategories: false, route: 'allsports/Men/Featured',
          subcategories: [
            { name: 'All', route: 'allsports/' },
            { name: 'New Releases', route: 'allsports/' },
          ]
        },
        {
          name: 'Shoes', showSubcategories: false, route: '', subcategories: [
            { name: 'All', route: 'shoes' },
          ]
        },
        {
          name: 'Accessories', showSubcategories: false, route: '', subcategories: [
            { name: 'All', route: 'allsports/' },
            { name: 'Football', route: 'allsports/' },
            { name: 'Tennis', route: 'allsports/' },
            { name: 'Running', route: 'allsports/' },
            { name: 'Basketball', route: 'allsports/' },
            { name: 'Football', route: 'allsports/' },
          ]
        },
        {
          name: 'Sports', showSubcategories: false, route: '', subcategories: [
            { name: 'All', route: 'allsports/' },
            { name: 'Football', route: 'allsports/' },
            { name: 'Tennis', route: 'allsports/' },
            { name: 'Running', route: 'allsports/' },
            { name: 'Basketball', route: 'allsports/' },
            { name: 'Football', route: 'allsports/' },
          ]
        },
        {
          name: 'Sale', showSubcategories: false, route: '', subcategories: [
            { name: 'Accessories', route: 'allsports/' },
          ]
        },
      ]
    },
    {
      name: 'Kids', showSubcategories: false, subcategories: [
        {
          name: 'Clothing', showSubcategories: false, route: 'allsports/Women/Featured',
          subcategories: [
            { name: 'New Releases', route: 'allsports/kids/featured/NewReleases' },

          ]
        },
        {
          name: 'Shoes', showSubcategories: false, route: '/',
          subcategories: [
            { name: 'All Shoes', route: 'allsports/kids/AllShoes' },

          ]
        },
      ]
    },
    {
      name: 'Women', showSubcategories: false, subcategories: [
        {
          name: 'Clothing', showSubcategories: false, route: 'allsports/Women/Featured',
          subcategories: [
            { name: 'New Releases', route: 'allsports/women/featured/NewReleases' },

          ]
        },
        {
          name: 'Shoes', showSubcategories: false, route: '/',
          subcategories: [
            { name: 'All Shoes', route: 'allsports/w/AllShoes' },

          ]
        },
      ]
    },
    {
      name: 'Sales', showSubcategories: false, subcategories: [
        {
          name: 'Men', showSubcategories: false, route: 'allsports/Women/Featured',
          subcategories: [
            { name: 'Shoes', route: 'allsports/' },
            { name: 'Clothing', route: 'allsports/' },
            { name: 'Accessories', route: 'allsports/' },
          ]
        },
        {
          name: 'Women', showSubcategories: false, route: '/',
          subcategories: [
            { name: 'Shoes', route: 'allsports/' },
            { name: 'Clothing', route: 'allsports/' },
            { name: 'Accessories', route: 'allsports/' },
          ]
        },
        {
          name: 'Kids', showSubcategories: false, route: '/',
          subcategories: [
            { name: 'Shoes', route: 'allsports/' },
            { name: 'Clothing', route: 'allsports/' },
            { name: 'Accessories', route: 'allsports/' },
          ]
        },
      ]
    },
    {
      name: 'Brands', showSubcategories: false, subcategories: [
        {
          name: 'Nike', showSubcategories: false, route: 'allsports/Nike',
        },        {
          name: 'Adidas', showSubcategories: false, route: 'allsports/Adidas',
        },        {
          name: 'Puma', showSubcategories: false, route: 'allsports/Puma',
        },        {
          name: 'Jordan', showSubcategories: false, route: 'allsports/Jordan',
        },        {
          name: 'Reebok', showSubcategories: false, route: 'allsports/Reebok',
        },        {
          name: 'The North Face', showSubcategories: false, route: 'allsports/The North Face',
        },        {
          name: 'Champion', showSubcategories: false, route: 'allsports/Champion',
        },        {
          name: 'Vans', showSubcategories: false, route: 'allsports/Vans',
        },        {
          name: 'Jack&Jones', showSubcategories: false, route: 'allsports/Jack&Jones',
        },        {
          name: 'Under Armour', showSubcategories: false, route: 'allsports/Under Armour',
        },
      ]
    },
    {
      name: 'Sports', showSubcategories: false, subcategories: [
        {
          name: 'Skiing', showSubcategories: false, route: 'allsports/Nike',
        },        {
          name: 'Football', showSubcategories: false, route: 'allsports/Adidas',
        },        {
          name: 'Tennis', showSubcategories: false, route: 'allsports/Adidas',
        },        {
          name: 'Bascketball', showSubcategories: false, route: 'allsports/Adidas',
        },        {
          name: 'Beach', showSubcategories: false, route: 'allsports/Adidas',
        },        {
          name: 'Swiming', showSubcategories: false, route: 'allsports/Adidas',
        },        {
          name: 'Snowboard', showSubcategories: false, route: 'allsports/Adidas',
        },        {
          name: 'Cycling', showSubcategories: false, route: 'allsports/Adidas',
        }
      ]
    },
  ]; 

  toggleSubcategories(category: any) {
    console.log("show = " + category.showSubcategories);
    category.showSubcategories = !category.showSubcategories;
  }
  closeCategoryDialog() {
    const dialogRef = this.dialog.closeAll();
  }

  renderSubcategories(subcategories: any[],Title: String) {
    console.log('Render subcategories:', subcategories);
    this.subcategory=subcategories;
    this.subcategoryTitle=Title;
    this.showSubcategories=!this.showSubcategories;
  }

  handleClick(subcategories: any[]) {
    console.log('Clicked:', subcategories);
    // Implement event handling for subcategory click
  }
}


