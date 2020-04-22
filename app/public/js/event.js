//event create
//hook fucntion to submit create event button at end of page
async function postData(url, data) {
  const resp = await fetch(url,
                           {
                               method: 'POST',
                               mode: 'cors',
                               cache: 'no-cache',
                               credentials: 'same-origin',
                               headers: {
                                   'Content-Type': 'application/json'
                               },
                               redirect: 'follow',
                               body: JSON.stringify(data)
                           });
  return resp;
}
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