const { test, expect } = require("@playwright/test");
const { Main } = require("../src/pages/main.js");
const { DonationWidget } = require("../src/pages/donationWidget.js");
const { ScreenDonate } = require("../src/forms/screenDonate.js");
const { ScreenPaymentMethod } = require("../src/forms/screenPaymentMethod.js");
const { ScreenCreditCard } = require("../src/forms/screenCreditCard.js");
const { ScreenPrivacy } = require("../src/forms/screenPrivacy.js");

let donor;
let creditCard;

test.describe.configure({ mode: "parallel" });

test.beforeAll(async () => {
  donor = {
    firstName: "FName",
    lastName: "LName",
    email: "test@mail.ru",
  };

  creditCard = {
    number: "4242 4242 4242 4242",
    expireDate: "04 / 24",
    cvv: "000",
  };
});

test("donor test1", async ({ page }) => {
  const main = new Main(page);
  await page.goto("https://data.fundraiseup.com/qa-test-7R58U3/");
  await main.donateButtonCheckLabel("Give Now");
  await main.donateButtonClick();

  const screenDonate = new ScreenDonate(page);
  await screenDonate.waitLoad();
  await screenDonate.checkMonthlyButtonLabel("Monthly");

  await screenDonate.checkMonthlyButtonLabel("Monthly");
  await screenDonate.monthlyButtonClick();
  await screenDonate.setCurrency("USD");
  await screenDonate.checkCurrency("USD");
  await screenDonate.setAmount("100");
  await screenDonate.checkAmount("100");
  await screenDonate.checkDonateButtonLabel("Donate monthly");
  await screenDonate.donateButtonClick();

  const screenPaymentMethod = new ScreenPaymentMethod(page);
  await screenPaymentMethod.waitLoad();
  await screenPaymentMethod.checkCoverFeeCheckboxLabel(
    "Cover transaction costs"
  );
  await screenPaymentMethod.unsetCoverFeeCheckbox();

  await screenPaymentMethod.checkCCButtonLabel("Credit card");
  await screenPaymentMethod.CreditCardButtonClick();

  const screenCreditCard = new ScreenCreditCard(page);
  await screenCreditCard.waitLoad();

  await screenCreditCard.setCreditCard(creditCard.number);
  await screenCreditCard.checkCreditCard(creditCard.number);
  await screenCreditCard.setExpireDate(creditCard.expireDate);
  await screenCreditCard.checkExpireDate(creditCard.expireDate);
  await screenCreditCard.setCardCVV(creditCard.cvv);
  await screenCreditCard.checkCardCVV(creditCard.cvv);
  await screenCreditCard.checkContinueButtonLabel("Continue");
  await screenCreditCard.ContinueButtonClick();

  const screenPrivacy = new ScreenPrivacy(page);
  await screenPrivacy.waitLoad();
  await screenPrivacy.setFirsName(donor.firstName);
  await screenPrivacy.checkFirsName(donor.firstName);
  await screenPrivacy.setLastName(donor.lastName);
  await screenPrivacy.checkLastName(donor.lastName);
  await screenPrivacy.setEmail(donor.email);
  await screenPrivacy.checkEmail(donor.email);
  await screenPrivacy.checkContinueButtonLabel("Donate $100/month");
  await screenPrivacy.ContinueButtonClick();

  await screenCreditCard.waitLoad();
  await screenCreditCard.checkCardError(
    "This could be due to any of several reasons: incorrect security code, insufficient funds, card limit, card disabled, etc."
  );
});

test("donor test2", async ({ page }) => {
  const main = new Main(page);
  await page.goto("https://data.fundraiseup.com/qa-test-7R58U3/");
  await main.donateButtonCheckLabel("Give Now");
  await main.donateButtonClick();

  const screenDonate = new ScreenDonate(page);
  await screenDonate.waitLoad();
  await screenDonate.checkMonthlyButtonLabel("Monthly");

  await screenDonate.checkMonthlyButtonLabel("Monthly");
  await screenDonate.monthlyButtonClick();
  await screenDonate.setCurrency("USD");
  await screenDonate.checkCurrency("USD");
  await screenDonate.setAmount("100");
  await screenDonate.checkAmount("100");
  await screenDonate.checkDonateButtonLabel("Donate monthly");
  await screenDonate.donateButtonClick();

  const screenPaymentMethod = new ScreenPaymentMethod(page);
  await screenPaymentMethod.waitLoad();
  await screenPaymentMethod.checkCoverFeeCheckboxLabel(
    "Cover transaction costs"
  );
  await screenPaymentMethod.unsetCoverFeeCheckbox();

  await screenPaymentMethod.checkCCButtonLabel("Credit card");
  await screenPaymentMethod.CreditCardButtonClick();

  const screenCreditCard = new ScreenCreditCard(page);
  await screenCreditCard.waitLoad();

  await screenCreditCard.setCreditCard(creditCard.number);
  await screenCreditCard.checkCreditCard(creditCard.number);
  await screenCreditCard.setExpireDate(creditCard.expireDate);
  await screenCreditCard.checkExpireDate(creditCard.expireDate);
  await screenCreditCard.setCardCVV(creditCard.cvv);
  await screenCreditCard.checkCardCVV(creditCard.cvv);
  await screenCreditCard.checkContinueButtonLabel("Continue");
  await screenCreditCard.ContinueButtonClick();

  const screenPrivacy = new ScreenPrivacy(page);
  await screenPrivacy.waitLoad();
  await screenPrivacy.setFirsName(donor.firstName);
  await screenPrivacy.checkFirsName(donor.firstName);
  await screenPrivacy.setLastName(donor.lastName);
  await screenPrivacy.checkLastName(donor.lastName);
  await screenPrivacy.setEmail(donor.email);
  await screenPrivacy.checkEmail(donor.email);
  await screenPrivacy.checkContinueButtonLabel("Donate $100/month");
  await screenPrivacy.ContinueButtonClick();

  await screenCreditCard.waitLoad();
  await screenCreditCard.checkCardError(
    "This could be due to any of several reasons: incorrect security code, insufficient funds, card limit, card disabled, etc."
  );
});
