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
          fetch(`https://www.mountainproject.com/data/get-routes-for-lat-lon?lat=${position.coords.latitude}&lon=${position.coords.longitude}&maxDistance=${radius}&minDiff=${minGrade}&maxDiff=${maxGrade}&key=`)
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

  const [radius, setRadius] = useState(50)
  const [numProblems, setNumProblems] = useState(50)

  let gradeOptions = [
    {name: 'V0'},
    {name: 'V1'},
    {name: 'V2'},
    {name: 'V3'},
    {name: 'V4'},
    {name: 'V5'},
    {name: 'V6'},
    {name: 'V7'},
    {name: 'V8'},
    {name: 'V9'},
    {name: 'V10'},
    {name: 'V11'},
    {name: 'V12'},
    {name: 'V13'},
    {name: 'V14'},
    {name: 'V15'},
    {name: 'V16'},
    {name: 'V17'},
  ]
  let [minGrade, setMinGrade] = useState('V0')
  let [maxGrade, setMaxGrade] = useState('V16')

  useEffect(() => {
    const selectedMinIdx = gradeOptions.findIndex(({name}) => name === minGrade)
    const selectedMaxIdx = gradeOptions.findIndex(({name}) => name === maxGrade)
    if (selectedMinIdx > selectedMaxIdx) {
      setMaxGrade(gradeOptions[selectedMinIdx].name)
    }
  },[minGrade, maxGrade, gradeOptions])


  return (
    <div className="App">
      <div className="py-4">
        {currentLocation ?
         `These routes are close to ${currentLocation.lat}, ${currentLocation.lon} !` :
          'Finding your location...'}
      </div>
      <CriteriaBar 
        gradeOptions={gradeOptions} 
        minGrade={minGrade} 
        setMinGrade={setMinGrade} 
        maxGrade={maxGrade} 
        setMaxGrade={setMaxGrade}
        radius={radius}
        setRadius={setRadius}
        numProblems={numProblems}
        setNumProblems={setNumProblems}
      />
      <div className="grid grid-cols-3 gap-4">
        {closeRoutes.map(route => {
          const validImgPath = route.imgMedium.length > 0 ? route.imgMedium : route.imgSmallMed.length > 0 ? route.imgSmallMed : route.imgSmall.length > 0 ? route.imgSmall : route.imgSqSmall.length > 0 ? route.imgSqSmall : null

          return (
            <div className="text-blue-500 border border-gray-300">
              <div className="h-40 overflow-hidden flex items-center justify-center bg-gray-200 border border-gray-100">
                {validImgPath ? <img src={validImgPath} alt="Climbing Route"/> : 'No image :('}
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
