import React, { useEffect, useState } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([])
  const [searchPlant, setSearchPlant] = useState('');

  useEffect(() => {
    fetch('http://localhost:6001/plants')
      .then((r) => r.json())
      .then(plantsArray => {
        setPlants(plantsArray)
      })
  }, [])

  //console.log(plants);
  function handleAddPlant(newPlant) {
    const updatedPlantsArray = [...plants, newPlant]
    setPlants(updatedPlantsArray);
  }

  const displayedPlants = plants.filter((plant) => {
    return plant.name.toLowerCase().includes(searchPlant.toLowerCase());
  });

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchPlant={searchPlant} onSearchChange={setSearchPlant} />
      <PlantList plants={displayedPlants} />
    </main>
  );
}

export default PlantPage;
