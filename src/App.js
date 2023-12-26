import React, { useState, useEffect } from "react";
import "./App.css";
import Content from "./Component/Content/content";
import LoadingPage from "./Component/Loading_Page/loading_page";

function App(props) {
  const [loadingPage, setLoadingPage] = useState(true);
  const [currentLocationLongitudeLatitude, setCurrentLocation] = useState();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const liveCoordinates = position.coords;
      setCurrentLocation(liveCoordinates);
      setLoadingPage(false);
    });
  }, []);

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
