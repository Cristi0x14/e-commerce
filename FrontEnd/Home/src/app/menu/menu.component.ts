import { Component } from '@angular/core';
import { faL } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private router: Router) {

  }
  open: boolean = false;
  categories = [
    {
      name: 'News',
      subcategories: [
        { category: 'Clothing', subcategories: ['All clothes', 'Hoodies'], path: 'clothes' },
        { category: 'Shoes', subcategories: ['New shoes', 'Sales', 'Boots'], path: 'shoes' }
      ],
      path: 'news'
    },
    {
      name: 'Men',
      subcategories: [
        {
          category: 'Clothing',
          subcategories: [
            'All Clothing',
            'Tops and T-Shirts',
            'Hoodies and Sweatshirts',
            'Shorts',
            'Trousers and Tights',
            'Tracksuits',
            'Jackets',
            'Kits and Jerseys'],
          path: 'clothes'
        },
        { category: 'Shoes', subcategories: ['Shoes', 'Sales', 'Boots', 'Running'], path: 'shoes' },
        { category: 'Accessories and Equipment', subcategories: ['All Accessories and Equipment', 'Gym', 'Sales'], path: 'Accessories' },
      ],
      expanded: false,
      path: 'men'
    },
    {
      name: 'Women',
      subcategories: [
        { category: 'Clothing', subcategories: ['All clothes', 'Hoodies'], path: 'clothes' },
        { category: 'Shoes', subcategories: ['New shoes', 'Sales', 'Boots'], path: 'shoes' }
      ],
      expanded: false,
      path: 'women'
    },
    {
      name: 'Boys',
      subcategories: [
        { category: 'Clothing', subcategories: ['All clothes', 'Hoodies'], path: 'clothes' },
        { category: 'Shoes', subcategories: ['New shoes', 'Sales', 'Boots'], path: 'shoes' }
      ],
      expanded: false,
      path: 'boys'
    },
    {
      name: 'Girls',
      subcategories: [
        { category: 'Clothing', subcategories: ['All clothes', 'Hoodies'], path: 'clothes' },
        { category: 'Shoes', subcategories: ['New shoes', 'Sales', 'Boots'], path: 'shoes' }
      ],
      expanded: false,
      path: 'girls'
    }
  ];

  isStringSubcategory(subcategory: any): boolean {
    return typeof subcategory === 'string';
  }
  goTo(param1: string = '', param2: string = ''): void {
    this.router.navigate(['/as'], { queryParams: { gender: param1, category: param2 } });
  }
  goto(path: string) {
    this.router.navigate([path])
  }
}