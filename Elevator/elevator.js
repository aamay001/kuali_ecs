const {
  DOOR_STATUS,
  ELEVATOR_DIRECTION,
  ELEVATOR_STATUS,
} = require('../constants');

/**
 * @name Elevator
 * @description Elevator class.
 * @param {string} elevatorId Unique identifier
 * @param {number} numFloors Total number of floors in elevator system.
 * @param {number} startFloor Starting floor.
 */
class Elevator {
  constructor(elevatorId, numFloors, startFloor = 1) {
    this.id = elevatorId;
    this.direction = ELEVATOR_DIRECTION.UP;
    this.trips = 0;
    this.floorsPassed = 0;
    this.stoppedForMaintenance = false;
    this.maxFloor = numFloors;
    this.currentFloor = startFloor;
    this.reportFloor();
    this.openDoor();
    this.setStatus(ELEVATOR_STATUS.VACANT);
  }

  reportFloor() {
    console.log(`${this.id} : Current floor ${this.currentFloor}`);
    this.floorsPassed++;
  }

  openDoor() {
    this.doorState = DOOR_STATUS.OPEN;
    console.log(`${this.id} : Door opened`);
  }

  closeDoor() {
    this.doorState = DOOR_STATUS.CLOSED;
    console.log(`${this.id} : Door closed`);
  }

  setDirection(direction) {
    this.direction = direction;
    let desc = 'stopped';
    if (direction === ELEVATOR_DIRECTION.UP) {
      desc = 'going up';
    } else if (direction === ELEVATOR_DIRECTION.DOWN) {
      desc = 'going down';
    }
    console.log(`${this.id} : Elevator is ${desc}`);
  }

  logTrip(from, to, timeStart, timeEnd) {
    this.trips++;
    // If logging to a db, include all meta
    if (this.trips >= 0) {
      this.stoppedForMaintenance = true;
    }
  }

  performMaintenance() {
    this.trips = 0;
    this.stoppedForMaintenance = false;
  }

  goToFloor(floor) {
    if (this.doorState === DOOR_STATUS.OPEN) {
      this.closeDoor();
    }
    if (floor > this.currentFloor) {
      this.setDirection(ELEVATOR_DIRECTION.UP);
    } else if (floor < this.currentFloor) {
      this.setDirection(ELEVATOR_DIRECTION.DOWN);
    } else if (floor === this.currentFloor) {
      this.setDirection(ELEVATOR_DIRECTION.STOPPED);
    }
    while (this.currentFloor !== floor) {
      this.moveToFloor(floor);
    }
    this.logTrip();
    this.openDoor();
  }

  moveToFloor(floor) {
    if (floor < this.currentFloor) {
      this.currentFloor = Math.max(1, this.currentFloor - 1);
    } else if (floor > this.currentFloor) {
      this.currentFloor = Math.min(this.maxFloor, this.currentFloor + 1);
    }
    this.reportFloor();
  }

  setStatus(status) {
    this.status = status;
    console.log(`${this.id} : Elevator ${status ? 'in use' : 'vacant'}`);
  }

  userRequest(floor) {
    this.setStatus(ELEVATOR_STATUS.IN_USE);
    this.goToFloor(floor);
    this.setStatus(ELEVATOR_STATUS.VACANT);
  }
}

module.exports = Elevator;
