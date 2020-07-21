import { browser, by, element, Locator, ElementFinder } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export class AppPage {
  private readonly headerLocator: Locator = by.tagName('h1');
  private readonly buttonLocator: Locator = by.tagName('button');
  private readonly notificationLocator: Locator = by.className('notification');
  private readonly cardTypeInputLocator: Locator = by.css('select#type');
  private readonly cardNumberInputLocator: Locator = by.css('input#number');

  public async navigateTo(): Promise<void> {
    return browser.get(browser.baseUrl);
  }

  public async getHeader(): Promise<string> {
    return element(this.headerLocator).getText();
  }

  public getCheckButton(): ElementFinder {
    return  element(this.buttonLocator);
  }

  public async isCheckButtonDisabled(): Promise<boolean> {
    return await this.getCheckButton().getAttribute('disabled') ? true : false;
  }

  public getNotification(): ElementFinder {
    return element(this.notificationLocator);
  }

  public async getNotificationText(): Promise<string> {
    return this.getNotification().getText();
  }

  public async selectCreditCard(cardName: string): Promise<void> {
    const select: ElementFinder = element(this.cardTypeInputLocator);
    return select.element(by.css(`[value=${cardName}]`)).click();
  }

  public async enterCardNumber(cardNumber: string): Promise<void> {
    return element(this.cardNumberInputLocator).sendKeys(cardNumber, protractor.Key.ENTER);
  }
}
