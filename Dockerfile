FROM node:13-slim

# See https://crbug.com/795759
RUN apt-get update && apt-get install -yq libgconf-2-4

# Note: this installs the necessary libs to make the bundled version of Chromium that Puppeteer installs work.
RUN apt-get update && apt-get install -y wget --no-install-recommends \
  && apt-get install -y chromium \
  && apt-get install -y ca-certificates wget \
  && apt-get -y install curl \
  && apt-get install -y gnupg2 \
  && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
  && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
  && apt-get update \
  && apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst ttf-freefont \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/* \
  && apt-get purge --auto-remove -y curl \
  && rm -rf /src/*.deb

WORKDIR /usr/src/app

COPY . /usr/src/app

# "PUPPETEER_PRODUCT=firefox" to download a supported Firefox browser binary.
RUN PUPPETEER_PRODUCT=firefox npm ci

RUN chmod +x /usr/src/app/run.sh

ENTRYPOINT [ "./run.sh" ]
