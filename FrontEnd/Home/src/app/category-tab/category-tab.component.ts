import { Component } from '@angular/core';

@Component({
  selector: 'app-category-tab',
  templateUrl: './category-tab.component.html',
  styleUrls: ['./category-tab.component.css']
})
export class CategoryTabComponent {
  categories = [
    {
      name: 'Men', showSubcategories: false, subcategories: [
        {
          name: 'Featured', showSubcategories: false, route: '/Men/Featured',
          subcategories: [
            { name: 'New Releases', route: '/men/featured/NewReleases' },
          ]
        },
        {
          name: 'Shoes', showSubcategories: false, route: '/Men/Shoes', subcategories: [
            { name: 'All Shoes', route: '/men/Shoes/AllShoes' },
          ]
        },
      ]
    },
    {
      name: 'Women', showSubcategories: false, subcategories: [
        {
          name: 'Featured', showSubcategories: false, route: '/Women/Featured',
          subcategories: [
            { name: 'New Releases', route: '/women/featured/NewReleases' },

          ]
        },
        {
          name: 'Shoes', showSubcategories: false, route: '/Women/Shoes',
          subcategories: [
            { name: 'All Shoes', route: '/women/Shoes/AllShoes' },

          ]
        },
      ]
    },
  ];

  toggleSubcategories(category: any) {
    category.showSubcategories = !category.showSubcategories;
  }
}
