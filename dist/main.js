const roles = require(`roles`);

module.exports.loop = function () {
  // if (Game.cpu.bucket > 5000) Game.cpu.generatePixel();

  var tower = Game.getObjectById(`5efe2c0c640121b6c12e98a6`);
  if (tower) {
    var closestDamagedStructure = false;
    var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (closestHostile) {
      tower.attack(closestHostile);
    } else {
      var healWalls = Memory.healWalls ? Memory.healWalls : false;
      // Memory is apparently strings 🤷‍♂️ - Lots of TODOs from this.
      if (healWalls === `true`) {
        closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {
          filter: structure => structure.hits < structure.hitsMax,
        });
        if (closestDamagedStructure.length) {
          closestDamagedStructure = _.sortBy(
            closestDamagedStructure,
            s => s.hits,
          );
          tower.repair(closestDamagedStructure[0]);
        }
      } else {
        closestDamagedStructure = tower.room.find(FIND_STRUCTURES, {
          filter: structure =>
            structure.hits < structure.hitsMax &&
            structure.structureType != STRUCTURE_WALL &&
            structure.structureType != STRUCTURE_RAMPART,
        });
        if (closestDamagedStructure.length) {
          tower.repair(closestDamagedStructure[0]);
        }
      }
    }
  }

  var link = Game.getObjectById(`5f089f8eb0ab38329161a05a`);
  var linkDest = Game.getObjectById(`5f08801e025bfc410887c361`);
  if (link) {
    link.transferEnergy(linkDest);
  }

  var creepRoles = {
    remote: {
      want: 3,
      class: new roles.remote(`remote`, `5bbcad0d9099fc012e6368a1`),
    },
    colony: {
      want: 0,
      class: new roles.colony(),
    },
    builder: {
      want: 2,
      class: new roles.builder(`builder`, false, `5f028050541ecf6abe209242`),
    },
    remoteHarv: {
      want: 2,
      class: new roles.harvester(`remoteHarv`, `5bbcad0d9099fc012e6368a1`, false),
    },
    remoteBuilder: {
      want: 1,
      class: new roles.remoteBuilder(
        `remoteBuilder`,
        `5bbcad0d9099fc012e6368a1`,
      ),
    },
    upgrader: {
      want: 2,
      class: new roles.upgrader(`5f00f7fcf440363b29879826`),
    },
    hauler: {
      want: 5,
      class: new roles.hauler(
        `hauler`,
        `5f00b9bfe62a985f30fb024c`,
        `5f00f7fcf440363b29879826`,
        //false,
        false,
      ),
    },
    haulerBase: {
      want: 2,
      class: new roles.hauler(
        `haulerBase`,
        `5f028050541ecf6abe209242`,
        false,
        true,
      ),
    },
    scavenger: {
      want: 1,
      class: new roles.hauler(`scavenger`, false, false, true, true),
    },
    SiteA: {
      want: 1,
      class: new roles.siteHarvester(`SiteA`, `superheavy`),
    },
    SiteB: {
      want: 1,
      class: new roles.siteHarvester(`SiteB`, `superheavy`),
    },
    haulerLink: {
      want: 1,
      class: new roles.hauler(
        `haulerLink`,
        `5f08801e025bfc410887c361`,
        `5f028050541ecf6abe209242`,
      ),
    },
  };

  // var i = 0;
  // var x = 45;
  // var y = 38;
  // new RoomVisual(`E1S25`).text(`💥💥💥`, x, y + i, {
  //   color: `green`,
  //   font: 0.8,
  // });
  // i++;
  for (var role in creepRoles) {
    // if (creepRoles[role].want) {
    //   var color =
    //     creepRoles[role].class.have < creepRoles[role].want ? `red` : `green`;
    //   new RoomVisual(`E1S25`).text(
    //     role +
    //       ` - ` +
    //       creepRoles[role].class.have +
    //       ` / ` +
    //       creepRoles[role].want,
    //     x,
    //     y + i,
    //     { color: color, font: 0.8 },
    //   );
    //   i++;
    // }
    if (creepRoles[role].class.have < creepRoles[role].want) {
      creepRoles[role].class.spawn();
    }
  }
  // new RoomVisual(`E1S25`).text(`💥💥💥`, x, y + i, {
  //   color: `green`,
  //   font: 0.8,
  // });

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
