import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
/* global gapi */

function App() {
  const CLIENT_ID = '925534215061-lhqcqsnmr3semr04cf300ocvnu85fc1r.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCM58kK3boWoFHUMbo-EaAaIVVGXYVVBKs';
let DISCOVERY_DOCS=["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
let SCOPES = "https://www.googleapis.com/auth/calendar.events"
const getEvent=async()=>{
 await window.gapi.client.calendar.events.list({
    'calendarId': 'primary',
    'timeMin': (new Date()).toISOString(),
    'showDeleted': false,
    'singleEvents': true,
    'maxResults': 10,
    'orderBy': 'startTime'
  }).then(response => {
    const events = response.result.items
    console.log('EVENTS: ', events)
  })
  
}

 
  return (
    <div>
      <LoginSocialGoogle
        client_id={"925534215061-lhqcqsnmr3semr04cf300ocvnu85fc1r.apps.googleusercontent.com"}
        scope="openid profile email"
        discoveryDocs="claims_supported"
        access_type="offline"
        onResolve={({ provider, data }) => {
          console.log(provider, data);
        }}
        onReject={(err) => {
          console.log(err);
        }}
      >
        <GoogleLoginButton />
      </LoginSocialGoogle>
<button onClick={async()=>await getEvent()}>get data</button>
    </div>
  );
}

export default App;