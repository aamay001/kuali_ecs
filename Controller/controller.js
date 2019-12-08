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
    this.initialize();
  }

  initialize() {
    for(let i = 0; i < this.numElevators; i++) {
      // With multiple elevators, have each elevator start off on each floor.
      this.elevators.push(new Elevator(
        `${this.name}-e${i+1}`,
        this.floorCount,
        Math.min(this.floorCount, i)
      ));
    }
  }

  request(fromFloor, toFloor) {
    console.log(`${this.name}: Requesting elevator from floor ${fromFloor} to floor ${toFloor}`);
    const elevator = this.findBestElevator(fromFloor, toFloor);
    elevator.goToFloor(toFloor);
  }

  findBestElevator(fromFloor, toFloor) {
    const availableElevators = this.elevators.filter(e => !e.stoppedForMaintenance);
    const bestCase = availableElevators.find(e => e.currentFloor === toFloor && e.status === ELEVATOR_DIRECTION.STOPPED);
    if (bestCase) {
      return bestCase;
    }

    // Find best available elvator. Use find array method to query for best case
    // Find any moving elevators heading in the direction that encounter the from and to floor.
    // Filter on unoccupied and sort by closest distance.
  }
}

module.exports = ElevatorController;