import chalk from 'chalk';

export enum Colour {
  Default = 'black',
  Error = 'red',
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'green',
  Orange = 'orange',
  Purple = 'magenta',
}

const log = (message: string, colour?: Colour) => {
  console.log(chalk[colour || Colour.Default](message));
};

export default log;
