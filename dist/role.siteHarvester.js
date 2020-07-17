const utils = require(`./utils`);
const Creep = require(`./creep`);

class SiteHarvester extends Creep {
  constructor(name, size) {
    const memory = { site: name };
    super(name, memory);

    this.size = this.sizes[size];

    this.script = function (creep) {
      roleDedicatedHarvester.run(creep);
    };
  }
}

var roleDedicatedHarvester = {
  /** @param {Creep} creep **/
  run: function (creep) {
    var targets;
    if (creep.store.getFreeCapacity() > 0) {
      targets = creep.room.find(FIND_SOURCES);

      targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
      if (creep.harvest(targets[0]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(Game.flags[creep.memory.site], {
          visualizePathStyle: { stroke: `#ffaa00` },
        });
      }
    } else {
      targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            structure.structureType == STRUCTURE_LINK ||
            structure.structureType == STRUCTURE_CONTAINER
          );
        },
      });

      targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
      if (targets.length) {
        if (targets[0].store) {
          if (targets[0].store.getFreeCapacity(RESOURCE_ENERGY) > 0) {
            utils.placeInContainer(creep, targets[0].id, true);
          }
        }
      }
      // JUST IDLE IN SPOT 🤞🏻
    }
  },
};

module.exports = SiteHarvester;
