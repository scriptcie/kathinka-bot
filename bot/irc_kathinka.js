////////////////////////////////////
// KATHINKA-BOT IRC               //
////////////////////////////////////

////////////////////////////////////
// CONFIGURATION                  //
////////////////////////////////////
var net = require('net'),
irc = {},
config = {
    user: {
        nick: process.argv[2],
        user: process.argv[2],
        real: process.argv[2],
        pass: process.argv[3]
    },
    server: {
        addr: 'irc.freenode.net',
        port: 6667
    },
    data: {}
}



////////////////////////////////////
// create socket                  //
////////////////////////////////////
irc.socket = new net.Socket();
// als er data binnenkomt
irc.socket.on('data', function(data)
              {
                  // lees de data regel voor regel
                  data = data.split('\n');
                  for (var i = 0; i < data.length; i++)
                  {
                      // print wat er binnenkomt
                      //console.log('RECV -', data[i]);
                      // als het geen lege regel is haal dan even de extra enter weg. Dat doet IRC blijkbaar een \r\n situatie. mss hadden we ook kunnen splitten op \r\n?
                      if (data !== '')
                      {
                          irc.handle(data[i].slice(0, -1));
                      }
                  }
              });


irc.socket.on('connect', function() {
    //zeg dat we connecten
    console.log('Established connection, registering and misc...');
    setTimeout(function(){  }, 2000);
    // bouw listener: als PING, dan PONG. irc.on staat hieronder.
    irc.on(/^PING :(.+)$/i, function(info)
            {
                irc.raw('PONG :' + info[1]);
            });

    // laat zien wanneer je connected bent
    irc.on(/End of \/MOTD command/i, function(info){
        console.log("CONNECTED!");
        irc.raw("PRIVMSG NickServ :IDENTIFY " . config.user.pw);
        irc.raw("JOIN #script?cie");
    })

    ////////////////////////////////////
    // CORE BUSINESS                  //
    ////////////////////////////////////
    irc.on(/^:([^!@]+).*[^C,]PRIVMSG([^\:]+):(.+)$/, function(info) {
        var user = info[1];
        var channel = info[2];
        var data = info[3];
        var match;
        if (!(/^.*#.*$/.test(channel))) {
            irc.raw("PRIVMSG " + user + " :" + "* I AM KATHINKA-BOT *");
            return;
        }

        if  (match = data.match(/^[Kk]athinka(-bot)?(.*)$/)) {
            var actual_data = match[2];
            if (/^[,:]{0,1} AF.*$/.test(actual_data)) {
                irc.raw("QUIT");
                process.exit(1);
                return;
            } else if (/^.*\?$/.test(actual_data)) {
                var eightball = [
                    "It is certain", "It is decidedly so", "Without a doubt",
                    "Yes definitely", "You may rely on it", "As I see it, yes",
                    "Most likely", "Outlook good", "Yes", "Signs point to yes",
                    "Reply hazy try again", "Ask again later", "Better not tell you now",
                    "Cannot predict now", "Concentrate and ask again", "Don't count on it",
                    "My reply is no", "My sources say no", "Outlook not so good",
                    "Very doubtful"];
                irc.raw("PRIVMSG " + channel + " :" + eightball[data.split('').map(function(i){return i.charCodeAt(0);}).reduce(function(previousValue, currentValue){return previousValue + currentValue;})*13 % eightball.length]);
                return;
            }
        }

        if (/^(le[']ah)|(sl[ea][ea]p)|(later)$/.test(data)){
            irc.raw("PRIVMSG " + channel + " :" + data + ", " + user);
            return;
        }
        if (/^.*[Kk]athinka.*$/.test(data)) {
            irc.raw("PRIVMSG " + channel + " :" + "* I AM KATHINKA-BOT *");
            return;
        }
    });

    irc.on(/^:([^!@]+).*[^C,]JOIN[^#]+(#.+)$/, function(info) {
        var user = info[1];
        var channel = info[2];
        if (user != config.user.nick) {
            irc.raw("PRIVMSG " + channel + " :moi " + user);
        }
    });

    ////////////////////////////////////
    // IRC INTERNALS                  //
    ////////////////////////////////////

    // wacht heel even voor je de NICK informatie stuurt
    setTimeout(function()
                {
                    irc.raw('NICK ' + config.user.nick);
                    irc.raw('USER ' + config.user.user + ' 8 * :' + config.user.real);
                }, 500);
});

// settings + connect
irc.socket.setEncoding('ascii');
irc.socket.setNoDelay();
setTimeout(function(){irc.socket.connect(config.server.port, config.server.addr);}, 2000);


//handles incoming messages
irc.handle = function(data)
{
    var i, info;
    for (i = 0; i < irc.listeners.length; i++)
    {
        info = irc.listeners[i][0].exec(data);
        if (info)
        {
            //console.log(info);
            irc.listeners[i][1](info, data);
        }
    }
}

irc.listeners = [];

irc.on = function(data, callback)
{
    irc.listeners.push([data, callback, false])
}

irc.raw = function(data)
{
    irc.socket.write(data + '\n', 'ascii', function()
                     {
                         console.log('SENT :', data);
                     });
}
////////////////////////////////////
// KATHINKA-BOT IRC               //
////////////////////////////////////
// PRODUCED BY PLUS.              //
// LANTING IS A REGISTERED        //
// TRADEMARK OF VIENT             //
// 2015 (c)                       //
////////////////////////////////////
