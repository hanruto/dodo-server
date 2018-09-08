#!/bin/sh
echo "---------- git pull ---------"
git pull 

echo "---------- start install devpendence ! ----------"
yarn install

echo "---------- start build ! ----------"
yarn build
pm2 restart server

if [ $? -ne 0 ]; then
  echo "---------- deploy falied ! -----------"
else
  echo "---------- deploy success ! -----------"
fi