#!/bin/bash

rm -rf .expo node_modules package-lock.json tailwind.config.js gluestack-ui.config.json nativewind-env.d.ts global.css components/ui

npm cache clean --force
watchman watch-del-all
npm i
npx gluestack-ui init
npx gluestack-ui@latest add --all

# npx expo start --clear