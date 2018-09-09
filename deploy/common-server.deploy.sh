#!/bin/sh
echo "---------- git pull ---------"
git pull 

echo "---------- start install devpendence ! ----------"
yarn install

echo "---------- start build ! ----------"
pm2 restart common-server

if [ $? -ne 0 ]; then
  echo "---------- deploy falied ! -----------"
else
  echo "---------- deploy success ! -----------"
fi