#!/bin/sh

set -xeu

# front build
npm -w front run build

# setup front_server files
rm -rf front_server/public/
mkdir -p front_server/public/

cp -r lp/* front_server/public/
cp -r front/dist front_server/public/app
cp -r static_data/recommends front_server/public

# front_server build
npm -w front_server run build
