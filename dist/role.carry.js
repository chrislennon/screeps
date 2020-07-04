const utils = require('./utils');

var roleCarry = {

    /** @param {Creep} creep **/
    run: function(creep) {

        
        if(creep.memory.carrying && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.carrying = false;
            creep.say('🔄 PickUp');
	    }
	    if(!creep.memory.carrying && creep.store.getFreeCapacity() == 0) {
	        creep.memory.carrying = true;
	        creep.say('⚡ DropOff');
	    }

	    if(creep.memory.carrying) {
            var target = creep.memory.dropoff ? creep.memory.dropoff : false;
            if (!Game.getObjectById(target).store.getFreeCapacity()) target = false 
            utils.placeInContainer(creep, target, true);
        }
        else {
            var target = creep.memory.pickup ? creep.memory.pickup : false;
            utils.getFromContainer(creep, target, false);
        }
	}
};

module.exports = roleCarry;