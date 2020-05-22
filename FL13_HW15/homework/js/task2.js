const OVERHEAT_OFFSET = 30;
const SPEED_CHANGE_VALUE = 20;
const SPEEDUP_INTERVAL = 2000;
const SLOWDOWN_INTERVAL = 1500;
const SLOWDOWN_DIRECTION = -1;

function Vehicle(color, engine) {
  this.engine = engine;
  this.color = color;
  this.maxSpeed = 70;
  this.model = 'unknown model';
  this.speed = 0;
  this.vehicleType = 'Vehicle';
  this.maxDriveSpeed = 0;
  this.engineIsOn = null;
  this.speedChangeValue = 0;
}

Vehicle.prototype.getInfo = function () {
  return { engine: this.engine, color: this.color, maxSpeed: this.maxSpeed, model: this.model };
};

Vehicle.prototype.upgradeEngine = function (newEngine, newMaxSpeed) {
  if (!this.speed) {
    this.engine = newEngine;
    this.maxSpeed = newMaxSpeed;
  }
};

Vehicle.prototype.drive = function () {
  if (!this.engineIsOn) {
    this.maxDriveSpeed = 0;
  }
  this.startChangingProcess(1);
};

Vehicle.prototype.stop = function () {
  if (this.engineIsOn) {
    this.maxDriveSpeed = Math.max(this.maxDriveSpeed, this.speed);
    this.startChangingProcess(SLOWDOWN_DIRECTION);
  } else {
    this.stoppedMessage();
  }
};

Vehicle.prototype.stoppedMessage = function () {
  console.log(`${this.vehicleType} is stopped. Maximum speed during the drive was ${this.maxDriveSpeed}`);
};

Vehicle.prototype.startChangingProcess = function (direction) {
  if (Math.sign(this.speedChangeValue) === direction) {
    console.log(`Already ${direction > 0 ? 'driving' : 'slows down'}`);
  } else {
    if (this.engineIsOn) {
      clearInterval(this.engineIsOn);
    }
    this.speedChangeValue = direction * SPEED_CHANGE_VALUE;
    this.engineIsOn = setInterval(() => this.onTimer(), direction > 0 ? SPEEDUP_INTERVAL : SLOWDOWN_INTERVAL);
  }
};

Vehicle.prototype.onTimer = function () {
  this.speed = Math.max(0, this.speed + this.speedChangeValue);
  console.log(this.speed);
  this.speedChangeValue > 0 ? this.driveUp() : this.slowDown();
};

Vehicle.prototype.driveUp = function () {
  if (this.speed >= this.maxSpeed) {
    console.log('speed is too high, SLOW DOWN!');
  }
};

Vehicle.prototype.slowDown = function () {
  if (!this.speed) {
    clearInterval(this.engineIsOn);
    this.engineIsOn = null;
    this.speedChangeValue = 0;
    this.stoppedMessage();
  }
};

function Car(model, color, engine) {
  Vehicle.call(this, color, engine);
  this.maxSpeed = 80;
  this.vehicleType = 'Car';
  this.model = model;
  this.color = color;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.stoppedMessage = function () {
  console.log(`${this.vehicleType} ${this.model} is stopped. Maximum speed during the drive was ${this.maxDriveSpeed}`);
};

Car.prototype.changeColor = function (newColor) {
  if (newColor === this.color) {
    console.log('The selected color is the same as the previous, please choose another one');
  } else {
    this.color = newColor;
  }
};

function Motorcycle(model, color, engine) {
  Car.call(this, model, color, engine);
  this.maxSpeed = 90;
  this.vehicleType = 'Motorcycle';
}

Motorcycle.prototype = Object.create(Car.prototype);
Motorcycle.prototype.constructor = Motorcycle;
Motorcycle.prototype.changeColor = undefined;

Motorcycle.prototype.drive = function () {
  console.log("Let's drive");
  Car.prototype.drive.call(this);
};

Motorcycle.prototype.driveUp = function () {
  Car.prototype.driveUp.call(this);
  if (this.speed > this.maxSpeed + OVERHEAT_OFFSET) {
    console.log('Engine overheating');
    this.stop();
  }
};

Motorcycle.prototype.stoppedMessage = function () {
  console.log(`${this.vehicleType} ${this.model} is stopped. Good drive`);
};
