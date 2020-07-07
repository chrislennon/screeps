var roleHarvester = require(`role.harvester`);
var roleUpgrader = require(`role.upgrader`);
var roleBuilder = require(`role.builder`);
var roleRepairer = require(`role.repairer`);
var roleCarry = require(`role.carry`);
var roleAttacker = require(`role.attacker`);
var roleSiteHarvester = require(`role.siteHarvester`);

const Roles = {
  harvester: roleHarvester,
  upgrader: roleUpgrader,
  builder: roleBuilder,
  repairer: roleRepairer,
  hauler: roleCarry,
  attacker: roleAttacker,
  siteHarvester: roleSiteHarvester,
};

module.exports = Roles;
