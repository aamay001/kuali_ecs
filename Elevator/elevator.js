import {
  DOOR_STATUS,
  ELEVATOR_DIRECTION,
  ELEVATOR_STATUS,
} from '../constants';

/**
 * @name Elevator
 * @description Elevator class.
 */
class Elevator {
  constructor(elevatorId, numFloors, startFloor = 1) {
    this.id = elevatorId;
    this.doorState = DOOR_STATUS.CLOSED;
    this.status = ELEVATOR_STATUS.VACANT;
    this.direction = ELEVATOR_DIRECTION.UP;
    this.trips = 0;
    this.floorsPassed = 0;
    this.stoppedForMaintenance = false;
    this.maxFloor = numFloors;
    this.currentFloor = startFloor;
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
  }

  logTrip(from, to, timeStart, timeEnd) {
    this.trips++;
    // If logging to a db, include all meta
    if (trips >= 0) {
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
      if (floor > this.currentFloor) {
        this.currentFloor = Math.max(1, this.currentFloor - 1);
      } else if (floor > this.currentFloor) {
        this.currentFloor = Math.min(this.maxFloor, this.currentFloor + 1);
      }
      this.reportFloor();
    }
}