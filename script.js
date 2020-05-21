// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

const jsonIndex = Math.floor(Math.random() * 6);
fetch("https://handlers.education.launchcode.org/static/planets.json").then((response) => {
   response.json().then((json) => {
      const missionTarget = document.getElementById("missionTarget");
      missionTarget.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[jsonIndex].name}</li>
                  <li>Diameter: ${json[jsonIndex].diameter}</li>
                  <li>Star: ${json[jsonIndex].star}</li>
                  <li>Distance from Earth: ${json[jsonIndex].distance}</li>
                  <li>Number of Moons: ${json[jsonIndex].moons}</li>
               </ol>
               <img src="${json[jsonIndex].image}">
            `;
   });
});

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
   event.preventDefault();
   const pilotName = document.querySelector("input[name=pilotName]");
   const copilotName = document.querySelector("input[name=copilotName]");
   const fuelLevel = document.querySelector("input[name=fuelLevel]");
   const cargoMass = document.querySelector("input[name=cargoMass]");
   const onlyLetters = /^[a-zA-Z]+$/;
   let correctFields = true;
   if (pilotName.value === "" || copilotName.value === "" || fuelLevel.value === "" || cargoMass.value === "") {
      alert("All fields are required!");
      correctFields = false;
   } if (!onlyLetters.test(pilotName.value) || !onlyLetters.test(copilotName.value)) {
      alert("Crew Names must be only contain letters");
      correctFields = false;
   } if (isNaN(Number(fuelLevel.value)) || isNaN(Number(cargoMass.value))) {
      alert("Fuel Level and Cargo Mass must be a number");
      correctFields = false;
   }
   if (correctFields) {
      document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotName.value} is ready for launch`;
      document.getElementById("copilotStatus").innerHTML = `Pilot ${copilotName.value} is ready for launch`;
      if (fuelLevel.value < 10000) {
         document.getElementById("fuelStatus").innerHTML = `Fuel level too low to complete the journey`;
         document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch`;
         document.getElementById("launchStatus").style.color = 'red';
         document.getElementById("faultyItems").style.visibility = 'visible';
      } else {
         document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
      }
      if (cargoMass.value > 10000) {
         document.getElementById("cargoStatus").innerHTML = `Cargo mass too heavy to complete the journey.`;
         document.getElementById("launchStatus").innerHTML = `Shuttle not ready for launch`;
         document.getElementById("launchStatus").style.color = 'red';
         document.getElementById("faultyItems").style.visibility = 'visible';
      } else {
         document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch`;
      }
      if (fuelLevel.value >= 10000 && cargoMass.value <= 10000) {
         document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch`;
         document.getElementById("cargoStatus").innerHTML = `Cargo weight low enough for launch`;
         document.getElementById("launchStatus").innerHTML = `Shuttle is ready for launch!`;
         document.getElementById("launchStatus").style.color = 'green';
         document.getElementById("faultyItems").style.visibility = "visible";
      }
   }
});

