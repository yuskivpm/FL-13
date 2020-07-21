import { CreditCard } from './credit-card-service/credit-card.model';
import { CreditCardService } from './credit-card-service/credit-card.service';
import { Component, OnInit } from '@angular/core';
import { cardList } from './static-data/card-list';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cardList: CreditCard[];
  public showNitification = false;
  public cardType: string;
  public cardNumber: string;
  public message = '';

  constructor(private creditCardService: CreditCardService) {}

  public async ngOnInit(): Promise<void> {
    this.cardList = [...cardList, {
      name: 'Other',
      length: [16],
      prefixes: [99],
      checkdigit: true
    }];
  }

  public checkCreditCard(): void {
    const result: any = this.creditCardService.testCreditCard(this.cardNumber, this.cardType);
    this.showMessage(result.message);
  }

  private showMessage(message: string): void {
    this.showNitification = true;
    this.message = message;
  }
}
