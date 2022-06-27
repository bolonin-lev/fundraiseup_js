const { expect } = require("@playwright/test");
const { DonationWidget } = require("../pages/donationWidget");

exports.ScreenPaymentMethod = class ScreenPaymentMethod extends DonationWidget {
  static _SCREEN_LOCATOR = "//*[@data-qa='active-screen-payment-method']";
  static _COVER_FEE_CHECKBOX = "//*[@data-qa='cover-fee-checkbox']";
  static _CREDIT_CARD_BUTTON = "//*[@data-qa='cc-button']";

  constructor(page) {
    super(page);
    this.page = page;
    this.frameLocator = this.page.frameLocator(DonationWidget._FRAME_LOCATOR);
    this.coverFeeCheckbox = this.frameLocator.locator(
      ScreenPaymentMethod._COVER_FEE_CHECKBOX
    );
    this.creditCardButton = this.frameLocator.locator(
      ScreenPaymentMethod._CREDIT_CARD_BUTTON
    );
  }

  async waitLoad() {
    await expect(this.frameLocator.locator(ScreenPaymentMethod._SCREEN_LOCATOR))
      .toBeEnabled;
  }

  async checkCCButtonLabel(label) {
    await expect(this.creditCardButton).toHaveText(label);
  }

  async CreditCardButtonClick() {
    await this.creditCardButton.click();
  }

  async unsetCoverFeeCheckbox() {
    await expect(this.coverFeeCheckbox).toBeChecked();
    await this.coverFeeCheckbox.uncheck();
  }

  async checkCoverFeeCheckboxLabel(label) {
    await expect(this.coverFeeCheckbox).toHaveText(label);
  }
};
