var roleHarvester = require(`role.harvester`);
var roleUpgrader = require(`role.upgrader`);
var roleBuilder = require(`role.builder`);
var roleRepairer = require(`role.repairer`);
var roleCarry = require(`role.carry`);
var roleAttacker = require(`role.attacker`);
var roleSiteHarvester = require(`role.siteHarvester`);
var roleColony = require(`role.colony`);
var roleRemote = require(`role.remote`);
var roleRemoteBuilder = require(`role.remotebuilder`);
var roleRemoteUpgrader = require(`role.remoteUpgrader`);

const Roles = {
  harvester: roleHarvester,
  upgrader: roleUpgrader,
  builder: roleBuilder,
  repairer: roleRepairer,
  hauler: roleCarry,
  attacker: roleAttacker,
  siteHarvester: roleSiteHarvester,
  colony: roleColony,
  remote: roleRemote,
  remoteBuilder: roleRemoteBuilder,
  remoteUpgrader: roleRemoteUpgrader,
};

module.exports = Roles;
