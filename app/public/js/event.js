//event create
//hook fucntion to submit create event button at end of page
import { postData } from './utility';

function eventAdd(){
  (async () => {
      let event = document.getElementById("event").value;
      let description = document.getElementById("description").value;
      let dateExample = document.getElementById("dateExample").value;
      // pass data to url   //postman event/create
      const data={"event": event,'description':description, 'dateExample':dateExample}
    
      const jsuccess = await resp.json(); 

   
      if (jsuccess == true) {
          document.getElementById("output").innerHTML = "Event Successfully posted";

      } else {
        json.console.error();
        j.error;
      }
      })();
}