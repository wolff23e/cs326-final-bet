//event create
//hook fucntion to submit create event button at end of page
import { postData, getUrl } from './utility.js';

export function eventAdd(){
  (async () => {
      let event = document.getElementById("event").value;
      let description = document.getElementById("description").value;
      let dateExample = document.getElementById("dateExample").value;
      let image = document.getElementById("image").value;

    //jwt  -> tokens cache is browser that user is logged in when making request
      // create this data object
      const data = 
      {
        "title": event,
        "description": description,
        "eventStartTime": dateExample, // Needs to be in-terms of unix time.
        "image": image, 
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
        const error = jsonResponse["error"]; // this is the error string;
        document.getElementById("output").innerHTML = error;
    }
  
    })();
}

$("#event-submit").on("click", eventAdd);