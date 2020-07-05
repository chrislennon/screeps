const utils = require(`./utils`);

var roleCarry = {
  /** @param {Creep} creep **/
  run: function (creep) {
    // if (creep.toString().includes('carryA')) {
    //     console.log(`setting ${creep} from ${creep.memory.role} to carryA`);
    //     creep.memory.role = 'carryA';

    // }
    // else {
    //     console.log(`setting ${creep} from ${creep.memory.role} to carry`);
    //     creep.memory.role = 'carry';
    // }
    var target;
    if (creep.store.getFreeCapacity() > 0) {
      if (creep.memory.role == `carryA`)
        creep.memory.pickup = `5effb887c92744c2f9884259`;
      else if (creep.memory.role == `carry`)
        creep.memory.pickup = `5f00b9bfe62a985f30fb024c`;
      if (creep.memory.pickup) target = creep.memory.pickup;

      utils.getFromContainer(creep, target, true); // carry has no WORK so will not be able to harvest
      // seems to bepicking up and dropping to same containers
    } else {
      if (creep.memory.role == `carryA`)
        creep.memory.pickup = `5effb887c92744c2f9884259`;
      else if (creep.memory.role == `carry`)
        creep.memory.pickup = `5f00f7fcf440363b29879826`;

      if (creep.memory.dropoff) target = creep.memory.dropoff;
      utils.placeInContainer(creep, target, true);
    }
  },
};

module.exports = roleCarry;
