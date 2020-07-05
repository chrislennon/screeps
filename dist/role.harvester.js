const utils = require(`./utils`);
const Creep = require(`creep`);

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
        if (creep.memory.role == `superHarvesterA`) creep.moveTo(4, 35);
        else if (creep.memory.role == `superHarvesterZ`) creep.moveTo(45, 10);
        else
          creep.moveTo(target, { visualizePathStyle: { stroke: `#ffaa00` } });
      }
    } else {
      if (
        creep.memory.role == `heavyHarvester` ||
        creep.memory.role == `heavyHarvesterA` ||
        creep.memory.role == `superHarvesterA` ||
        creep.memory.role == `superHarvesterZ`
      ) {
        utils.placeInContainer(creep, creep.memory.dropoff, false);
      } else {
        utils.placeInContainer(creep, false, true);
      }
    }
  },
};

module.exports = Harvester;
