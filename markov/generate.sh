#!/bin/bash
# this script should generate a piece of text based on a second order markov model.
# take 3 tokens, grep these in a certain directory. error if nothing found... else shuffle new tokens, add one new token to the end of the tekst.
# tokens, words+leestekens
# moet grep dan non greedy zijn? dunno
#clear
#echo "Welkom bij de superrandom bash markov like tokeninzing grep motiegeneratorvulling-generator"
#read -n 1 -s
#clear
####################################################################################################
# variables
tokenformat="([.,;?!]| \w\w+)" # regex to explain what a token looks like.
length=${2:-5}
reach=${3:-2}
initial=${4:-5}
####################################################################################################
function init {
unset tokens
declare -a tokens
firstword="$(grep --no-filename -RPo "(?<=\.\s)[A-Z]\w+( \w+){$initial}" source/ | shuf | head -1)" # start a sentence with first token
tokens[$length]="$firstword"
echo -ne $firstword
}

function nextoken {
context="$(printf "%s" "${tokens[@]}")"
#context="$(echo ${tokens[0]}${tokens[1]}${tokens[2]}${tokens[3]}${tokens[4]}${tokens[5]}${tokens[6]}${tokens[7]})" # concatenate tokenstring
echo "$(grep --no-filename -RPo "(?<=$context)$tokenformat{$reach}" source/ | shuf | head -1)" # search for new token
}

init



function steptoken {
newelement="$(nextoken)"
if [[ "$newelement" =~ [.?!] ]]; then
    echo -ne "$newelement" " "
    echo
    exit 0
    #init
else
    tokens=(${tokens[@]:1:(${#tokens[@]}-1)}) 
    tokens[$length]="$newelement"
    echo -ne "$newelement" 
fi
}

while :
do
    steptoken
done
#echo "kthnxbye!"
#clear
echo
exit 0
