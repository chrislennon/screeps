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

class Builder extends Creep {
  constructor() {
    const roleName = `builder`;
    const memory = { priority: false };
    super(roleName, memory);
    this.size = this.sizes.standard;
    this.script = function (creep) {
      if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.building = false;
        creep.say(`🔄 harvest`);
      }
      if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
        creep.memory.building = true;
        creep.say(`🚧 build`);
      }

      if (creep.memory.building) {
        var targets;

        if (creep.memory.role == `road`) {
          targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        } else {
          targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        }
        creep.memory.priority = false;
        if (creep.memory.priority)
          targets[0] = Game.getObjectById(creep.memory.priority);
        if (targets.length) {
          if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
              visualizePathStyle: { stroke: `#ffffff` },
            });
          }
        }
      } else {
        //var target = creep.memory.pickup ? creep.memory.pickup : false;
        // utils.getFromContainer(creep, target, true);
        utils.getFromContainer(creep, `5effb887c92744c2f9884259`, true);
      }
    };
  }
}

module.exports = Builder;
