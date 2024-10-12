# awesome-electron-boilerplate

## Setup

```bash

# setup node
nvm install
nvm use

# package install
pnpm install

# setup .env inside each package
cp .env.example .env <- and fill the .env
# and fill insert p12 file inside ./build-assets folder if codesigning is required
# and fill certificate password for CSC_KEY_PASSWORD inside ./build-assets/build-mac.sh to sign the app

# start dev
pnpm dev

# build
pnpm build:mac
pnpm build:win
pnpm build:linux


```
