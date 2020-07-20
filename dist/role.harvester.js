const utils = require(`./utils`);
const Creep = require(`./creep`);

class Remote extends Creep {
  constructor(name = `remote`, nodeId = false, containerId = false) {
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
    this.spawn = function () {
      Game.spawns[`Spawn2`].spawnCreep(
        this.size,
        this.name + Game.time.toString(),
        { memory: this.memory },
      );
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
      target = creep.memory.dropoff ? creep.memory.dropoff : false;
      if (
        creep.memory.role == `heavyHarvester` ||
        creep.memory.role == `heavyHarvesterA` ||
        creep.memory.role == `superHarvesterA` ||
        creep.memory.role == `superHarvesterZ`
      ) {
        utils.placeInContainer(creep, creep.memory.dropoff, false);
      } else {
        utils.placeInContainer(creep, target, true);
      }
    }
  },
};

module.exports = Remote;
