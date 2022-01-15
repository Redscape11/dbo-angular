import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/core/interfaces/product';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productList: Product[] = [];
  product: Product = {};
  displayError1: boolean = false;
  displayError2: boolean = false;
  error: string = "La quantité doit être un nombre supérieure à 0";


  constructor(public productsService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(tig_id: number = 1): void {
    this.productsService.getProductsFromJson().subscribe((res: Product[]) => {
      this.productList = res.sort((a: Product, b: Product) => a.tig_id! - b.tig_id!);
      this.getProduct(tig_id);
    }, (err: any) => {
      alert('failed loading json data' + err.message);
    });
  }

  getProduct(tig_id: number): void {
    const p = this.productList.find(i => i.tig_id === tig_id);
    if (p !== undefined) {
      this.product = p;
    }
  }

  onChangeSelect(e: any) {
    this.getProduct(parseInt(e.target.value));
  }


  onClickModifyDiscount() {
    //console.log(JSON.stringify(this.form.getRawValue()));
    const value = (<HTMLInputElement>document.getElementById('discount')).value;
    console.log("modify clicked " + value);
  }

  onClickIncrementQuantityInStock() {
    const quantityInStock = parseInt((<HTMLInputElement>document.getElementById('quantityInStockIncrement')).value);
    if (isNaN(quantityInStock) || quantityInStock === 0) {
      this.displayError1 = true;
    } else {
      this.productsService.incrementQuantityInStock(this.product.tig_id!, quantityInStock).subscribe(
        (product: Product) => {
          this.product = product;
          this.displayError1 = false;
          for (let i = 0; i < this.productList.length; i++) {
            if (this.productList[i].tig_id === this.product.tig_id) {
              this.productList[i].quantityInStock = product.quantityInStock;
              break;
            }
          }
        }
      );
    }
  }

  onClickDecrementQuantityInStock() {
    const quantityInStock = parseInt((<HTMLInputElement>document.getElementById('quantityInStockDecrement')).value);

    if (isNaN(quantityInStock) || quantityInStock === 0) {
      this.displayError2 = true;
    } else {
      this.productsService.decrementQuantityInStock(this.product.tig_id!, quantityInStock).subscribe(
        (product: Product) => {
          this.product = product;
          this.displayError2 = false;
          for (let i = 0; i < this.productList.length; i++) {
            if (this.productList[i].tig_id === this.product.tig_id) {
              this.productList[i].quantityInStock = product.quantityInStock;
              break;
            }
          }
        }
      );
    }
  }

}
