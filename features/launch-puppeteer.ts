import { Browser, LaunchOptions, Page, Viewport, devices, launch } from "puppeteer";

export type BrowserType = 'chrome' | 'firefox';

export type DeviceType = 'desktop' | 'mobile' | 'mobile landscape';

interface LaunchParameters {
  debug: boolean;
  browser: BrowserType;
  device: DeviceType;
}

/**
 * Additional arguments to pass to the browser instance.
 * The list of Chromium flags can be found here:
 * https://peter.sh/experiments/chromium-command-line-switches/
 */
const CHROME_ARGS = [
  '--disable-background-timer-throttling',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-cloud-import',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-extensions',
  '--disable-gesture-typing',
  '--disable-hang-monitor',
  '--disable-infobars',
  '--disable-notifications',
  '--disable-offer-store-unmasked-wallet-cards',
  '--disable-offer-upload-credit-cards',
  '--disable-popup-blocking',
  '--disable-print-preview',
  '--disable-prompt-on-repost',
  '--disable-setuid-sandbox',
  '--disable-speech-api',
  '--disable-sync',
  '--disable-tab-for-desktop-share',
  '--disable-translate',
  '--disable-voice-input',
  '--disable-wake-on-wifi',
  '--enable-async-dns',
  '--enable-simple-cache-backend',
  '--enable-tcp-fast-open',
  '--enable-webgl',
  '--hide-scrollbars',
  '--ignore-gpu-blacklist',
  '--media-cache-size=33554432',
  '--metrics-recording-only',
  '--mute-audio',
  '--no-default-browser-check',
  '--no-first-run',
  '--no-pings',
  '--no-sandbox',
  '--no-zygote',
  '--password-store=basic',
  '--prerender-from-omnibox=disabled',
  '--use-gl=swiftshader',
  '--use-mock-keychain',
  '--disable-features=site-per-process',
  '--disable-backgrounding-occluded-windows',
  '--disable-renderer-backgrounding',
];

/**
 * Supported browser's viewports. 
 * The list of predefined device viewports can be find here: 
 * https://github.com/puppeteer/puppeteer/blob/main/src/common/DeviceDescriptors.ts
 */
const VIEWPORTS: { [key in DeviceType]: Viewport } = {
  'desktop': {
    width: 2560,
    height: 1470,
    deviceScaleFactor: 1,
    isMobile: false,
    hasTouch: false,
    isLandscape: false,
  },
  'mobile': devices['iPhone XR'].viewport,
  'mobile landscape': devices['iPhone XR landscape'].viewport
}

/** Wraps Puppeteer's `launch()` method to initialize both `Browser` and `Page` instances. */
async function launchPuppeteer(options: LaunchParameters): Promise<{ browser: Browser, page: Page }> {
  const launchOptions: LaunchOptions = {
    product: options.browser,
    headless: !options.debug,
    slowMo: 0,
    defaultViewport: VIEWPORTS[options.device],
    args: options.browser === 'chrome' ? CHROME_ARGS : undefined,
    devtools: options.browser === 'chrome' && options.debug
  };

  const browser = await launch(launchOptions);
  const page = await browser.newPage();

  return { browser, page };
}

export default launchPuppeteer;
