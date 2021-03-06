const Creep = require(`./creep`);

class Harvester extends Creep {
  constructor(name = `harvester`, nodeId = false, containerId = false) {
    const memory = { node: nodeId, dropoff: containerId };
    super(name, memory);

    this.size =
      name == `heavyHarvester` || name == `heavyHarvesterA`
        ? this.sizes.heavy
        : this.sizes.standard;
    if (name == `superHarvesterA` || name == `superHarvesterZ`) {
      this.size = this.sizes.superheavy;
    }
    this.script = function (creep) {
      roleHarvester.run(creep);
    };
    this.spawn = function () {
      Game.spawns[`Spawn2`].spawnCreep(
        this.size,
        this.name + Game.time.toString(),
        { memory: this.memory },
      );
    };
  }
}

var roleHarvester = {
  /** @param {Creep} creep **/
  run: function (creep) {
    var target;

    if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.building = false;
      creep.say(`🔄 harvest`);
    }
    if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
      creep.memory.building = true;
      creep.say(`🚧 build`);
    }

    // console.log(creep.memory.building);

    if (creep.memory.building) {
      var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      targets = _.sortBy(targets, s => creep.pos.getRangeTo(s));
      target = targets[0];
      if (creep.build(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, {
          visualizePathStyle: { stroke: `#ffffff` },
        });
      }
    } else {
      if (creep.memory.node) target = Game.getObjectById(creep.memory.node);
      else target = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

      if (creep.harvest(target) == ERR_NOT_IN_RANGE) {
        creep.moveTo(target, { visualizePathStyle: { stroke: `#ffaa00` } });
      }
    }
  },
};

module.exports = Harvester;
