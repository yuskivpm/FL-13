import { TestBed } from '@angular/core/testing';

import { CreditCardService } from './credit-card.service';
import { cardErrors } from './../static-data/card-errors';

describe('CreditCardService', () => {
  let service: CreditCardService;
  const CARD_NAME_VISA: string = 'visa';
  const CARD_NAME_ELECTRON = 'VisaElectron';
  const INCORRECT_CARD_NAME: string = CARD_NAME_VISA + CARD_NAME_VISA;
  const INCORRECT_CARD_NUMBER_FORMAT = '1111';
  const INCORRECT_CARD_NUMBER = '42424242424242421';
  const INCORRECT_CARD_PREFIX = '1242424242424242';
  const SPAM_NUMBER = '5490997771092064';
  const SPAM_CARD_TYPE = 'MasterCard';
  const CORRECT_CARD_NUMBER_VISA = '4026222222227';

  const [
    VALID_CARD,
    UNKNOWN_TYPE,
    INVALID_NUMBER,
    INVALID_NUMBER_FORMAT,
    INVALID_LENGTH,
    SCAM_ATTEMPT,
  ] = cardErrors

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreditCardService);
  });

  it('should create CreditCardService', async () => {
    expect(service).toBeTruthy();
  });

  it('should return unknown card type', () => {
    expect(service.testCreditCard(INCORRECT_CARD_NUMBER_FORMAT, INCORRECT_CARD_NAME)).toEqual({
      isValid: false,
      message: UNKNOWN_TYPE
    });
  });

  it('should return invalid card number format', () => {
    expect(service.testCreditCard(INCORRECT_CARD_NUMBER_FORMAT, CARD_NAME_VISA)).toEqual({
      isValid: false,
      message: INVALID_NUMBER_FORMAT
    });
  });

  it('should return invalid card number', () => {
    expect(service.testCreditCard(INCORRECT_CARD_NUMBER, CARD_NAME_VISA)).toEqual({
      isValid: false,
      message: INVALID_NUMBER
    });
  });

  it('should return invalid card number (prefix)', () => {
    expect(service.testCreditCard(INCORRECT_CARD_PREFIX, CARD_NAME_VISA)).toEqual({
      isValid: false,
      message: INVALID_NUMBER
    });
  });

  it('should return scam attempt', () => {
    const spy = spyOn(service, 'reportScamAttempt');
    expect(service.testCreditCard(SPAM_NUMBER, SPAM_CARD_TYPE)).toEqual({
      isValid: false,
      message: SCAM_ATTEMPT
    });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(SPAM_NUMBER);
  });

  it('should return scam attempt', () => {
    // to provide 100% coverage)))
    expect(service.testCreditCard(SPAM_NUMBER, SPAM_CARD_TYPE)).toEqual({
      isValid: false,
      message: SCAM_ATTEMPT
    });
  });

  it('should return invalid card number length', () => {
    expect(service.testCreditCard(CORRECT_CARD_NUMBER_VISA, CARD_NAME_ELECTRON)).toEqual({
      isValid: false,
      message: INVALID_LENGTH
    });
  });

  it('should return valid card number', () => {
    expect(service.testCreditCard(CORRECT_CARD_NUMBER_VISA, CARD_NAME_VISA)).toEqual({
      isValid: true,
      message: VALID_CARD
    });
  });

});
