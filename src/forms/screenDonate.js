const { test, expect } = require("@playwright/test");
const { DonationWidget } = require("../pages/donationWidget");

exports.ScreenDonate = class ScreenDonate extends DonationWidget {
  static _SCREEN_LOCATOR = "//*[@data-qa='active-screen-donate-form']";
  static _GIVE_MONTHLY_BUTTON = "//*[@data-qa='give-monthly']";
  static _AMOUNT_INPUT = "//*[@data-qa='amount']";
  static _CURRENCY_SELECTOR = "//*[@data-qa='currency-selector']";
  static _DONATE_BUTTON = "//*[@data-qa='donate-button']";

  constructor(page) {
    super(page);
    this.page = page;
    this.frameLocator = this.page.frameLocator(DonationWidget._FRAME_LOCATOR);
    this.giveMonthlyButton = this.frameLocator.locator(
      ScreenDonate._GIVE_MONTHLY_BUTTON
    );
    this.amountInput = this.frameLocator.locator(ScreenDonate._AMOUNT_INPUT);
    this.currencySelector = this.frameLocator.locator(
      ScreenDonate._CURRENCY_SELECTOR
    );
    this.donateButton = this.frameLocator.locator(ScreenDonate._DONATE_BUTTON);
  }

  async waitLoad() {
    await expect(this.frameLocator.locator(ScreenDonate._SCREEN_LOCATOR))
      .toBeEnabled;
  }

  async checkMonthlyButtonLabel(label) {
    await expect(this.giveMonthlyButton).toHaveText(label);
  }

  async monthlyButtonClick() {
    await this.giveMonthlyButton.click();
  }

  async setCurrency(currency) {
    await this.currencySelector.selectOption(currency);
  }

  async checkCurrency(currency) {
    await expect(this.currencySelector).toHaveValue(currency);
  }

  async setAmount(value) {
    await this.amountInput.focus();
    await this.amountInput.fill(value);
  }

  async checkAmount(value) {
    await expect(this.amountInput).toHaveValue(value);
  }

  async donateButtonClick() {
    await this.donateButton.click();
  }

  async checkDonateButtonLabel(label) {
    await expect(this.donateButton).toHaveText(label);
  }
};
