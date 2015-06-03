#!/bin/bash
echo "THIS IS KATHINKA-BOT RUNNING!"
# forever -c sh start crashrunner.sh
cd ~/Kathinka/bot
git pull origin master
nohup node irc_kathinka.js > kathinkalog.txt

