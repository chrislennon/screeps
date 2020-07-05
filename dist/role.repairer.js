const utils = require(`./utils`);
const Creep = require(`creep`);

class Repairer extends Creep {
  constructor(name = `repairer`, focusType = false) {
    const roleName = name;
    const memory = { pickup: false, focus: focusType };
    super(roleName, memory);
    this.size = this.sizes.standard;
    this.script = function (creep) {
      if (creep.memory.repairing && creep.carry.energy == 0) {
        creep.memory.repairing = false;
        creep.say(`🔄 R: Hrv`);
      } else if (
        !creep.memory.repairing &&
        creep.carry.energy < creep.carryCapacity
      ) {
        creep.memory.repairing = false;
        creep.say(`⛏ R: Hrv`);
      } else if (
        !creep.memory.repairing &&
        creep.carry.energy == creep.carryCapacity
      ) {
        creep.memory.repairing = true;
        creep.say(`🚧 repair`);
      }

      if (creep.memory.repairing) {
        var targets;
        // #1 'Focus' building
        if (creep.memory.focus) {
          targets = creep.room.find(FIND_STRUCTURES, {
            filter: object =>
              object.hits < object.hitsMax &&
              object.structureType == creep.memory.focus,
          });
        }
        // #2 Other buildings - No roads, Walls
        else {
          targets = creep.room.find(FIND_STRUCTURES, {
            filter: object =>
              object.hits < object.hitsMax &&
              !(
                object.structureType == STRUCTURE_WALL ||
                object.structureType == STRUCTURE_RAMPART
              ),
          });
          // #3 All other buildinds
          if (!targets.length) {
            targets = creep.room.find(FIND_STRUCTURES, {
              filter: object => object.hits < object.hitsMax,
            });
          }
        }

        if (targets.length) {
          if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
              visualizePathStyle: { stroke: `#ffffff` },
            });
            creep.say(`🚧 repair`);
          }
        } else {
          creep.say(`🚫 Repair`);
        }
      } else {
        var target = creep.memory.pickup ? creep.memory.pickup : false;
        utils.getFromContainer(creep, target, true);
      }
    };
  }
}

module.exports = Repairer;
