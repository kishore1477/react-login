import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { google } from 'googleapis';


function App() {
  const CLIENT_ID = '925534215061-lhqcqsnmr3semr04cf300ocvnu85fc1r.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCM58kK3boWoFHUMbo-EaAaIVVGXYVVBKs';


  const initClient = () => {
    return google.gapi.client
      .init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
        scope: 'https://www.googleapis.com/auth/calendar.readonly',
      })
      .then((int) => {
        console.log("intres",int)
        // Handle successful initialization
      })
      .catch((error) => {
        console.log("eeroor in int",error)
        // Handle error
      });
  };
  const componentDidMount=() =>{
    window.gapi.load('client', initClient());
  }
  componentDidMount()
 
  const getEvent=()=>{
    return gapi.client.calendar.events
    .list({
      calendarId: 'primary', // 'primary' refers to the user's primary calendar
      timeMin: new Date().toISOString(), // Retrieve events starting from the current date
      showDeleted: false,
      singleEvents: true,
      maxResults: 10, // Maximum number of events to retrieve
      orderBy: 'startTime',
    })
    .then((response) => {
      const events = response.result.items;
      console.log("Responsen events:",events)
      // Process and handle the events
    })
    .catch((error) => {
      console.log("Error in gets:",error)
      // Handle error
    });
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

      <button onClick={getEvent}>Get Event</button>
    </div>
  );
}

export default App;