#!/bin/bash
echo "THIS IS KATHINKA-BOT RUNNING!"
# forever -c sh start crashrunner.sh
cd ~/Kathinka/bot
git pull origin master
npm install
echo "NEW RUN OF KATHINKA-BOT IRC" >> kathinkalog.txt
node Bootstrap/Start.js Kathinka-test ***REMOVED*** >> kathinkalog.txt

