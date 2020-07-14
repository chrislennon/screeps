const utils = require(`./utils`);
const Creep = require(`./creep`);

class Harvester extends Creep {
  constructor(name = `harvester`, nodeId = false, containerId = false) {
    const memory = { node: nodeId, dropoff: containerId };
    super(name, memory);

    this.size =
      name == `heavyHarvester` || name == `heavyHarvesterA`
        ? this.sizes.heavy
        : this.sizes.standard;
    if (name == `superHarvesterA` || name == `superHarvesterZ`) {
      this.size = this.sizes.superheavy;
    }
    this.script = function (creep) {
      roleHarvester.run(creep);
    };
  }
}

var roleHarvester = {
  /** @param {Creep} creep **/
  run: function (creep) {
    var target;
    if (creep.store.getFreeCapacity() > 0) {
      if (creep.memory.node) target = Game.getObjectById(creep.memory.node);
      else target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
      
      if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: `#ffaa00` } });
      }
    } else {
      if (
        creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
      ) {
        creep.moveTo(creep.room.controller, {
          visualizePathStyle: { stroke: `#ffffff` },
        });
      }
    }
  }
};

module.exports = Harvester;
