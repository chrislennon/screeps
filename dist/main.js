const rolesL = require(`roles`);

module.exports.loop = function () {
  // var tower = Game.getObjectById('3708c5cfa3ed1195707528b9');
  // if(tower) {
  //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //         filter: (structure) => structure.hits < structure.hitsMax
  //     });
  //     if(closestDamagedStructure) {
  //         tower.repair(closestDamagedStructure);
  //     }

  //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //     if(closestHostile) {
  //         tower.attack(closestHostile);
  //     }
  // }

  var roles = {
    builder: {
      want: 4,
      class: new rolesL.builder(),
    },
    harvester: {
      want: 4,
      class: new rolesL.harvester(),
    },
    upgrader: {
      want: 3,
      class: new rolesL.upgrader(),
    },
    road: {
      want: 0,
      class: new rolesL.builder(),
    },
    repairer: {
      want: 2,
      class: new rolesL.repairer(),
    },
    repairerA: {
      want: 2,
      class: new rolesL.repairer(),
    },
    heavyHarvester: {
      want: 1,
      class: new rolesL.harvester(
        `5bbcacff9099fc012e636716`,
        `5f00b9bfe62a985f30fb024c`,
      ),
    },
    heavyHarvesterA: {
      want: 3,
      class: new rolesL.harvester(
        `5bbcacff9099fc012e636717`,
        `5effb887c92744c2f9884259`,
      ),
    },
    hauler: {
      want: 3,
      class: new rolesL.hauler(
        `5f00b9bfe62a985f30fb024c`,
        `5f00f7fcf440363b29879826`,
      ),
    },
    haulerA: {
      want: 3,
      class: new rolesL.hauler(
        `5effb887c92744c2f9884259`,
        `5efb7bee45c0bd352fe9db12`,
      ),
    },
  };

  console.log(
    `-------------------------------------------------------------------`,
  );
  for (var role in roles) {
    console.log(
      role +
        ` - Want: ` +
        roles[role].want +
        ` Have: ` +
        roles[role].class.have,
    );
    if (roles[role].class.have < roles[role].want) roles[role].class.spawn();
  }
  console.log(
    `-------------------------------------------------------------------`,
  );

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    try {
      roles[creep.memory.role].class.script(creep);
    } catch (e) {
      console.log(`Do not know the role: ${creep.memory.role}`);
    }
    // if (roles[creep.memory.role]) roles[creep.memory.role].class.script(creep);
    // else console.log(`Do not know the role: ${creep.memory.role}`);
  }
};
