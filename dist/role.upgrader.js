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

class Upgrader extends Creep {
  constructor(containerId = false) {
    const roleName = `upgrader`;
    const memory = {
      controller: `5bbcacff9099fc012e636715`,
      pickup: containerId,
    };
    super(roleName, memory);
    this.size = this.sizes.heavy;
    this.script = function (creep) {
      if (creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
        creep.memory.upgrading = false;
        creep.say(`🔄 harvest`);
      }
      if (!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
        creep.memory.upgrading = true;
        creep.say(`⚡ upgrade`);
      }

      if (creep.memory.upgrading) {
        if (
          creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE
        ) {
          creep.moveTo(creep.room.controller, {
            visualizePathStyle: { stroke: `#ffffff` },
          });
        }
      } else {
        creep.memory.pickup = `5f00f7fcf440363b29879826`;
        var target = creep.memory.pickup ? creep.memory.pickup : false;
        utils.getFromContainer(creep, target, true);
      }
    };
  }
}

module.exports = Upgrader;
