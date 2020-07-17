const Creep = require(`./creep`);

class Colony extends Creep {
  constructor(name = `attacker`) {
    const memory = {};
    super(name, memory);

    this.size = this.sizes.standard;
    this.script = function (creep) {
      console.log(creep);
    };
  }
}

module.exports = Colony;
