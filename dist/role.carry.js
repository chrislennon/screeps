const Creep = require(`./creep`);

class Hauler extends Creep {
  constructor(name = `hauler`, from = false, to = false, fillHQ = false, getDropped = false) {
    const roleName = name;
    const memory = { pickup: from, dropoff: to, fillHq: fillHQ, getDropped: getDropped};
    super(roleName, memory);
    this.size = this.sizes.carry;
    this.script = function (creep) {

      var targetId, roam, fillHq, target, getDropped;
      if (creep.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
        // creep.say('IDLE');
        // creep.moveTo(23, 30);

        targetId = creep.memory.pickup ? creep.memory.pickup : false;
        roam = creep.memory.roam ? creep.memory.roam : false;
        getDropped = creep.memory.getDropped
          ? creep.memory.getDropped
          : false;


        target = Game.getObjectById(targetId);
        if (target && target.store.getUsedCapacity(RESOURCE_ENERGY) > 0) {
          if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: `#ffaa00` } });
          } else if (creep.withdraw(target, RESOURCE_ENERGY) != 0) {
            console.log(`creep: ${creep.name} - ${creep.withdraw(target, RESOURCE_ENERGY)}`);
          }
        }

        if (!target && roam) {
          target = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
              return (
                structure.structureType == STRUCTURE_CONTAINER &&
                structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
              );
            },
          });
          if (creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: `#ffaa00` } });
          }
        }
        if (!target && getDropped) {
          var tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES);
          if (tombstone) {
            if (tombstone.store.getUsedCapacity() > 0) {
              creep.say(`❗ T DROP`);
              if (creep.pickup(tombstone) == ERR_NOT_IN_RANGE) {
                creep.moveTo(tombstone);
              }
            }
          } else {
            var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
            if (dropenergy) {
              creep.say(`❗ DROP`);
              if (creep.pickup(dropenergy) == ERR_NOT_IN_RANGE) {
                creep.moveTo(dropenergy);
              }
            }
          }
        }

      } else {
        // creep.say('IDLE');
        // creep.moveTo(23, 30);

        targetId = creep.memory.dropoff ? creep.memory.dropoff : false;
        roam = creep.memory.roam ? creep.memory.roam : false;
        fillHq = creep.memory.fillHq ? creep.memory.fillHq : false;
        target = Game.getObjectById(targetId);

        if (target && target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
          creep.say(`cap @ target`);
          if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target, { visualizePathStyle: { stroke: `#ffaa00` } });
          }
        }

        var targets = [];
        if ((!target || target.store.getFreeCapacity(RESOURCE_ENERGY) > 0) && fillHq) {
          // console.log(`${target} - ${target.store.getFreeCapacity(RESOURCE_ENERGY) > 0} - ${fillHq}`)
          creep.say(`fillHQ`);
          targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
              return (
                (structure.structureType == STRUCTURE_EXTENSION ||
                  structure.structureType == STRUCTURE_SPAWN ||
                  structure.structureType == STRUCTURE_TOWER) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
              );
            },
          });
          if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0], { visualizePathStyle: { stroke: `#ffaa00` } });
          }
        }
        if (!targets.length && roam) {
          creep.say(`Fill Struct`);
          targets = creep.room.find(FIND_STRUCTURES, {
            filter: structure => {
              return (
                (structure.structureType == STRUCTURE_EXTENSION ||
                  structure.structureType == STRUCTURE_SPAWN ||
                  structure.structureType == STRUCTURE_CONTAINER ||
                  structure.structureType == STRUCTURE_TOWER ||
                  structure.structureType == STRUCTURE_STORAGE) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0 &&
                structure.id != creep.memory.dropoff &&
                structure.id != creep.memory.pickup
              );
            },
          });
          if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(target[0], {
              visualizePathStyle: { stroke: `#ffaa00` },
            });
          } else {
            creep.say(`what do`);
          }
        }
      }
    };
  }
}

module.exports = Hauler;
