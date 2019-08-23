interface IDeviceLocation {
  x1: number;
  y1: number;
}

interface IStationLocation {
  x2: number;
  y2: number;
}

const calcEuclideanDistance = ({ x1, y1 }: IDeviceLocation, { x2, y2 }: IStationLocation): number =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

const stationPower = (reach: number, distance: number): number => {
  if (distance > reach) {
    return 0;
  }

  return Math.pow(reach - distance, 2);
};
// [x,y,reach]
export type LinkStations = Array<[number, number, number]>;

interface ISucessObj {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  power: number;
}

// const successMsg = ({ x1, x2, y1, y2, power }: ISucessObj): string =>
//   `Best link station for point ${x1},${y1} is ${x2},${y2} with power ${power}`;

const errorMsg = ({ x1, y1 }: IDeviceLocation): string => `No link station within reach for point ${x1},${y1}`;

// const createObj = (x1: number, y1: number) => ({ x1, y1 });

const getOptimalStation = ({ x1, y1 }: IDeviceLocation, stations: LinkStations): ISucessObj | string => {
  const optimalStation = stations.reduce(
    (acc, [x2, y2, reach]) => {
      const power = stationPower(reach, calcEuclideanDistance({ x1, y1 }, { x2, y2 }));

      if (acc.power > power) {
        return acc;
      }

      return {
        x1,
        y1,
        x2,
        y2,
        power,
      };
    },
    {} as ISucessObj,
  );

  if (optimalStation.power > 0) {
    return optimalStation;
  }

  return errorMsg({ x1, y1 });
};

// const stations: LinkStations = [[0, 0, 10], [20, 20, 5], [10, 0, 12]];
export default getOptimalStation;
