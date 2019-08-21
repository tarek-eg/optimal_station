import getOptimalStation, { LinkStations } from '../index';

const stations: LinkStations = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];

test('get optimal station 1', () => {
  const answer = {
    power: 100,
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  };
  expect(getOptimalStation({ x1: 0, y1: 0 }, stations)).toEqual(answer);
});

test('get optimal station 2', () => {
  const answer = `No link station within reach for point ${100},${100}`;

  expect(getOptimalStation({ x1: 100, y1: 100 }, stations)).toEqual(answer);
});

test('get optimal station 3', () => {
  const answer = {
    power: 0.6718427000252355,
    x1: 15,
    x2: 10,
    y1: 10,
    y2: 0,
  };

  expect(getOptimalStation({ x1: 15, y1: 10 }, stations)).toEqual(answer);
});

test('get optimal station 4', () => {
  const answer = {
    power: 4.715728752538098,
    x1: 18,
    x2: 20,
    y1: 18,
    y2: 20,
  };

  expect(getOptimalStation({ x1: 18, y1: 18 }, stations)).toEqual(answer);
});
