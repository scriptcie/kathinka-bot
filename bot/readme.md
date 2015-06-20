# Kathinka bot
Kathinka bot is a bot network that can do cool stuff.

## Installation
First install any dependencies.
```
npm install
```

## Tests
To run tests we need gulp.
```
npm install --global gulp
```

Then run `gulp mocha` to run the tests once.
Use `gulp` to run the tests and watch for any changes.


## Documentation
Next follows some of the ideas considered when writing Kathinka-Bot

### BotNet
A BotNet is a network of bots that sends messages to bots.
We will probably have 1 bot for each channel, such that prioritizing responses based on prevrious interactiosn will be simpler (see Interactions).

### Bot (Kathinka)
Interacts with messages

### Interactions
When a bot in the bot network is notified about a message, then that bot will check if it can match that message with an interaction.
Interactions are simple objects that only have a constructor and a `interact(Message message)` function.
When a bot receives a message it asigns a priority to each of its interactions.
This priority can based on previously returned interactions.
(So when we ask to add something to an agenda then it's likely that in the next interaction we will again ask to add something to that agenda)

Prioritization of interactions can be based on time, previous interactions, grouped interactions and probably more.

#### Responses
This `interact` function will return either interaction response (message + priority) or just a message (WIP) that 

#### Performance
It's possible that some interactions use similar regex's to determine if they match some message.
For example the regex `/^[Kk]athinka(-bot)?(.*)$` is used multiple times to determine if a message was a command directed to our bot.
Matching this regular expression multiple times can be quite inefficient.
This problem can probably be solved if we let our interaction objects use a service object that checks regular expressions and caches the result.


#### Keywords
Interaction rules (specificaties die we wellicht kunnen gebruiken om resultaten van interacties te filteren)


## Todo
IRC Client instellen (gebruik makend van node-irc)
BotNet
Meer interacties
- Agenda
- Reminders
