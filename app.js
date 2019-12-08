const ElevatorController = require('./Controller');

const System = new ElevatorController('KUALI', 5, 10);

System.elevators[0].goToFloor(10);
System.elevators[1].goToFloor(10);
System.elevators[2].goToFloor(10);
System.elevators[3].goToFloor(10);
System.request(2, 5);