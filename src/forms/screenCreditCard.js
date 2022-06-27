const { expect } = require("@playwright/test");
const { DonationWidget } = require("../pages/donationWidget");

exports.ScreenCreditCard = class ScreenCreditCard extends DonationWidget {
  static _SCREEN_LOCATOR = "//*[@data-qa='active-screen-credit-card']";
  static _CREDIT_CARD_FRAME = "//div[@qa='card-number']//iframe";
  static _CREDIT_CARD_INPUT = "//input[@name='cardnumber']";
  static _EXPIRE_DATE_FRAME = "//div[@qa='expire-date']//iframe";
  static _EXPIRE_DATE_INPUT = "//input[@name='exp-date']";
  static _CARD_CVV_FRAME = "//div[@qa='card-cvv']//iframe";
  static _CARD_CVV_INPUT = "//input[@name='cvc']";

  static _ERROR = "//*[@data-qa='card-continue-error-message']";
  static _CONTINUE_BUTTON = "//button[@data-qa='card-continue']";

  constructor(page) {
    super(page);
    this.page = page;
    this.frameLocator = this.page.frameLocator(DonationWidget._FRAME_LOCATOR);
    this.creditCardInput = this.frameLocator
      .locator(ScreenCreditCard._CREDIT_CARD_FRAME)
      .frameLocator(":scope")
      .locator(ScreenCreditCard._CREDIT_CARD_INPUT);
    this.expireDateInput = this.frameLocator
      .locator(ScreenCreditCard._EXPIRE_DATE_FRAME)
      .frameLocator(":scope")
      .locator(ScreenCreditCard._EXPIRE_DATE_INPUT);
    this.cvvInput = this.frameLocator
      .locator(ScreenCreditCard._CARD_CVV_FRAME)
      .frameLocator(":scope")
      .locator(ScreenCreditCard._CARD_CVV_INPUT);
    this.error = this.frameLocator.locator(ScreenCreditCard._ERROR);
    this.continueButton = this.frameLocator.locator(
      ScreenCreditCard._CONTINUE_BUTTON
    );
  }

  async waitLoad() {
    await expect(this.frameLocator.locator(ScreenCreditCard._SCREEN_LOCATOR))
      .toBeEnabled;
  }

  async setCreditCard(value) {
    await this.creditCardInput.fill(value);
  }

  async checkCreditCard(value) {
    await expect(this.creditCardInput).toHaveValue(value);
  }

  async setExpireDate(value) {
    await this.expireDateInput.fill(value);
  }

  async checkExpireDate(value) {
    await expect(this.expireDateInput).toHaveValue(value);
  }

  async setCardCVV(value) {
    await this.cvvInput.fill(value);
  }

  async checkCardCVV(value) {
    await expect(this.cvvInput).toHaveValue(value);
  }

  async ContinueButtonClick() {
    await this.continueButton.click();
  }

  async checkContinueButtonLabel(label) {
    await expect(this.continueButton).toHaveText(label);
  }

  async checkCardError(value) {
    await expect(this.error).toHaveText(value);
  }
};
