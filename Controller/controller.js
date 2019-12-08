const Elevator = require('../Elevator');
const {
  DOOR_STATUS,
  ELEVATOR_DIRECTION,
  ELEVATOR_STATUS,
} = require('../constants');

class ElevatorController {
  // requirement 1
  constructor(systemName, elevatorCount = 1, numFloors = 1) {
    this.name = systemName;
    this.numElevators = elevatorCount;
    this.floorCount = numFloors;
    this.elevators = [];
  }

  initialize() {
    for(let i = 0; i < elevatorCount; i++) {
      // With multiple elevators, have each elevator start off on each floor.
      this.elevators.push(new Elevator(
        `${this.systemName}-${i}`,
        this.floorCount,
        Math.min(this.floorCount, i)
      );
    }
  }

  request(fromFloor, toFloor) {

  }

  findAvailableElevator(fromFloor, toFloor) {

  }
}

module.exports = ElevatorController;