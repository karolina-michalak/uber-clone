const { randomNumber, DATA_LENGTH, updateDataOnIndexes } = require("./data");

let timeoutId;

const setupIntervalDataUpdates = (socket) => {
  setTimeoutAndEmitData(socket);

  socket.on('disconnect', () => {
    if(timeoutId){
      clearTimeout(timeoutId);
    }
  });
}

const setTimeoutAndEmitData = (socket) => {
  if(timeoutId){
    clearTimeout(timeoutId);
  };

  timeoutId = setTimeout(() => {
    const updatesNumber = Math.floor(randomNumber(1, 200));
    const updatedIndexes = [];
    for (let i = 0; i < updatesNumber; i++){
      updatedIndexes.push(Math.floor(randomNumber(0, DATA_LENGTH)))
    }

    const updatedData = updateDataOnIndexes(updatedIndexes);

    socket.emit('positionUpdates', updatedData);

    setTimeoutAndEmitData(socket);
  }, randomNumber(2, 8) * 1000);
};

module.exports = {
  setupIntervalDataUpdates,
};