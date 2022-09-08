import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {
    this.alertify.message('Merhaba', {
      messageType: MessageType.Success,
      delay: 3,
      position: Position.TopCenter,
      dismissOthers: false,
    });
  }
}
