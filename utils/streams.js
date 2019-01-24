#!/usr/bin/env node
const program = require("commander");

const OPTIONS = {
  "--file": "file",
  "--action": "action",
  "--help": "help",
};

const BRIEF_NAME_OPTIONS = {
  "-f": "file",
  "-a": "action",
  "-h": "help"
};

const help = err => {
  if (err) console.error(err);
  console.log("help action");
};

const reverse = line => {
    const reverted = line.split("").reverse().join("");
    console.log(reverted);
};

const RULES = {
  [OPTIONS["--action"]]: {
        reverse: {
          command: reverse,
          needArg: false
        }
  },
  [OPTIONS["--help"]]: help,
  [OPTIONS["--file"]]: true,
};

const convertRules = input => {
    return input.reduce((acc, rule) => {
        const rules = (rule.search(/^--\w+=\w+/) !== -1) ?
            rule.split("=").map(rule => OPTIONS[rule] ? OPTIONS[rule] : rule)
            : [rule].map(rule => BRIEF_NAME_OPTIONS[rule] ? BRIEF_NAME_OPTIONS[rule] : rule);

        return [...acc, ...rules];
    }, []);
};

const getNextString = (arr, flag) => {
  let index;
    arr.some((val, i) => {
        if (val.includes(flag)) {
            index = ++i;
            return true;
        };
        return false;
    });
    console.log(index, 'index')
  return arr.slice(index).join(' ');
};

const runRules = (rules, stdin) => {
    try {
        if (rules[0] === OPTIONS["--help"]) {
            help();
            return;
        }
        const action = RULES[rules[0]][rules[1]];
        const file = RULES[rules[2]];
        const value = (file && action.needArg) ? rules[3] : getNextString(stdin, rules[1]);
        action.command(value);
    } catch (err) {
        console.log("Incorrect Input");
        help();
    }
};

const main = stdin => {
  const convertedRules = convertRules(stdin);
  runRules(convertedRules, stdin);
};

const stdin = process.argv.slice(2);
main(stdin);
