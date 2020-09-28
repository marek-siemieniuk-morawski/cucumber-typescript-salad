# Example of usage Cucumber.js with Typescript

## Goal

The idea is to present usage of Cucumber.js mixed with Typescript and Puppeteer, where the last one can be easily replaced by any other tool like Selenium. The main objectives are:

- take full advantage of Typescript
- provide command line interface
- keep everything as simple as possible. 

## Approach

There are basically two decisions that I had to make:

- Using `--world-parameters` to pass variables like test environment or browser to World object
- `CustomWorld` implemented as a class according to [this page of the documentation](https://github.com/cucumber/cucumber-js/blob/master/docs/nodejs_example.md). There is [another way](https://github.com/cucumber/cucumber-js/blob/master/docs/support_files/world.md) to do that, however, not sure which method is better. I find Cucumber for Javascript exceptionally bad documented.

The parameters passed to `--world-parameters` are resolved in `cucumber.js` file using environment variables. This way the parameters can be validated and parsed before initializing the World object. Also, it allowed to control the test execution without a need of writing JSON in terminal. Instead of:
```
  npm start --world-parameters '{\"env\": \"staging\", \"debug\": true, \"browser\": \"chrome\", \"device\": \"mobile\"}'`
```

we can simply execute:
```
  ENV=staging DEBUG=true BROWSWER=chrome DEVICE=mobile npm start
```

which is, you must admit it, much more readable and comfortable in use.

## Docker

Just like in my [other repo](https://github.com/ourgraciousruler/mocha-with-docker) I used a bash script as an entry point for Docker image to handle environment variables and to allow for Cucumber's `--tags` feature usage.

To build an image:
```
  docker build -t cucumber-ts-salad .  
```

To run it:
```
  docker run -e ENV="staging" -e BROWSER="chrome" -e DEVICE="mobile" -e EXPRESSION="@smoke" cucumber-ts-salad:latest 
```

where `EXPRESSION` is passed as `--tags` value.
