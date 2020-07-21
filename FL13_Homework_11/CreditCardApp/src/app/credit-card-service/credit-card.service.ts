import { cardErrors } from './../static-data/card-errors';
import { cardList } from '../static-data/card-list';
import { Injectable } from '@angular/core';
import { CreditCard } from './credit-card.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private cards: CreditCard[];
  private readonly SPAM_NUMBER: string = '5490997771092064';
  private readonly VALID_CARD: string;
  private readonly UNKNOWN_TYPE: string;
  private readonly INVALID_NUMBER: string;
  private readonly INVALID_NUMBER_FORMAT: string;
  private readonly INVALID_LENGTH: string;
  private readonly SCAM_ATTEMPT: string;

  constructor() {
    this.cards = cardList;
    [
      this.VALID_CARD,
      this.UNKNOWN_TYPE,
      this.INVALID_NUMBER,
      this.INVALID_NUMBER_FORMAT,
      this.INVALID_LENGTH,
      this.SCAM_ATTEMPT
    ] = cardErrors;
  }

  public testCreditCard(cardNumber: string, cardName: string) {
    const result = {
      isValid: false,
      message: null
    };

    const cardTypeIndex: number = this.getCardTypeIndex(cardName);
    if (cardTypeIndex === -1) {
      result.message = this.UNKNOWN_TYPE;
      return result;
    }

    if (!this.isCardNumberFormatValid(cardNumber)) {
      result.message = this.INVALID_NUMBER_FORMAT;
      return result;
    }

    if (!this.isModuleTenDigitsValid(cardNumber) || !this.isCardNumberPrefixValid(cardNumber, cardTypeIndex)) {
      result.message = this.INVALID_NUMBER;
      return result;
    }

    if (this.isScamNumber(cardNumber)) {
      this.reportScamAttempt(cardNumber);
      result.message = this.SCAM_ATTEMPT;
      return result;
    }

    if (!this.isCardNumberLengthValid(cardNumber, cardTypeIndex)) {
      result.message = this.INVALID_LENGTH;
      return result;
    }

    result.isValid = true;
    result.message = this.VALID_CARD;

    return result;
  }

  private isCardNumberLengthValid(cardNumber: string, cardTypeIndex: number): boolean {
    const cardNo: string = this.cutSpaces(cardNumber);
    const cardLengthList: number[] = this.cards[cardTypeIndex].length;

    for (const cardLength of cardLengthList) {
      if (cardNo.length === cardLength) {
        return true;
      }
    }

    return false;
  }

  private isCardNumberPrefixValid(cardNumber: string, cardTypeIndex: number): boolean {
    const cardNo: string = this.cutSpaces(cardNumber);
    const prefixList: number[] = this.cards[cardTypeIndex].prefixes;

    for (const prefix of prefixList) {
      const exp: RegExp = new RegExp('^' + prefix);
      if (exp.test(cardNo)) {
        return true;
      }
    }

    return false;
  }

  private isCardNumberFormatValid(cardNumber: string): boolean {
    const cardNo: string = this.cutSpaces(cardNumber);
    const cardExp = /^[0-9]{13,19}$/;
    return cardExp.exec(cardNo) ? true : false;
  }

  private isScamNumber(cardNumber: string): boolean {
    const cardNo: string = this.cutSpaces(cardNumber);
    return cardNo === this.SPAM_NUMBER;
  }

  private getCardTypeIndex(cardName: string): number {
    return this.cards.findIndex((card: CreditCard): boolean =>
      cardName.toLocaleLowerCase() === card.name.toLocaleLowerCase());
  }

  private isModuleTenDigitsValid(cardNumber: string) {
    const cardNo: string = this.cutSpaces(cardNumber);
    let checksum = 0;
    let j = 1;

    let calc: number;
    for (let i = cardNo.length - 1; i >= 0; i--) {

      calc = Number(cardNo.charAt(i)) * j;

      if (calc > 9) {
        checksum = checksum + 1;
        calc = calc - 10;
      }

      checksum = checksum + calc;

      if (j === 1) {
        j = 2;
      } else {
        j = 1;
      }
    }

    if (checksum % 10 !== 0) {

      return false;
    }

    return true;
  }

  private cutSpaces(cardNumber: string): string {
    return cardNumber.replace(/\s/g, '');
  }

  public reportScamAttempt(cardNumber: string): void {
    // send report to the Scam Bureau Department
    // some logic from third service could be performed there
  }
}
