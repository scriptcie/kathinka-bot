#!/bin/bash
echo "THIS IS KATHINKA-BOT RUNNING!"
# forever -c sh start crashrunner.sh
cd ~/Kathinka/bot
git pull origin master
echo "NEW RUN OF KATHINKA-BOT IRC" >> kathinkalog.txt
node irc_kathinka.js Kathinka-bot ***REMOVED*** >> kathinkalog.txt

