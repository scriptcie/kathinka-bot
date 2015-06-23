var Quit = function() {}

Quit.prototype = {
    interact: function(message, from) {

        setTimeout(function() {
            process.exit(1);
        }, 1000);

        return "QUIT";
    },
}

module.exports = Quit;