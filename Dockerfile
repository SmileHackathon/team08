FROM golang:alpine

RUN apk update \
  && go mod download

WORKDIR /team8