import React from "react";
import Search from "./Search";
import NewPlantForm from "./NewPlantForm";
import PlantCard from "./PlantCard";

function PlantPage({ plants, onAddPlant, onSearch }) {
  return (
    <main>
      <NewPlantForm onAddNewPlant={onAddPlant} />
      <Search onSearch={onSearch} />
      <ul className="plant-list">
        {plants.map((plant) => (
          <PlantCard key={plant.id} plant={plant} />
        ))}
      </ul>
    </main>
  );
}

export default PlantPage;
