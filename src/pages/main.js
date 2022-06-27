const { test, expect } = require("@playwright/test");

exports.Main = class Main {
  static _FRAME_LOCATOR = "//iframe[@title='Donate Button']";
  static _DONATE_BUTTON_LOCATOR = "fun-element";

  constructor(page) {
    this.page = page;
    this.frameLocator = this.page.frameLocator(Main._FRAME_LOCATOR);
    this.buttonLocator = this.frameLocator.locator(
      "//*[@qa='" + Main._DONATE_BUTTON_LOCATOR + "']"
    );
  }

  async donateButtonClick() {
    await this.buttonLocator.click();
  }

  async donateButtonCheckLabel(label) {
    await expect(this.buttonLocator).toHaveText(label);
  }
};
