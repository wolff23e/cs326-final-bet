//event create
//hook fucntion to submit create event button at end of page
import { postData, getUrl } from './utility.js';

export function eventAdd(){
  (async () => {
      let event = document.getElementById("event").value;
      let description = document.getElementById("description").value;
      let dateExample = document.getElementById("dateExample").value;
  
      // create this data object
      const data = 
      {
        "title": event,
        "description": description,
        "eventStartTime": dateExample, // Needs to be in-terms of unix time.
        "image": "https://upload.wikimedia.org/wikipedia/commons/8/84/Ski_Famille_-_Family_Ski_Holidays.jpg",
        "author": "Rahul Alluri",
        "jwt": "<jwt token>"
    };
    
    const response = await postData(getUrl('event/create'), data);
    const jsonResponse = await response.json(); 

    // for debugging
    console.log(JSON.stringify(jsonResponse));

    if (jsonResponse["success"] === true) {
        document.getElementById("output").innerHTML = "Event Successfully posted";
    } else {
        const error = jsonResponse["success"]; // this is the error string;
        document.getElementById("output").innerHTML = error;
    }
  
    })();
}

$("#event-submit").on("click", eventAdd);