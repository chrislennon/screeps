const utils = require(`./utils`);
const Creep = require(`./creep`);

class Hauler extends Creep {
  constructor(name = `hauler`, from = false, to = false) {
    const roleName = name;
    const memory = { pickup: from, dropoff: to };
    super(roleName, memory);
    this.size = this.sizes.carry;
    this.script = function (creep) {
      var target;
      //console.log(creep)
      if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.memory.pickup) {
          target = Game.getObjectById(creep.memory.pickup);
          if (target && target.store) {
            if (target.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
              //console.log('xx')
              utils.getFromContainer(
                creep,
                creep.memory.pickup,
                false,
                false,
                false,
              );
            } else {
              utils.getFromContainer(creep, false, false, false, false);
            }
          } else {
            utils.getFromContainer(creep, false, false, true, false);
          }
        }
      } else {
        target = Game.getObjectById(creep.memory.dropoff);
        if (target && target.store) {
          if (target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            utils.placeInContainer(creep, creep.memory.dropoff, false);
          } else {
            utils.placeInContainer(creep, false, false);
          }
        } else {
          utils.placeInContainer(creep, false, false);
        }
      }
    };
  }
}

module.exports = Hauler;
