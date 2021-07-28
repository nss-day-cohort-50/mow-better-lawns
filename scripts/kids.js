// module to hold information related to kids and render this information to the DOM

import {
  getKids,
  getKidHomeAssignments,
  getHomes,
  getServices,
} from "./database.js";

// get all data from database.js
const kids = getKids();
const homes = getHomes();
const services = getServices();
const kidHomeAssignments = getKidHomeAssignments();

// function to iterate kidsArray to find kid who completed assignment
const findKid = (assignmentObject, kidsArray) => {
    let kidMowedBetter = null
    for (const kid of kidsArray) {
        if (kid.id === assignmentObject.kidId) {
            kidMowedBetter = kid
        }
    }
    return kidMowedBetter
}

// function to iterate servicesArray and find service completed at home
const findServices = (homeObject, servicesArray) => {
  let serviceRendered = null;
  for (const serviceObject of servicesArray) {
      if (serviceObject.id === homeObject.serviceId) {
        serviceRendered = serviceObject;
      }
    }
    return serviceRendered;
  }

// function to iterate homeArray and find home where assignment was completed
const findHome = (assignmentObject, homeArray) => {
    let homeMowedBetter = null
    for (const home of homeArray) {
        if (home.id === assignmentObject.homeId) {
            homeMowedBetter = home
        }
    }
    return homeMowedBetter
}

// function to output string stating <kid name> <service type> at <home address>
export const KidJobsCompleted = () => {
// iterate the kidHomeAssignments array, invoke functions to find assingment objects and return a string of HTML
  let html = "";
  html = "<ul>";
  for (const assignment of kidHomeAssignments) {
    const home = findHome(assignment, homes);
    const foundService = findServices(home, services);
    const kid = findKid(assignment, kids)

    html += `<li id="kid--${kid.id}">${kid.name} completed ${foundService.serviceType} job at ${home.address}.</li>`;
  }
  html += "</ul>"
  return html;
};
