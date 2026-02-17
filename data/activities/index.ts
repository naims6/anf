import dewahEducation from './dawah-education.json';
import emergancyRelief from './emergency-relief.json';
import ifter from './iftar.json';
import meritorious from './meritorious.json';
import quarbani from './qurbani.json';
import safeDrinkingWater from './safe-drinking-water.json';
import selfReliance from './self-reliance.json';
import skillBasedEntrepreneurship from './skill-based-entrepreneurship.json';
import skillDevelopmentInstitute from './skill-development-institute.json';
import treePlantation from './tree-plantation.json';
import winterRelief from './winter-relief.json';

export const activities = [
  dewahEducation,
  emergancyRelief,
  ifter,
  winterRelief,
  treePlantation,
  skillDevelopmentInstitute,
  skillBasedEntrepreneurship,
  selfReliance,
  safeDrinkingWater,
  quarbani,
  meritorious

];

export const activitiesBySlug = Object.fromEntries(
  activities.map(activity => [activity.slug, activity])
);
