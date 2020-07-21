import { cardErrors } from './../../src/app/static-data/card-errors';
import { AppPage } from './app.po';

const VALID_CARD_MESSAGE: string = cardErrors[0];
const INVALID_NUMBER: string = cardErrors[2];


describe('Credit Card App', () => {
  let page: AppPage;
  beforeAll(async () => {
    page = new AppPage();
    await page.navigateTo();
  });

  it('should show App header', async () => {
    expect(await page.getHeader()).toEqual('Credit Card Validator');
  });

  it('should Check button be disabled', async () => {
    expect(await page.isCheckButtonDisabled()).toBe(true);
  });

  it('should Notification be hidden', async () => {
    expect(await page.getNotification().isPresent()).toBe(false);
  });

  describe('Check Valid Credit Card', () => {
    beforeAll(async () => {
      await page.navigateTo();
      await page.selectCreditCard('Visa');
      await page.enterCardNumber('4111 1111 1111 1111');
      await page.getCheckButton().click();
    });

    it('should Notification be shown', async () => {
      expect(await page.getNotification().isPresent()).toBe(true);
    });

    it('should Notification message be Valid', async () => {
      expect(await page.getNotificationText()).toBe(VALID_CARD_MESSAGE);
    });
  });

  describe('Check Invalid Card number', () => {
    beforeAll(async () => {
      await page.navigateTo();
      await page.selectCreditCard('Visa');
      await page.enterCardNumber('4111 1111 1111 1114');
      await page.getCheckButton().click();
    });

    it('should Notification be shown', async () => {
      expect(await page.getNotification().isPresent()).toBe(true);
    });

    it('should Notification message be Valid', async () => {
      expect(await page.getNotificationText()).toBe(INVALID_NUMBER);
    });
  });
});
