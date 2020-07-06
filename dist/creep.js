class Creep {
  constructor(name, memory) {
    this.name = name;
    this.memory = Object.assign({ role: name }, memory);
    this.have = _.sum(
      Game.creeps,
      c => c.memory.role == this.name && c.ticksToLive > 100,
    );
    this.spawn = function () {
      Game.spawns[`Spawn1`].spawnCreep(
        this.size,
        this.name + Game.time.toString(),
        { memory: this.memory },
      );
    };
    this.sizes = {
      standard: [WORK, CARRY, MOVE],
      heavy: [WORK, WORK, WORK, WORK, CARRY, MOVE],
      superheavy: [WORK, WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE],
      carry: [CARRY, CARRY, MOVE],
      attack: [TOUGH, TOUGH, MOVE, MOVE, MOVE, ATTACK],
    };
  }
}

module.exports = Creep;
