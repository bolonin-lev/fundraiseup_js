const { expect } = require("@playwright/test");
const { DonationWidget } = require("../pages/donationWidget");

exports.ScreenPrivacy = class ScreenPrivacy extends DonationWidget {
  static _FIRST_NAME = "//input[@data-qa='personal-first-name']";
  static _LAST_NAME = "//input[@data-qa='personal-last-name']";
  static _EMAIL = "//input[@data-qa='personal-email']";
  static _CONTINUE_BUTTON = "//button[@data-qa='privacy-continue']";

  constructor(page) {
    super(page);
    this.page = page;
    this.frameLocator = this.page.frameLocator(DonationWidget._FRAME_LOCATOR);
    this.firstNameInput = this.frameLocator.locator(ScreenPrivacy._FIRST_NAME);
    this.lastNameInput = this.frameLocator.locator(ScreenPrivacy._LAST_NAME);
    this.emailInput = this.frameLocator.locator(ScreenPrivacy._EMAIL);

    this.continueButton = this.frameLocator.locator(
      ScreenPrivacy._CONTINUE_BUTTON
    );
  }

  async waitLoad() {
    await expect(this.frameLocator.locator(ScreenPrivacy._SCREEN_LOCATOR))
      .toBeEnabled;
  }

  async setFirsName(value) {
    await this.firstNameInput.fill(value);
  }

  async checkFirsName(value) {
    await expect(this.firstNameInput).toHaveValue(value);
  }

  async setLastName(value) {
    await this.lastNameInput.fill(value);
  }

  async checkLastName(value) {
    await expect(this.lastNameInput).toHaveValue(value);
  }

  async setEmail(value) {
    await this.emailInput.fill(value);
  }

  async checkEmail(value) {
    await expect(this.emailInput).toHaveValue(value);
  }

  async ContinueButtonClick() {
    await this.continueButton.click();
  }

  async checkContinueButtonLabel(label) {
    await expect(this.continueButton).toHaveText(label);
  }
};
