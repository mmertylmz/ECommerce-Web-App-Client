import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  @Output() createdProduct: EventEmitter<Create_Product> = new EventEmitter();

  ngOnInit(): void {}

  create(
    name: HTMLInputElement,
    stock: HTMLInputElement,
    price: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_product: Create_Product = new Create_Product();
    create_product.name = name.value;
    create_product.stock = parseInt(stock.value);
    create_product.price = parseFloat(price.value);

    if (!name.value) {
      this.alertify.message('Lütfen ürün adını giriniz!', {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight,
      });
      return;
    }

    if (parseInt(stock.value) < 0) {
      this.alertify.message('Lütfen stok bilgisini doğru giriniz!', {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight,
      });
      return;
    }

    if (parseInt(price.value) < 0) {
      this.alertify.message('Lütfen fiyat bilgisini doğru giriniz!', {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight,
      });
      return;
    }

    this.productService.create(
      create_product,
      () => {
        this.alertify.message('Ürün Başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
        this.createdProduct.emit(create_product);
        this.hideSpinner(SpinnerType.BallAtom);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }
}
