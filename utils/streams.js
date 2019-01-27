#!/usr/bin/env node
const through2 = require('through2');
const fs = require('fs');
const parse = require('csv-parse/lib/sync');


const OPTIONS = {
  '--file': 'file',
  '--action': 'action',
  '--help': 'help'
};

const BRIEF_NAME_OPTIONS = {
  '-f': 'file',
  '-a': 'action',
  '-h': 'help'
};

const helpMessage = `
Usage: ./streams.js --action=<actionName> [--file=<fileName>, textToTransform]
Options:
    -h, --help      Show help message
    -a, --action    Running action
    -f, --file      Specify file name
    -p, --path      Specify path
Actions:
    reverse(string)
    transform(string)
    outputFile(filePath)
    convertFromFile(filePath)
    convertToFile(filePath)
    cssBundler(path)`;

const help = err => {
  if (err) console.error(err);
  console.log(helpMessage);
};

const reverse = line => {
  const reverted = line.toString().split('').reverse().join('');
  process.stdout.write(`${reverted}\n`);
};

const transform = string => {
  process.stdin
    .pipe(
      through2(function(chunk, enc, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
      })
    )
    .pipe(process.stdout);

  process.stdin.on('data', () => {
    process.stdout.end('\n');
    process.exit(0);
  });

  process.stdin.on('error', error =>
      console.error(`Error while reading string: ${string}\n\t ${error.message}`)
  );
  process.stdin.push(string);
};

const outputFile = filePath => {
  const reader = fs.createReadStream(filePath);
  reader.on('error', error => {
    console.error(`Error while reading file: ${filePath}\n\t ${error.message}`);
  });

  reader.pipe(process.stdout);
};

const convertFromFile = filePath => {
  let output = '';

  const reader = fs.createReadStream(filePath);
  reader.on('error', error =>
    console.error(`Error while reading file: ${filePath}\n\t ${error.message}`));

  reader.on('data', (chunk) => {
    output += chunk.toString('utf8');
  });

  reader.on('end', () => {
    const converted = parse(output, {
      columns: true,
      skip_empty_lines: true
    });
    console.log(converted);
  });
}

const RULES = {
  [OPTIONS['--action']]: {
    reverse: {
      command: reverse,
      needArg: false
    },
    transform: {
      command: transform,
      needArg: false
    },
    outputFile: {
      command: outputFile,
      needArg: true
    },
    convertFromFile: {
      command: convertFromFile,
      needArg: true
    }
  },
  [OPTIONS['--help']]: help,
  [OPTIONS['--file']]: true
};

const convertRules = input => {
  return input.reduce((acc, rule) => {
    const rules =
      rule.search(/^--\w+=\w+/) !== -1 ?
      rule.split('=').map(rule => (OPTIONS[rule] ? OPTIONS[rule] : rule)) : [rule].map(rule =>
        BRIEF_NAME_OPTIONS[rule] ? BRIEF_NAME_OPTIONS[rule] : rule
      );

    return [...acc, ...rules];
  }, []);
};

const getNextString = (arr, flag) => {
  let index;
  arr.some((val, i) => {
    if (val.includes(flag)) {
      index = ++i;
      return true;
    }
    return false;
  });
  // console.log(index, 'index')
  return arr.slice(index).join(' ');
};

const runRules = (rules, stdin) => {
  console.log(rules);
  try {
    if (rules[0] === OPTIONS['--help']) {
      help();
      return;
    }
    const action = RULES[rules[0]][rules[1]];
    const file = RULES[rules[2]];
    const value = file && action.needArg ? rules[3] : getNextString(stdin, rules[1]);
    action.command(value);
  } catch (err) {
    help();
    console.error(err);
  }
};

const main = stdin => {
  const convertedRules = convertRules(stdin);
  runRules(convertedRules, stdin);
};

const stdin = process.argv.slice(2);
main(stdin);
