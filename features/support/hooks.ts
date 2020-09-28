import { After, Before } from "cucumber";

import launchPuppeteer from "../launch-puppeteer";

Before(async function() {
  const { browser, page } = await launchPuppeteer({
    debug: this.parameters.debug,
    browser: this.parameters.browser,
    device: this.parameters.device,
  });

  this.browser = browser;
  this.page = page;
});

After(async function() {
  this.browser.close();
});
