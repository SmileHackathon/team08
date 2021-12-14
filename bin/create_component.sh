#!/bin/sh
set -xeu

TYPE=$1
NAME=$2
DIR=`dirname $0`

SRC="$DIR/create_component/$TYPE" 
DEST="src/components/$TYPE/$NAME"

cp -rT $SRC $DEST
sed -i "s/#NAME/$NAME/g" $DEST/*