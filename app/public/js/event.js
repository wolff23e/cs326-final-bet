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
      
      //
      const data={"event": event,'description':description, 'dateExample':dateExample}
      const j = await resp.json();
      //need to change 
      if (j['result'] !== 'error') {
          document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
      } else {
          document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
      }
      })();
}