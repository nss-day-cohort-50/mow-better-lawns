import { KidJobsCompleted } from "./kids.js";

const mainContainer = document.querySelector("#container")

const render = () => {
    mainContainer.innerHTML = KidJobsCompleted()
}

render()