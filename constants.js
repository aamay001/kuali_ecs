const DOOR_STATUS = {
  OPEN: true,
  CLOSED: false,
};

const ELEVATOR_STATUS = {
  IN_USE: true,
  VACANT: false,
};

const ELEVATOR_DIRECTION = {
  UP: 2,
  DOWN: 1,
  STOPPED: 0,
};

module.exports = {
  ELEVATOR_DIRECTION,
  ELEVATOR_STATUS,
  DOOR_STATUS,
};
