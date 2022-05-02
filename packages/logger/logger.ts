import chalk from 'chalk';

export enum Colour {
  Default = 'black',
  Error = 'red',
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'green',
  Cyan = 'cyan',
}

const log = (message: string, colour?: Colour) => {
  console.log(chalk[colour || Colour.Default](message));
};

export default log;
