"use strict";

var shared = require("../shared");
var component = require("@jakejeyakumar/blue-button-xml").component;
var cleanup = require("../cleanup");
var bbm = require("@amida-tech/blue-button-meta");

var exportEncountersSection = function (version) {
  var sectionIDs = bbm.CCDA["sections" + version];
  var clinicalStatementsIDs = bbm.CCDA["statements" + version];

  /*var finding = component.define("finding");
  finding.templateRoot([clinicalStatementsIDs.Indication]);
  finding.fields([
      ["identifiers", "1..*", "h:id", shared.Identifier],
      ["value", "1..1", "h:value", shared.ConceptDescriptor],
      ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime]
  ]);*/
  //finding.cleanupStep(cleanup.extractAllFields(['value']));

  // Iff needed add this later by refactoring Problem Observation from Problems.  They should share.
  //var diagnosis = component.define("diagnosis");
  //finding.templateRoot(['2.16.840.1.113883.10.20.22.4.80']);
  //finding.fields([
  //  ["code", "1..1", "h:code", shared.ConceptDescriptor]
  //]);
  //finding.cleanupStep(cleanup.extractAllFields(['code']));

  var activity = component.define('activity');
  activity.templateRoot(["2.16.840.1.113883.10.20.1.2", "2.16.840.1.113883.3.88.11.83.16"]);
  activity.fields([
    ["encounter", "1..1", "h:code", shared.ConceptDescriptor],
    ["identifiers", "0..*", "h:id", shared.Identifier],
    ["date_time", "1..1", "h:effectiveTime", shared.EffectiveTime],
    ["performers", "0..*", "h:performer/h:assignedEntity", shared.assignedEntity],
    ["locations", "0..*", "h:participant/h:participantRole", shared.serviceDeliveryLocation]

    //No findings in C32 Spec.
    //["findings", "0..*", finding.xpath(), finding] //,
    //["diagnoses", "0..*", diagnosis.xpath(), diagnosis]
  ]);

  var encountersSection = component.define('encountersSection');
  encountersSection.templateRoot(["2.16.840.1.113883.3.88.11.83.127", "1.3.6.1.4.1.19376.1.5.3.1.1.5.3.3"]);
  encountersSection.fields([
    ["activity", "0..*", activity.xpath(), activity]
  ]);
  encountersSection.cleanupStep(cleanup.replaceWithField(["activity"]));
  return [encountersSection, activity];
};
exports.encountersSection = exportEncountersSection;
exports.encountersEntry = exportEncountersSection;
