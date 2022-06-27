const { test, expect } = require("@playwright/test");

exports.DonationWidget = class DonationWidget {
  static _FRAME_LOCATOR = "[title='Donation Widget']";

  constructor(page) {
    this.page = page;
    this.frameLocator = this.page.frameLocator(DonationWidget._FRAME_LOCATOR);
  }
};
