const utils = require(`./utils`);
const Creep = require(`./creep`);

class Upgrader extends Creep {
  constructor(name=`upgrader`, containerId = false) {
    const roleName = name;
    const memory = {
      pickup: containerId,
    };
    super(roleName, memory);
    this.size = this.sizes.standard;
    this.spawn = function () {
      Game.spawns[`Spawn2`].spawnCreep(
        this.size,
        this.name + Game.time.toString(),
        { memory: this.memory },
      );
    };
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
        var target = creep.memory.pickup ? creep.memory.pickup : false;
        utils.getFromContainer(creep, target, false);
      }
    };
  }
}

module.exports = Upgrader;
