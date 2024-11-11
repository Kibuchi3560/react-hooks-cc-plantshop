import React, { useState } from "react";

function PlantCard({ plant, onUpdatePlant, onDeletePlant }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPrice, setNewPrice] = useState(plant.price);

  function handleEditClick() {
    setIsEditing(!isEditing);
  }

  function handlePriceChange(e) {
    setNewPrice(e.target.value);
  }

  function handlePriceSave() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: newPrice }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
        setIsEditing(false);
      });
  }

  function handleStockToggle() {
    const updatedInStock = !plant.inStock;
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inStock: updatedInStock }),
    })
      .then((r) => r.json())
      .then((updatedPlant) => {
        onUpdatePlant(updatedPlant);
      });
  }

  function handleDeleteClick() {
    fetch(`http://localhost:6001/plants/${plant.id}`, {
      method: "DELETE",
    }).then(() => onDeletePlant(plant.id));
  }

  return (
    <li className="card" data-testid="plant-item">
      <img src={plant.image || "https://via.placeholder.com/400"} alt={plant.name} />
      <h4>{plant.name}</h4>

      {isEditing ? (
        <input
          type="number"
          value={newPrice}
          onChange={handlePriceChange}
          step="0.01"
        />
      ) : (
        <p>Price: {plant.price ? `$${plant.price}` : "N/A"}</p>
      )}

      {isEditing ? (
        <button onClick={handlePriceSave}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit Price</button>
      )}

      <button onClick={handleStockToggle} className="primary">
        {plant.inStock ? "In Stock" : "Out of Stock"}
      </button>

      <button onClick={handleDeleteClick}>Delete</button>
    </li>
  );
}

export default PlantCard;
