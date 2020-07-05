const roles = require(`roles`);

module.exports.loop = function () {
  var tower = Game.getObjectById(`5efe2c0c640121b6c12e98a6`);
  if (tower) {
    var closestDamagedStructure = tower.pos.findClosestByRange(
      FIND_STRUCTURES,
      {
        filter: structure => structure.hits < structure.hitsMax,
      },
    );
    if (closestDamagedStructure) {
      tower.repair(closestDamagedStructure);
    }

    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    }
  }

  var creepRoles = {
    harvester: {
      want: 4,
      class: new roles.harvester(
        `harvester`,
        `5bbcacff9099fc012e636717`,
        `5effb887c92744c2f9884259`,
      ),
    },
    builder: {
      want: 4,
      class: new roles.builder(),
    },
    upgrader: {
      want: 1,
      class: new roles.upgrader(),
    },
    road: {
      want: 0,
      class: new roles.builder(),
    },
    repairer: {
      want: 1,
      class: new roles.repairer(),
    },
    repairerA: {
      want: 1,
      class: new roles.repairer(`repairerA`, STRUCTURE_CONTAINER),
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
    superHarvesterA: {
      want: 1,
      class: new roles.harvester(
        `superHarvesterA`,
        `5bbcacff9099fc012e636717`,
        `5effb887c92744c2f9884259`,
      ),
    },
    superHarvesterZ: {
      want: 1,
      class: new roles.harvester(
        `superHarvesterZ`,
        `5bbcacff9099fc012e636716`,
        `5f00b9bfe62a985f30fb024c`,
      ),
    },
    hauler: {
      want: 2,
      class: new roles.hauler(
        `hauler`,
        `5f00b9bfe62a985f30fb024c`,
        `5f00f7fcf440363b29879826`,
      ),
    },
    haulerA: {
      want: 2,
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
    if (creepRoles[role].class.have < creepRoles[role].want) {
      console.log(`spawining ${role}`);
      creepRoles[role].class.spawn();
    }
  }
  console.log(
    `-------------------------------------------------------------------`,
  );

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    // if (name == `heavyHarvester19604326`) {
    //   creep.say(`test`);
    //   console.log(creep.pos.x, creep.pos.y);
    //   console.log(`harrvester ${!(creep.memory.role == `superHarvesterA`)}`);
    //   console.log(`x: ${creep.pos.x == 5}`);
    //   console.log(`y: ${creep.pos.y == 35}`);
    // }

    // if (!(creep.memory.role == `superHarvesterA`) && creep.pos.x == 5 && creep.pos.y == 35) {
    //   creep.say(`Im moving!`);
    //   console.log(`I'm moving`);
    //   creep.moveTo(5,33);
    // }

    try {
      creepRoles[creep.memory.role].class.script(creep);
    } catch (e) {
      console.log(e);
      console.log(`Do not know the role: ${creep.memory.role}`);
    }
  }
};
