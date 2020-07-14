const Creep = require(`./creep`);

class Colony extends Creep {
  constructor(name = `attacker`) {
    const memory = {};
    super(name, memory);

    this.size = this.sizes.standard;
    this.script = function (creep) {
      //creep.moveTo(21,31);
    };
  }
}

module.exports = Colony;
