const utils = require(`./utils`);
const Creep = require(`./creep`);

class Builder extends Creep {
  constructor(name = `builder`, focusType = false) {
    const roleName = name;
    const memory = { focus: focusType };
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

      var target;
      if (creep.memory.building) {
        // #1 'Focus' building
        if (creep.memory.focus) {
          target = Game.getObjectById(creep.memory.focus);
        }
        // #2 Other Buildings
        else {
          target = creep.room.find(FIND_CONSTRUCTION_SITES)[0];
        }

        if (creep.build(target) == ERR_NOT_IN_RANGE) {
          creep.moveTo(target, {
            visualizePathStyle: { stroke: `#ffffff` },
          });
        }
      } else {
        creep.memory.pickup = `5f01095e0633715ad0a12e29`;
        target = creep.memory.pickup ? creep.memory.pickup : false;
        utils.getFromContainer(creep, target, true);
      }
    };
  }
}

module.exports = Builder;
