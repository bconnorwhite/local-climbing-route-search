import React, { useEffect, useState } from 'react';
import './App.css';
import tempData from './tempData.json'
import CriteriaBar from './CriteriaBar'


function App() {

  const [currentLocation, setCurrentLocation] = useState(null)
  const [closeRoutes, setCloseRoutes] = useState([])
  
  useEffect(() => {
      if ("geolocation" in navigator) {
        console.log("Available");
        navigator.geolocation.getCurrentPosition(function(position) {
          const curLocObj = {lat: position.coords.latitude , lon: position.coords.longitude }
          setCurrentLocation(curLocObj)
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          /*
          fetch(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${position.coords.latitude}&lon=${position.coords.longitude}&maxDistance=25&minDiff=V5&maxDiff=V12&key=`)
            .then(res => res.json())
            .then((data) => {
              console.log(data)
              setCloseRoutes(data)
            })
            .catch(console.log)
            */
           console.log(tempData.routes.length)
           console.log(tempData.routes[0])
           const temp = tempData.routes.map(route => route)
           console.log(temp)
           //console.log(tempData.json())
           //const temp = [].push(tempData.routes)
            console.log(tempData.routes)
            setCloseRoutes(temp)
        });
      } else {
        console.log("Not Available");
      }
  },[setCurrentLocation])
  console.log(closeRoutes)

  let options = [
    {name: 'Koala'},
    {name: 'Kangaroo'},
    {name: 'Platypus'},
    {name: 'Bald Eagle'},
    {name: 'Bison'},
    {name: 'Skunk'}
  ]
  let [radius, setRadius] = useState('Bison')


  return (
    <div className="App">
      <div className="py-4">
        {currentLocation ?
         `These routes are close to ${currentLocation.lat}, ${currentLocation.lon} !` :
          'Finding your location...'}
      </div>
      <CriteriaBar radiusOptions={options} radius={radius} setRadius={setRadius}/>
      <div className="grid grid-cols-3 gap-4">
        {closeRoutes.map(route => {
          const validImgPath = route.imgMedium.length > 0 ? route.imgMedium : route.imgSmallMed.length > 0 ? route.imgSmallMed : route.imgSmall.length > 0 ? route.imgSmall : route.imgSqSmall.length > 0 ? route.imgSqSmall : null

          return (
            <div className="text-blue-500 border border-gray-300">
              <div className="h-40 overflow-hidden flex items-center justify-center bg-gray-200 border border-gray-100">
                {validImgPath ? <img src={validImgPath}/> : 'No image :('}
              </div>
              {`${route.name} - ${route.location[2]}`}
              <div className="flex justify-evenly">
                <p>Grade: {route.rating}</p>
                <p>Rating: {route.stars} stars</p>
              </div>
            </div>
        )})}
      </div>
    </div>
  );
}

export default App;
