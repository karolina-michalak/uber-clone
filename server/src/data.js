const faker = require("faker");
const DATA_LENGTH = 10000;

const data = {};

const spawnData = () => {
  for (let i = 0; i < DATA_LENGTH; i++) {
    const uuid = createUUID();

    data[uuid] = {
      id: uuid,
      name: faker.fake(
        `{{name.firstName}} {{name.lastName}}: {{vehicle.vehicle}} {{vehicle.manufacturer}} {{vehicle.model}}`
      ),
      long: Number(randomNumber(18.23, 18.65).toFixed(4)),
      lat: Number(randomNumber(54.24, 54.59).toFixed(4)),
    };
  }
};

const createUUID = () =>
  "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const randomNumber = (min, max) => Math.random() * (max - min) + min;

const getData = () => data;

const updateDataOnIndexes = (indexesToUpdate) => {
  const allVehicleIds = Object.keys(getData());

  const idsOfVehiclesToUpdate = indexesToUpdate.map(
    index => allVehicleIds[index]
  );

  return idsOfVehiclesToUpdate.reduce((acc, next) => {
    acc[next] = {
      ...data[next],
      long: Number(randomNumber(18.23, 18.65).toFixed(4)),
      lat: Number(randomNumber(54.24, 54.59).toFixed(4)),
    };
    return acc;
  }, {});
};

module.exports = {
  spawnData,
  getData,
  randomNumber,
  DATA_LENGTH,
  updateDataOnIndexes,
};
