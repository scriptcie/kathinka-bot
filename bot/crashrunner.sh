#!/bin/bash
echo "THIS IS KATHINKA-BOT RUNNING!"
cd ~/Kathinka/bot
git pull origin master
node irc_kathinka.js

