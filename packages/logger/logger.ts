import * as clc from 'cli-color';

export enum Colour {
  Default = 'black',
  Error = 'red',
  Blue = 'blue',
  Yellow = 'yellow',
  Green = 'green',
  Cyan = 'cyan',
}

const log = (message: string, colour?: Colour) => {
  console.log(clc[colour || Colour.Default](message));
};

export default log;
