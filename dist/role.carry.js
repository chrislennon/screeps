const utils = require('./utils');

var roleHarvester = {
    
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var target;
            if (creep.memory.node) target = Game.getObjectById(creep.memory.node);
            else target = creep.room.find(FIND_SOURCES)[1];
            
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
        else {
            var target;
            if (creep.memory.dropoff) target = creep.memory.dropoff;
            if (creep.memory.role == 'heavyHarvester') utils.placeInContainer(creep, target, false);
            else utils.placeInContainer(creep, target, true);
        }
	}
};

module.exports = roleHarvester;