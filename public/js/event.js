//event create
//hook fucntion to submit create event button at end of page
import { postData, getUrl } from './utility.js';

function eventCreate(){
  (async () => {
      let title = $("#ae-title").val();
      let description = $("#ae-desc").val();
      let date = $("#ae-date").val();
      let image = $("#ae-image").val();

      if (!title || !description || !date || !image) {
        $("#ae-error").html("Please enter all fields");
        return;
      }

      const tags = Array(5).fill().map((_, i) => $("#ae-tag" + (i + 1)).val());

      const jwt=window.localStorage.getItem("jwt");
      if(!jwt){
        console.log("Not logged in");
        return;
      }
    //jwt  -> tokens cache is browser that user is logged in when making request
      // create this data objects
      const data = 
      {
        title,
        description,
        image,
        "eventStartTime": date, // Needs to be in-terms of unix time.
        "author": "<from jwt token>", // TODO: Get from JWT from localStorage
        "tags": tags,
        "jwt":  jwt// TODO: Get from localStorage 
    };
    
    const response = await postData(getUrl('event/create'), data);
    const jsonResponse = await response.json(); 

    // for debugging
    console.log(JSON.stringify(jsonResponse));

    if (jsonResponse["success"] === true) {
        $("#ae-success").html("Event Successfully posted!!");
    } else {
        const error = jsonResponse["error"]; // this is the error string;
        $("#ae-error").html(error);
    }
  
    })();
}

$("#event-submit").on("click", eventCreate);


function getEventbyId(eventid){
  (async () => {
    
    console.log("getEventbyId:" + eventid);
    const response = await postData(getUrl('event/get'), { id: eventid });
    const jsonResponse = await response.json(); 

    // for debugging
    console.log(JSON.stringify(jsonResponse));

    if (jsonResponse["success"] === true) {
       console.log("gebisuccess");
    } else {
        const error = jsonResponse["error"]; // this is the error string;
     
    }

    const eventInfo=jsonResponse.data;

    $("#ed-title").val(eventInfo.title);
    $("#ed-desc").val(eventInfo.description);
    $("#ed-date").val(eventInfo.date);
    $("#ed-image").val(eventInfo.image);
    Array(5).fill().forEach((_, i) => $("#ed-tag" + (i + 1)).val(eventInfo.tags[i]));
  
    })();
}
window.getEventbyId=getEventbyId;
  


function editEvent(){

    (async () => {

        const id=window.localStorage.getItem("eventid");
        let title = $("#ed-title").val();
        let description = $("#ed-desc").val();
        let date = $("#ed-date").val();
        let image = $("ed-image").val();
  
        if (!title || !description || !date || !image) {
          $("#ed-error").html("Please enter all fields");
          return;
        }
        const jwt=window.localStorage.getItem("jwt");
        const tags = Array(5).fill().map(i => $("#ed-taged" + (i + 1)).val());
  
      //jwt  -> tokens cache is browser that user is logged in when making request
        // create this data object
        const data = 
        {
          id,
          title,
          description,
          image,
          "eventStartTime": date, // Needs to be in-terms of unix time.
          "author": "<from jwt token>", // TODO: Get from JWT from localStorage
          "tags": tags,
          "jwt": jwt // TODO: Get from localStorage 
      };
      
      const response = await postData(getUrl('event/update'), data);
      const jsonResponse = await response.json(); 
  
      // for debugging
      console.log(JSON.stringify(jsonResponse));
      
  
      if (jsonResponse["success"] === true) {
          $("#ae-success").html("Event Successfully Updates!!");
          window.localStorage.setItem("eventid","");
      } else {
          const error = jsonResponse["error"]; // this is the error string;
          $("#ae-error").html(error);
      }
      
      })();
  
}
window.editEvent=editEvent;
$("#ed-submit").on("click", editEvent);
function createEventListItem(event){
  console.log("createEventListItem:" + event.id);
  return `
  <li id=${event.id} class="list-group-item tag-row mt-20">
    <div>${event.title}</div>
    <button onclick="onclickEditEventHelper('${event.id}')" id="event-edit" class="float-right btn btn-primary btn-dark mt-20">Edit</button>
    <button onclick="deleteEvent('${event.id}')" id="event-delete" class="float-right btn btn-primary btn-dark mt-20">Delete</button>


  </li>
  `;
}

function deleteEvent(id){
  (async () => {

    const jwt=window.localStorage.getItem("jwt");
    if(!jwt){
      console.log("Not logged in");
      return;
    }

    const data = { jwt, id };
  
    const response = await postData(getUrl('event/delete'), data);
    const jsonResponse = await response.json(); 

    console.log(JSON.stringify(jsonResponse));

    if (jsonResponse["success"] === true) {
      console.log("successfully deleted");
      location.reload();
    } else {
      const error = jsonResponse["error"]; // this is the error string;
      console.log(error);
    }

  })();
}

window.deleteEvent = deleteEvent;

function onclickEditEventHelper(eventid){
  console.log("onclickEditEventHelper:" + eventid);
  window.localStorage.setItem("eventid", eventid );
  window.location.href="editevent.html"
}

window.onclickEditEventHelper=onclickEditEventHelper;

function showmyevents(){
  (async () => {
    console.log("hello");
    const data = window.localStorage.getItem("jwt");
    console.log(data);
    
    const resp = await postData(getUrl('event/mylist'), { jwt: data });
    const jsonResponse = await resp.json();

    console.log(JSON.stringify(jsonResponse));

    if (jsonResponse["success"] !== true) {
      // TODO: show error somehow.
      return;
    } else {
      jsonResponse["data"].forEach(event => {
        $(createEventListItem(event)).appendTo("#event-list");
      });
    }

  })();
}
window.showmyevents=showmyevents;



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

function showPopularEvents(eventnum){
  (async () => {
    console.log("show popular events called");
    const data = window.localStorage.getItem("jwt");
    console.log(data);
    const num=eventnum;
    const resp = await postData(getUrl("event/recent"),{limit: eventnum});
    const jsonResponse = await resp.json();
    console.log(JSON.stringify(jsonResponse.data));
  
    if (jsonResponse["success"] !== true) {
        // TODO: show error somehow.
      return;
      } else {
      jsonResponse.data.forEach(event=>{
        $(creatEventItem(event)).appendTo("#events");
      })
      }
  
    })();
    
}
function creatEventItem(data){
  return `
  <div class="event">
                    <img class="event-img" src="${data.image}">
                    <div class="event-title">
                      "${data.title}"
                  </div>
                  <div class="event-desc mt-2">
                   "${data.description}"
                </div>
                    <div class="border-top border-dark mt-4"></div>
                    <div class="d-flex flex-row mt-1 justify-content-between">
                        <div class="event-time">
                            <b>Time:</b> "${data.eventStartTime}"
                        </div>
                        <div class="event-place">
                            <b>Location:</b> "${data.location}"
                        </div>
                    </div>
                </div>
                
  `
}
window.showPopularEvents=showPopularEvents;