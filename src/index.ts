// to run the program
// tsc TarekMostafa_assignment.ts
// node TarekMostafa_assignment.js

type DeviceLocation = { x1: number, y1: number }
type StationLocation = { x2: number, y2: number }

const calcEuclideanDistance = ({x1, y1}: DeviceLocation, {x2, y2}: StationLocation): number =>
    Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))

const stationPower = (reach: number, distance: number): number => {

    if (distance > reach) return 0

    return Math.pow(reach - distance, 2)
}
// [x,y,reach]
type LinkStations = Array<[number, number, number]>

type SucessObj = {
    x1: number, y1: number, x2: number, y2: number, power: number
}

const successMsg = ({ x1, x2, y1, y2, power }: SucessObj): void =>
    console.log(`Best link station for point ${x1},${y1} is ${x2},${y2} with power ${power}`)

const errorMsg = ({x1, y1}: DeviceLocation): void => console.log(`No link station within reach for point ${x1},${y1}`)

const getOptimalStation = ({x1, y1}: DeviceLocation, stations: LinkStations) => {

    const optimalStation = stations.reduce((acc, [x2, y2, reach]) => {

        const power = stationPower(reach, calcEuclideanDistance({x1, y1}, {x2, y2}))

        if (acc["power"] > power) return acc

        return { x1, y1, x2, y2, power }

    }, {})

    if (optimalStation["power"] > 0) return successMsg(optimalStation as SucessObj)

    return errorMsg({x1, y1})
}

const stations: LinkStations = [[0, 0, 10], [20, 20, 5], [10, 0, 12]]

const createObj = (x1: number, y1: number) => ({x1, y1})

getOptimalStation(createObj(0, 0), stations)
getOptimalStation(createObj(100, 100), stations)
getOptimalStation(createObj(15, 10), stations)
getOptimalStation(createObj(18, 18), stations)