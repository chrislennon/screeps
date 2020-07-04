// repairer
// get from (any) container , fall back to harvest (could be bad)

// dedicated upgrader
// get from specific cotainer

// builder
// get from (any) container,  fall back to harvest (could be bad)

function getFromContainer(creep, containerId = false, harvest = false) {
  var targets = [];
  if (containerId) {
    if (Game.getObjectById(containerId).store.getUsedCapacity(
        RESOURCE_ENERGY
      ) > 0) {
      targets.push(Game.getObjectById(containerId));
    } else {
      targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
          return (
            structure.structureType == STRUCTURE_CONTAINER &&
            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
          );
        },
      });
    }
  }

  if (targets.length) {
    var x = 0;
    // targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
    if (creep.withdraw(targets[x], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[x], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  } else if (harvest) {
    targets = creep.room.find(FIND_SOURCES);
    //targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
    var x = 0;
    if (creep.harvest(targets[x], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[x], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  } else {
    creep.say("I am IDLE");
    creep.moveTo(18, 32);
  }
}

function placeInContainer(creep, containerId = false, fillHQ = true) {
  var targets = [];
  if (containerId) targets.push(Game.getObjectById(containerId));
  else if (fillHQ)
    targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });
  else
    targets = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (
          structure.structureType == STRUCTURE_CONTAINER &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });

  if (targets.length) {
    var x = 0;
    targets = _.sortBy(targets, (s) => creep.pos.getRangeTo(s));
    if (creep.transfer(targets[x], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[x], { visualizePathStyle: { stroke: "#ffaa00" } });
    }
  }
}

module.exports = {
  getFromContainer,
  placeInContainer,
};