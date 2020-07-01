var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

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

    var roleNeed = {
        builder: 1,
        harvester: 6,
        upgrader: 4,
        road: 2,
        repairer: 2
    };

    var roleCount = {
        builder: _.sum(Game.creeps, (c) => c.memory.role == 'builder'),
        harvester:  _.sum(Game.creeps, (c) => c.memory.role == 'harvester'),
        upgrader:  _.sum(Game.creeps, (c) => c.memory.role == 'upgrader'),
        road: _.sum(Game.creeps, (c) => c.memory.role == 'road'),
        repairer: _.sum(Game.creeps, (c) => c.memory.role == 'repairer'),
    }; 

    for (var role in roleCount){
        console.log(role + ' - Want: ' + roleNeed[role] + ' Have: ' + roleCount[role]);
        if (roleCount[role] < roleNeed[role]) Game.spawns['Spawn1'].spawnCreep( [WORK, CARRY, MOVE], role + Game.time.toString(), {memory:{role}} );
    }
    

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
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
    }
}