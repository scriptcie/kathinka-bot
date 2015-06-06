#!/bin/bash
echo "THIS IS KATHINKA-BOT RUNNING!"
# forever -c sh start crashrunner.sh
until node irc_kathinka.js Kathinka ***REMOVED***> kathinkalog.txt; do
     echo "Server 'myserver' crashed with exit code $?.  Respawning.." >&2
     sleep 1
done

