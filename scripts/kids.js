// module to hold information related to kids and render this information to the DOM

import {
  getKids,
  getKidHomeAssignments,
  getHomes,
  getServices,
} from "./database.js";

const kids = getKids();
const homes = getHomes();
const services = getServices();
const kidHomeAssignments = getKidHomeAssignments();


const findAssignmentsForKid = (kidObject, kidHomeAssignmentsArray) => {
  let kidHomes = [];
  for (const kidHomeAssignmentObject of kidHomeAssignmentsArray) {
    if (kidObject.id === kidHomeAssignmentObject.kidId) {
      kidHomes.push(kidHomeAssignmentObject)
    }
  }
  return kidHomes;
};

const findHomeForAssignment = (assignmentHomeId, arrayOfHomes) => {
  let theHomeIFound = null

  for (const homeObject of arrayOfHomes) {
    if (homeObject.id === assignmentHomeId) {
      theHomeIFound = homeObject
    }
  }
  return theHomeIFound;
}

export const Kids = () => {
  let html = "";
  html = "<ul>";

  for (const kid of kids) {
    const filteredAssignmentsForThisKid = findAssignmentsForKid(kid, kidHomeAssignments)

    for (const assignment of filteredAssignmentsForThisKid) {
      const matchingHome = findHomeForAssignment(assignment.homeId, homes)

      const homeService = services.find(
        (serviceObject) => {
          return serviceObject.id === matchingHome.serviceId
        }
      )

      html += `<li id="kid--${kid.id}">${kid.name}
      is assigned to ${matchingHome.address} for the
      ${homeService.serviceType} service
      </li>`;
    }


  }
  html += "</ul>";
  return html;
};
