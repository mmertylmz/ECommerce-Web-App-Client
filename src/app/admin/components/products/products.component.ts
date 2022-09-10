import { Component, OnInit } from '@angular/core';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { Product } from 'src/app/contracts/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);
    this.httpClientService
      .get<Product[]>({
        controller: 'products',
      })
      .subscribe((data) => {
        data.forEach((element) => {
          console.log(
            `Name: ${element.name}\nStock:${element.stock}\nPrice: ${element.price}`
          );
        });
      });

    // this.httpClientService
    //   .post(
    //     {
    //       controller: 'products',
    //     },
    //     {
    //       name: 'Kalem',
    //       stock: 100,
    //       price: 15,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .put(
    //     { controller: 'products' },
    //     {
    //       id: '093d08ad-b85f-4eb2-88ba-16a30aa8bb0f',
    //       name: 'Renkli Kağıt',
    //       stock: 1500,
    //       price: 5.5,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .delete(
    //     {
    //       controller: 'products',
    //     },
    //     'c047b8b8-4a1b-4187-91f9-cde2065dd51f'
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .get({
    //     fullEndPoint: 'https://jsonplaceholder.typicode.com/posts',
    //   })
    //   .subscribe((data) => console.log(data));
  }
}
