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

      var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
        filter: d => {
          return d.resourceType == RESOURCE_ENERGY;
        },
      });

      if (dropenergy && creep.memory.role == `scavenger`) {
        creep.say(`get dropped`);
        if (creep.withdraw(dropenergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          creep.moveTo(dropenergy);
        }
      }


      if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        if (creep.memory.pickup) target = creep.memory.pickup;
        utils.getFromContainer(creep, target, false, true); // carry has no WORK so will not be able to harvest
        // seems to bepicking up and dropping to same containers
      } else {
        if (creep.memory.dropoff) target = creep.memory.dropoff;
        else {
          target = false;
        }
        utils.placeInContainer(creep, target, true);
      }
    };
  }
}

module.exports = Hauler;
