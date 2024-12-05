#!/bin/bash

rm -rf .expo node_modules package-lock.json gluestack-ui.config.json nativewind-env.d.ts global.css components/ui

npm cache clean --force; watchman watch-del-all; npx gluestack-ui init; npx gluestack-ui@latest add --all; npm i; npx expo start --clear