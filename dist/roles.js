var roleHarvester = require(`role.harvester`);
var roleUpgrader = require(`role.upgrader`);
var roleBuilder = require(`role.builder`);
var roleRepairer = require(`role.repairer`);
var roleCarry = require(`role.carry`);

const Roles = {
  harvester: roleHarvester,
  upgrader: roleUpgrader,
  builder: roleBuilder,
  repairer: roleRepairer,
  hauler: roleCarry,
};

module.exports = Roles;
