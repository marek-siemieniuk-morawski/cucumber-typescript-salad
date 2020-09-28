import { Browser, Page } from "puppeteer";
import { BrowserType, DeviceType } from "../launch-puppeteer";
import { World, setWorldConstructor } from "cucumber";

import stream from 'stream'

/** Test environment. */
export type Environment = 'local' | 'integration' | 'staging';

/** Generic launch options for Puppeteer and tests that can be passed into `--world-parameters` */
export interface WorldParameters {
  env: Environment;
  debug: boolean;
  browser: BrowserType;
  device: DeviceType
}

/**
 * Function used for adding attachments to hooks/steps.
 * Based on https://github.com/cucumber/cucumber-js/blob/master/src/runtime/attachment_manager/index.ts
 */
export type AttachFunction = (attachment: { data: Buffer | stream.Readable | string, mediaType?: string }) => void

/**
 * Function used for logging information from hooks/steps.
 * Based on https://github.com/cucumber/cucumber-js/blob/master/src/runtime/attachment_manager/index.ts
 */
export type LogFunction = (text: string) => void | Promise<void>

/**
 * Custom world's constructor object.
 * Based on https://github.com/cucumber/cucumber-js/blob/master/src/support_code_library_builder/world.ts
 */
interface WorldOptions {
  attach: AttachFunction,
  log: LogFunction;
  parameters: WorldParameters;
}

class CustomWorld implements World {
  /** Function used for adding attachments to hooks/steps. */
  public attach: AttachFunction;

  /** Function used for logging information from hooks/steps. */
  public log: LogFunction

  /** Parsed `--world-parameters` JSON parameters according to the WorldParameters interface. */
  public parameters: WorldParameters;

  /**
   * Placeholder for a variable like sessionId that we want to share between steps.
   * Only for example purposes.
   */
  public sessionId: string = '';

  /**
   * Puppeteer's `Browser` instance.
   * By default is undefined - don't forget to launch it first!
   */
  public browser!: Browser;

  /**
   * Page provides methods to interact with a single tab in Chromium
   * By default is undefined - don't forget to launch it first!
   */
  public page!: Page;

  constructor({ attach, log, parameters }: WorldOptions) {
    this.attach = attach;
    this.log = log;
    this.parameters = parameters;
  }
};

setWorldConstructor(CustomWorld);
