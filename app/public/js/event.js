//event create
//hook fucntion to submit create event button at end of page
import { postData, getUrl } from './utility.js';

function eventCreate(){
  (async () => {
      let event = $("#event").val();
      let description = $("#description").val();
      let dateExample = $("#dateExample").val();
      let image = $("#image").val();

      const tags = Array(5).keys().map(i => $("#tag" + (i + 1)).val())

    //jwt  -> tokens cache is browser that user is logged in when making request
      // create this data object
      const data = 
      {
        "title": event,
        "description": description,
        "eventStartTime": dateExample, // Needs to be in-terms of unix time.
        "image": image, 
        "author": "Rahul Alluri",
        "tags": [tag1, tag2, tag3, tag4, tag5],
        "jwt": "<jwt token>"    
    };
    
    const response = await postData(getUrl('event/create'), data);
    const jsonResponse = await response.json(); 

    // for debugging
    console.log(JSON.stringify(jsonResponse));

    if (jsonResponse["success"] === true) {
        $("#output").innerHTML = "Event Successfully posted";
    } else {
        const error = jsonResponse["error"]; // this is the error string;
        $("#output").innerHTML = error;
    }
  
    })();
}

$("#event-submit").on("click", eventCreate);

export function updateEvent(){
  (async () => {
    //where we will display the corresponding events for user

    if (true) {//json author matches user currently using) {
      $("#yourevent").innerHTML = "";
  } else {
      const notFound = jsonResponse["No events found for this user."]; // this is the error string;
      $("#yourevent").innerHTML = notFound;
  }

})();
}

$("#load-events").on("click", updateEvent);

function createTagListItem(tagName) {
  return `
  <li class="list-group-item tag-row ">
    <a href="#">
      ${tagName}  
    </a>
  </li>
  `;
}


function getTags(tagsLimit){
  (async () => {

      const data = { count: tagsLimit };
      
      const resp = await postData(getUrl('event/tags'), data);
      const jsonResponse = await resp.json();

      console.log(JSON.stringify(jsonResponse));

      if (jsonResponse["success"] !== true) {
        // TODO: show error somehow.
        return;
      } else {
        jsonResponse["tags"].forEach(tag => {
          $(createTagListItem(tag)).appendTo("#tag-list");
        });
      }

  })();
};

window.getTags = getTags;