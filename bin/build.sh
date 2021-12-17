#!/bin/sh

set -xeu

# front build
npm -w front run build
npm -w front_server run build
rm -r front_server/public
cp -r front/dist front_server/public
cp -r static_data/recommends front_server/public