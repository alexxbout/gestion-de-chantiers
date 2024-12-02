npm cache clean --force
watchman watch-del-all
npm i
npx gluestack-ui init
npx gluestack-ui@latest add --all
npx expo start --clear