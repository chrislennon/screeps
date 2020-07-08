function getFromContainer(
  creep,
  containerId = false,
  harvest = false,
  getDropped = false,
  forceFill = false,
) {
  var targets = [];
  if (containerId) {
    if (
      Game.getObjectById(containerId).store.getUsedCapacity(RESOURCE_ENERGY) > 0
    ) {
      targets.push(Game.getObjectById(containerId));
    }
  }

  if (targets.length) {
    // targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: `#ffaa00` } });
    }
  }
  if (!targets.length && harvest) {
    targets = creep.room.find(FIND_SOURCES);
    //targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
    if (creep.harvest(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: `#ffaa00` } });
    }
  }
  if (!targets.length && forceFill) {
    targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          structure.structureType == STRUCTURE_CONTAINER &&
          structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });
    if (creep.withdraw(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: `#ffaa00` } });
    }
  }
  if (!targets.length && getDropped) {
    var tombstone = creep.pos.findClosestByPath(FIND_TOMBSTONES);

    if (tombstone) {
      // creep.say(`❗ TOMB`);
      // console.log(tombstone.store[0]);
      // let stored_resources = _.filter(Object.keys(tombstone), resource => tombstone.store[resource] > 0);
      // console.log(`stored resources ${stored_resources.length}`);
      // if (creep.withdraw(tombstone, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      //   creep.moveTo(tombstone);
      // }
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
}

function placeInContainer(creep, containerId = false, fillHQ = true) {
  var targets = [];
  if (
    containerId &&
    Game.getObjectById(containerId).store.getFreeCapacity(RESOURCE_ENERGY) > 0
  ) {
    creep.say(`cap @ dest`);
    targets.push(Game.getObjectById(containerId));
  }
  if (!targets.length && fillHQ) {
    creep.say(`fillHQ`);
    targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });
  }
  if (!targets.length && !fillHQ) {
    creep.say(`Fill Struct`);
    targets = creep.room.find(FIND_STRUCTURES, {
      filter: structure => {
        return (
          structure.structureType == STRUCTURE_TOWER &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      },
    });
  }
  if (!targets.length) {
    creep.say(`Fill Any`);
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
  }

  if (targets.length) {
    targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
    if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
      creep.moveTo(targets[0], { visualizePathStyle: { stroke: `#ffaa00` } });
    }
  } else {
    creep.say(`IDLE`);
  }
}

module.exports = {
  getFromContainer,
  placeInContainer,
};
