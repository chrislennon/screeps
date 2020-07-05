const roles = require(`roles`);

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

  var creepRoles = {
    builder: {
      want: 4,
      class: new roles.builder(),
    },
    harvester: {
      want: 6,
      class: new roles.harvester(),
    },
    upgrader: {
      want: 3,
      class: new roles.upgrader(),
    },
    road: {
      want: 0,
      class: new roles.builder(),
    },
    repairer: {
      want: 2,
      class: new roles.repairer(),
    },
    repairerA: {
      want: 2,
      class: new roles.repairer(),
    },
    heavyHarvester: {
      want: 1,
      class: new roles.harvester(
        `heavyHarvester`,
        `5bbcacff9099fc012e636716`,
        `5f00b9bfe62a985f30fb024c`,
      ),
    },
    heavyHarvesterA: {
      want: 3,
      class: new roles.harvester(
        `heavyHarvesterA`,
        `5bbcacff9099fc012e636717`,
        `5effb887c92744c2f9884259`,
      ),
    },
    hauler: {
      want: 3,
      class: new roles.hauler(
        `hauler`,
        `5f00b9bfe62a985f30fb024c`,
        `5f00f7fcf440363b29879826`,
      ),
    },
    haulerA: {
      want: 3,
      class: new roles.hauler(
        `haulerA`,
        `5effb887c92744c2f9884259`,
        `5efb7bee45c0bd352fe9db12`,
      ),
    },
  };

  console.log(
    `-------------------------------------------------------------------`,
  );
  for (var role in creepRoles) {
    console.log(
      role +
        ` - Want: ` +
        creepRoles[role].want +
        ` Have: ` +
        creepRoles[role].class.have,
    );
    if (creepRoles[role].class.have < creepRoles[role].want)
      creepRoles[role].class.spawn();
  }
  console.log(
    `-------------------------------------------------------------------`,
  );

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    try {
      creepRoles[creep.memory.role].class.script(creep);
    } catch (e) {
      console.log(`Do not know the role: ${creep.memory.role}`);
    }
    // if (roles[creep.memory.role]) roles[creep.memory.role].class.script(creep);
    // else console.log(`Do not know the role: ${creep.memory.role}`);
  }
};
