import React from "react";
import "./styles/CountryCard.css";

const CountryCard = ({ item }) => {
  // Verificar si item.languages es válido antes de usarlo
  const languagesArray = item.languages ? Object.entries(item.languages) : [];

  return (
    <div className="card_country">
      <img className="card_countryImg" src={item.flags.png} alt="" />
      <h2 className="card_countryName">Nombre País: {item.name.common}</h2>
      <h4 className="card_countryCapital">Capital: {item.capital?.[0] || "Desconocida"}</h4>
      <h4 className="card_countryArea">Área: <br></br><span className="spanArea">{item.area} Mts</span></h4>
      <h4 className="card_countryPopulation">Población: <br></br><span className="spanArea">{item.population}</span></h4>
      
      <h5 className="card_countryLanguages"> 
        <details>
          <summary>
          Idiomas
          </summary>
          {languagesArray.length > 0 ? (
          <ul>
            {languagesArray.map(([key, language]) => (
              <li className="language" key={key}>{language}</li>
            ))}
          </ul>
        ) : (
          <span> No disponibles</span>
        )}
        </details>
      </h5>
    </div>
  );
};

export default CountryCard;
