const utils = require(`./utils`);
const Creep = require(`creep`);

class Repairer extends Creep {
  constructor() {
    const roleName = `repairer`;
    const memory = { pickup: false, focus: false };
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
        if (creep.memory.role == `repairerA`) {
          targets = creep.room.find(FIND_STRUCTURES, {
            filter: object =>
              object.hits < object.hitsMax &&
              object.structureType == STRUCTURE_CONTAINER,
          });
          if (!targets.length)
            targets = creep.room.find(FIND_STRUCTURES, {
              filter: object =>
                object.hits < object.hitsMax &&
                !(
                  object.structureType == STRUCTURE_WALL ||
                  object.structureType == STRUCTURE_RAMPART
                ),
            });
        } else {
          targets = creep.room.find(FIND_STRUCTURES, {
            filter: object =>
              object.hits < object.hitsMax &&
              !(
                object.structureType == STRUCTURE_WALL ||
                object.structureType == STRUCTURE_RAMPART
              ),
          });
        }
        targets.sort((a, b) => a.hits - b.hits);
        if (targets.length) {
          if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], {
              visualizePathStyle: { stroke: `#ffffff` },
            });
            creep.say(`🚧 repair`);
          }
        }
      } else {
        var target = creep.memory.pickup ? creep.memory.pickup : false;
        utils.getFromContainer(creep, target, true);
      }
    };
  }
}

module.exports = Repairer;
