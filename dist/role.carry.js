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
            var target = creep.memory.dropoff ? Game.getObjectById(creep.memory.dropoff): false;
            if (!target || target.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
                target = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                })[0]
            }

            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            };
        }
        else {
            var target = creep.memory.pickup ? creep.memory.pickup : '5efd16c279be2b431a577fd7';
            pickup = Game.getObjectById(target);
            if(creep.withdraw(pickup, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(pickup, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleCarry;