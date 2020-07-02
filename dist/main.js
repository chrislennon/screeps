var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleCarry = require('role.carry');

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

    var creepSize = {
        standard: [WORK, CARRY, MOVE],
        heavy: [WORK, WORK, WORK, WORK, CARRY, MOVE],
        carry: [CARRY, CARRY, MOVE]
    }

    var roles = {
        builder: {
            want: 8,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'builder'),
            script: 'builder',
            size: creepSize.standard,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.standard, 'builder' + Game.time.toString(), {memory:{role: 'builder'}} );
            }
        },
        harvester: {
            want: 4,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'harvester'),
            script: 'harvester',
            size: creepSize.standard,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.standard, 'harvester' + Game.time.toString(), {memory:{role: 'harvester'}} );
            }
        },
        upgrader: {
            want: 3,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'upgrader'),
            script: 'upgrader',
            size: creepSize.heavy,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.heavy, 'upgrader' + Game.time.toString(), {memory:{role: 'upgrader'}} );
            }
        },
        road: {
            want: 0,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'road'),
            script: 'road',
            size: creepSize.standard,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.standard, 'road' + Game.time.toString(), {memory:{role: 'road'}} );
            }
        },
        repairer: {
            want: 2,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'repairer'),
            script: 'repairer',
            size: creepSize.standard,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.standard, 'repairer' + Game.time.toString(), {memory:{role: 'repairer'}} );
            }
        },
        heavyHarvester: {
            want: 1,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'heavyHarvester'),
            script: 'harvester',
            size: creepSize.heavy,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.heavy, 'heavyHarvester' + Game.time.toString(), {
                    memory:{
                        role: 'heavyHarvester',
                        dropoff: '5efd16c279be2b431a577fd7',
                        node: '5bbcacff9099fc012e636716',
                    }
                });
            },
        },
        heavyHarvesterA: {
            want: 2,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'heavyHarvesterA'),
            script: 'harvester',
            size: creepSize.heavy,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.heavy, 'heavyHarvesterA' + Game.time.toString(), {
                    memory:{
                        role: 'heavyHarvesterA',
                        dropoff: '5efd8681342f53048b529460',
                        node: '5bbcacff9099fc012e636717',
                    }
                });
            },
        },
        carry: {
            want: 5,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'carry'),
            script: function(creep) {
                roleCarry.run(creep);
            },
            size: creepSize.carry,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.carry,
                    'carry' + Game.time.toString(), {
                    memory:{
                        role: 'carry',
                        dropoff: '5efd56cffd0fefa443406660',
                        pickup: '5efd16c279be2b431a577fd7',
                    }
                });
            },
        },
        carryA: {
            want: 4,
            have: _.sum(Game.creeps, (c) => c.memory.role == 'carryA'),
            script: function(creep) {
                roleCarry.run(creep);
            },
            size: creepSize.carry,
            spawn: function() {
                Game.spawns['Spawn1'].spawnCreep( creepSize.carry,
                    'carryA' + Game.time.toString(), {
                    memory:{
                        role: 'carryA',
                        dropoff: '5efb7bee45c0bd352fe9db12',
                        pickup: '5efd8681342f53048b529460',
                    }
                });
            },
        },
    };

    console.log('-------------------------------------------------------------------');
    for (var role in roles){
        console.log(role + ' - Want: ' + roles[role].want + ' Have: ' + roles[role].have);
        if (roles[role].have < roles[role].want) roles[role].spawn();
    }
    console.log('-------------------------------------------------------------------');

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester' || creep.memory.role == 'heavyHarvester' || creep.memory.role == 'heavyHarvesterA') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'road') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'hauler') {
            roleHauler.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'carry' || creep.memory.role == 'carryA') {
            roles['carry'].script(creep);
        }
    }
}