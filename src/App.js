import React, { useState, useEffect } from "react";
import "./App.css";
import Content from "./Component/Content/content";
import LoadingPage from "./Component/Loading_Page/loading_page";

function App(props) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentLocationLongitudeLatitude, setCurrentLocation] = useState();

  useEffect(() => {
    console.log(navigator.geolocation,'hello world')
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position,'hello world')
      const liveCoordinates = position.coords;
      setCurrentLocation(liveCoordinates);
      setLoadingPage(false);
    },(err) => {
      console.log(err)
    });
  },[]);

  return (
    <>
      <div className="App">
        {loadingPage ? (
          <LoadingPage />
        ) : (
          <Content
            currentLocationLongitudeLatitude={currentLocationLongitudeLatitude}
          />
        )}
      </div>
    </>
  );
}

export default App;
