#!/bin/bash
echo "THIS IS KATHINKA-BOT RUNNING!"
# forever -c sh start crashrunner.sh
cd ~/Kathinka/
git pull origin master
npm install
echo "NEW RUN OF KATHINKA-BOT IRC" >> kathinkalog.txt
node Bootstrap/Start.js >> kathinkalog.txt

