const utils = require(`./utils`);
class Creep {
  constructor(name, memory) {
    this.name = name;
    this.memory = Object.assign({ role: name }, memory);
    this.have = _.sum(Game.creeps, c => c.memory.role == this.name);
    this.spawn = function () {
      Game.spawns[`Spawn1`].spawnCreep(
        this.size,
        this.name + Game.time.toString(),
        { memory: this.memory },
      );
    };
    this.sizes = {
      standard: [WORK, CARRY, MOVE],
      heavy: [WORK, WORK, WORK, WORK, CARRY, MOVE],
      carry: [CARRY, CARRY, MOVE],
    };
  }
}

class Hauler extends Creep {
  constructor(from = false, to = false) {
    const roleName = `hauler`;
    const memory = { pickup: from, dropoff: to };
    super(roleName, memory);
    this.size = this.sizes.carry;
    this.script = function (creep) {
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
          creep.memory.dropoff = `5effb887c92744c2f9884259`;
        else if (creep.memory.role == `carry`)
          creep.memory.dropoff = `5f00f7fcf440363b29879826`;

        if (
          creep.memory.dropoff &&
          Game.getObjectById(creep.memory.dropoff).getFreeCapacity > 0
        )
          target = creep.memory.dropoff;
        else target = false;
        utils.placeInContainer(creep, target, true);
      }
    };
  }
}

module.exports = Hauler;
