const utils = require(`./utils`);
const Creep = require(`./creep`);

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
        var target = creep.memory.pickup ? creep.memory.pickup : false;
        utils.getFromContainer(creep, target, true);
      }
    };
  }
}

module.exports = Upgrader;
