#!/bin/bash

rm -rf .expo node_modules package-lock.json

npm cache clean --force; watchman watch-del-all; npm i; npx expo start --clear