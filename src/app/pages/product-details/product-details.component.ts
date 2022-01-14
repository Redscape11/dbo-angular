import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product';
import { ProductsService } from 'src/app/core/services/products.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productList: Product[] = [];
  product: Product = {};
  form!: FormGroup;

  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productsService.getProductsFromJson().subscribe((res: Product[]) => {
      this.productList = res.sort((a: Product, b: Product) => a.id! - b.id!);
      this.getProduct(1);
    }, (err: Error) => {
      alert('failed loading json data' + err.message);
    });
  }

  getProduct(id: number): void {
    const p = this.productList.find(i => i.id === id);
    if (p !== undefined) {
      this.product = p;
    }
  }

  onChangeSelect(e: Event) {
    this.getProduct(parseInt((<HTMLSelectElement>e.target).value));
  }

  onSubmitDiscount() {
    //console.log(JSON.stringify(this.form.getRawValue()));
  }

}
