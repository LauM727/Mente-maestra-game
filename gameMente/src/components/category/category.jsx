import React from 'react';
import "./category.css";

function  CategorySelection({ onSelectCategory }) {
    const categories = [
        { name: "Cultura general", color: "#BB0000" },
        { name: "Deporte", color: "#FF8A00" },
        { name: "Historia", color: "#FEC804" },
        { name: "Geografía", color: "#00CC21" },
        { name: "Entretenimiento", color: "#C800D9" },
        { name: "Retos", color: "#3300C5" }
    ];

    return (
        <div>
            <h2>Selecciona una categoría:</h2>
            {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => onSelectCategory(category.name)}
                    style={{ backgroundColor: category.color, color: 'white', padding: '10px', margin: '5px', borderRadius: '5px', border: 'none' }}
                >
                    {category.name}
                </button>
            ))}
        </div>
    );
}

export default CategorySelection;
