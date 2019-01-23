#!/usr/bin/env node
const program = require("commander");

const OPTIONS = {
  file: '--file',
  f: '-f',
  action: '--action',
  a: '-a',
  help: '--help',
  h: '-h'
};

const ACTIONS = {
  reverse: 'reverse',
};

 const help = () => {
     console.log("help action");
 };

  const fileActions = () => {
      console.log("file flag");
  };

  const actionActions = () => {
      console.log("action flag");
  };

const reverse = (line) => {
    console.log(line);
    const reverted = line.split('').reverse().join('');
    console.log(reverted);
}
const getReversedString = (input) => {
    console.log(input);
    return input[0].includes('=') ? input.slice(1).join()
        : input.slice(2).join();
}

const runOption = option => {
  const options = {
    [OPTIONS.f]: fileActions,
    [OPTIONS.file]: fileActions,
    [OPTIONS.a]: actionActions,
    [OPTIONS.actions]: actionActions,
    [OPTIONS.h]: help,
    [OPTIONS.help]: help,
  };
  options[option] ? options[option]() : help();
};

const runActions = (action, payload) => {
  const actions = {
    [ACTIONS.reverse]: reverse,
  };
  actions[action] ? actions[action](payload) : help();
};

const validateRules = input => {
    if (!input.length) {
        help();
        return;
    }

    const firstOption = getFirstValidOption(input[0]);
    if (firstOption) {
        runOption(firstOption);
    }

    const actions = input.slice(0, 2);
    const firstAction = actions.length ? getFirstValidAction(actions) : help();
    if (firstAction) {
        const string = getReversedString(input);
        runActions(firstAction, string);
    }

    const options = input.slice(1, 3);
    const secondaryOption = options.length ? getSecondValidOption(options) : help();
    if (secondaryOption) {
        runOption(secondaryOption);
    }
};

const getFirstValidOption = input => {
  const option = input.split("=")[0];
  const validOptions = {
    [OPTIONS.help]: OPTIONS.help,
    [OPTIONS.h]: OPTIONS.h,
    [OPTIONS.action]: OPTIONS.action,
    [OPTIONS.a]: OPTIONS.a
  };
  return validOptions[option] ? validOptions[option] : null;
};

const getSecondValidOption = inputs => {
    let option = inputs[0].split("=");
    const validOptions = {
        [OPTIONS.f]: OPTIONS.f,
        [OPTIONS.file]: OPTIONS.file,
    };

    if (validOptions[option[0]]) {
        return validOptions[option[0]];
    }

    option = inputs.length > 1 ? inputs[1].split("=") : null;
    return validOptions[option] ? validOptions[option] : null;
};

const getFirstValidAction = inputs => {
    let option = inputs[0].split("=");
    const validActions = {
        [ACTIONS.reverse]: ACTIONS.reverse,
    };

    if (validActions[option[1]]) {
        return validActions[option[1]];
    }

    option = inputs.length > 1 ? inputs[1].split("=") : null;
    return validActions[option[1]] ? validActions[option[1]] : null;
};

const stdin = process.argv.slice(2);
validateRules(stdin);
