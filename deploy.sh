#!/bin/bash
git pull origin master &&
npm install &&
npm run build &&
pm2 restart 0 --update-env
