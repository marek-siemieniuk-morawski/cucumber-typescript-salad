const Joi = require('joi');

const WorldParametersSchema = Joi.object({
  env: Joi.string()
    .valid(...['local', 'integration', 'staging'])
    .required(),

  debug: Joi.boolean()
    .optional()
    .default(false),
    
  browser: Joi.string()
    .optional()
    .valid(...['chrome', 'firefox'])
    .default('chrome'),

  device: Joi.string()
    .optional()
    .valid(...['desktop', 'mobile', 'mobile landscape'])
    .default('mobile')
});

const result = WorldParametersSchema.validate({
  env: process.env.ENV,
  debug: process.env.DEBUG,
  browser: process.env.BROWSER,
  device: process.env.DEVICE
});

if (result.error) {
  throw result.error;
}

const { env, debug, browser, device } = result.value;

module.exports = {
  /**
   * Default Cucumber's profile. Use the `cucumber-js --help` command to see which arguments can be passed.
   * Sadly, it doesn't support arrays, that's why `.join(' ')` is used.
   */
  default: [
    '--require-module ts-node/register',
    '--require features/support/*.ts',
    '--require features/step-definitions/*.ts',
    `--world-parameters '{\"env\": \"${env}\", \"debug\": ${debug}, \"browser\": \"${browser}\", \"device\": \"${device}\"}'`,
    '--format', 'json:reports/cucumber-report.json'
  ].join(' ')
}