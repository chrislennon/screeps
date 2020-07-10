const roles = require(`roles`);

module.exports.loop = function () {
  if (Game.cpu.bucket > 5000) Game.cpu.generatePixel();

  var tower = Game.getObjectById(`5efe2c0c640121b6c12e98a6`);
  if (tower) {
    var closestDamagedStructure = false;
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    } else {
      var healWalls = Memory.healWalls ? Memory.healWalls : false;
      if (healWalls) {
        closestDamagedStructure = tower.pos.findClosestByRange(
          FIND_STRUCTURES,
          {
            filter: structure => structure.hits < structure.hitsMax,
          },
        );
        if (closestDamagedStructure) {
          tower.repair(closestDamagedStructure);
        }
      } else {
        closestDamagedStructure = tower.pos.findClosestByRange(
          FIND_STRUCTURES,
          {
            filter: structure =>
              structure.hits < structure.hitsMax &&
              structure.structureType != STRUCTURE_WALL &&
              structure.structureType != STRUCTURE_RAMPART,
          },
        );
        if (closestDamagedStructure) {
          tower.repair(closestDamagedStructure);
        }
      }
    }
  }

  var creepRoles = {
    harvester: {
      want: 0,
      class: new roles.harvester(
        `harvester`,
        `5bbcacff9099fc012e636717`,
        `5f04f184227da595c15d14f8`,
      ),
    },
    superHarvesterA: {
      want: 0,
      class: new roles.harvester(
        `superHarvesterA`,
        `5bbcacff9099fc012e636717`,
        `5f04f184227da595c15d14f8`,
      ),
    },
    builder: {
      want: 2,
      class: new roles.builder(`builder`, false, `5f028050541ecf6abe209242`),
    },
    upgrader: {
      want: 2,
      class: new roles.upgrader(`5f00f7fcf440363b29879826`),
    },
    road: {
      want: 0,
      class: new roles.builder(),
    },
    repairer: {
      want: 0,
      class: new roles.repairer(`repairer`, false, `5f00b9bfe62a985f30fb024c`),
    },
    repairerA: {
      want: 0,
      class: new roles.repairer(`repairerA`, STRUCTURE_CONTAINER),
    },
    heavyHarvester: {
      want: 0,
      class: new roles.harvester(
        `heavyHarvester`,
        `5bbcacff9099fc012e636717`,
        `5f04f184227da595c15d14f8`,
      ),
    },
    heavyHarvesterA: {
      want: 0,
      class: new roles.harvester(
        `heavyHarvesterA`,
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
      want: 4,
      class: new roles.hauler(
        `haulerA`,
        `5f04f184227da595c15d14f8`,
        `5f028050541ecf6abe209242`,
      ),
    },
    haulerBase: {
      want: 1,
      class: new roles.hauler(
        `haulerBase`,
        `5f028050541ecf6abe209242`,
        false,
        true,
      ),
    },
    scavenger: {
      want: 1,
      class: new roles.hauler(`scavenger`),
    },
    attacker: {
      want: 0,
      class: new roles.attacker(`attacker`),
    },
    superHarvesterZ: {
      want: 1,
      class: new roles.harvester(
        `superHarvesterZ`,
        `5bbcacff9099fc012e636716`,
        `5f00b9bfe62a985f30fb024c`,
      ),
    },
    SiteA: {
      want: 1,
      class: new roles.siteHarvester(`SiteA`, `standard`),
    },
    SiteB: {
      want: 1,
      class: new roles.siteHarvester(`SiteB`, `superheavy`),
    },
    SiteC: {
      want: 1,
      class: new roles.siteHarvester(`SiteC`, `heavy`),
    },
  };

  var i = 0;
  var x = 45;
  var y = 38;
  new RoomVisual(`E1S25`).text(`💥💥💥`, x, y + i, {
    color: `green`,
    font: 0.8,
  });
  i++;
  for (var role in creepRoles) {
    if (creepRoles[role].want) {
      var color =
        creepRoles[role].class.have < creepRoles[role].want ? `red` : `green`;
      new RoomVisual(`E1S25`).text(
        role +
          ` - ` +
          creepRoles[role].class.have +
          ` / ` +
          creepRoles[role].want,
        x,
        y + i,
        { color: color, font: 0.8 },
      );
      i++;
    }
    if (creepRoles[role].class.have < creepRoles[role].want) {
      creepRoles[role].class.spawn();
    }
  }
  new RoomVisual(`E1S25`).text(`💥💥💥`, x, y + i, {
    color: `green`,
    font: 0.8,
  });

  for (var name in Game.creeps) {
    var creep = Game.creeps[name];

    try {
      creepRoles[creep.memory.role].class.script(creep);
    } catch (e) {
      console.log(e);
      console.log(`Do not know the role: ${creep.memory.role}`);
    }
  }
};
