var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
            var targets;
            if (creep.memory.role == 'road') {
                targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            } else {
                targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            }; 
	         
            if(targets.length) {
                
                // if(creep.build(Game.getObjectById('5efe34e96e420968611c0dbd')) == ERR_NOT_IN_RANGE) {
                //     creep.moveTo(Game.getObjectById('5efe34e96e420968611c0dbd'), {visualizePathStyle: {stroke: '#ffffff'}});
                // }
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
	    }
	    else {
            var target = creep.room.find(FIND_SOURCES)[0];
            // var target = creep.room.find(FIND_STRUCTURES, {
            //     filter: (structure) => {
            //         return (structure.structureType == STRUCTURE_CONTAINER) && 
            //                 structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            //     }
            // })[0];
            target = Game.getObjectById('5efd8681342f53048b529460');
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;