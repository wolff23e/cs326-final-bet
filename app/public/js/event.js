//event create
//hook fucntion to submit create event button at end of page
import { postData, getUrl } from './utility.js';

export function eventAdd(){
  (async () => {
      let event = document.getElementById("event").value;
      let description = document.getElementById("description").value;
      let dateExample = document.getElementById("dateExample").value;
      let image = document.getElementById("image").value;
      let tag1 = document.getElementById("tag1").value;
      let tag2 = document.getElementById("tag2").value;
      let tag3 = document.getElementById("tag3").value;
      let tag4 = document.getElementById("tag4").value;
      let tag5 = document.getElementById("tag5").value;

    //jwt  -> tokens cache is browser that user is logged in when making request
      // create this data object
      const data = 
      {
        "title": event,
        "description": description,
        "eventStartTime": dateExample, // Needs to be in-terms of unix time.
        "image": image, 
        "author": "Rahul Alluri",
        "Tags": [tag1, tag2, tag3, tag4, tag5],
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

export function updateEvent(){
  (async () => {
    //where we will display the corresponding events for user

    if (true) {//json author matches user currently using) {
      document.getElementById("yourevent").innerHTML = "";
  } else {
      const notFound = jsonResponse["No events found for this user."]; // this is the error string;
      document.getElementById("yourevent").innerHTML = notFound;
  }

})();
}

$("#event-submit").on("click", eventAdd);
$("#load-events").on("click", updateEvent);
