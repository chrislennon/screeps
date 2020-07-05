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

class Harvester extends Creep {
  constructor() {
    const roleName = `harvester`;
    const memory = { testNode: `abc` };
    super(roleName, memory);

    this.size = this.sizes.standard;
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
      else target = creep.room.find(FIND_SOURCES)[1];

      if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: `#ffaa00` } });
      }
    } else {
      if (creep.memory.role == `harvester`)
        creep.memory.dropoff = `5effb887c92744c2f9884259`;
      if (creep.memory.dropoff) target = creep.memory.dropoff;
      if (creep.memory.role == `heavyHarvester`)
        utils.placeInContainer(creep, target, false);
      else utils.placeInContainer(creep, target, true);
    }
  },
};

module.exports = Harvester;
