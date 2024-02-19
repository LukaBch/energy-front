import { useState, ChangeEvent, useEffect } from 'react';
import './App.css';
import Constraints from './Constraints';
import { getMinimalTotalEnergyConsumption, getEnergyConsumptions } from './service';
import TotalConsumption from './TotalConsumption';

function App() {
  const [minimalTotalConsumption, setMinimalTotalConsumption] = useState('...');
  const [totalConsumption, setTotalConsumption] = useState('60');
  const [isFetchingMinimalTotalEnergy, setIsFetchingMinimalTotalEnergy] = useState<boolean>(false);
  const [isFetchingResults, setIsFetchingResults] = useState<boolean>(false);
  const [minError, setMinError] = useState<boolean>(false);
  const [maxError, setMaxError] = useState<boolean>(false);
  const [totalComputed, setTotalComputed] = useState(0);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTotalConsumption(e.target.value);

  const [donnees, setDonnees] = useState([
    { id: 1, category: "F", nom: 'Fridge', "power": 2000, coche: true, hours: "", energy: "", proportion: "" },
    { id: 2, category: "F", nom: 'Freezer', "power": 2500, coche: true, hours: "", energy: "", proportion: "" },
    { id: 3, category: "A", nom: 'Washing machine', "power": 1500, coche: true, hours: "", energy: "", proportion: "" },
    { id: 4, category: "A", nom: 'Dishwasher', "power": 2500, coche: true, hours: "", energy: "", proportion: "" },
    { id: 5, category: "A", nom: 'Induction Stove', "power": 3000, coche: true, hours: "", energy: "", proportion: "" },
    { id: 6, category: "L", nom: 'TV', "power": 500, coche: true, hours: "", energy: "", proportion: "" },
    { id: 7, category: "L", nom: 'Small Light', "power": 100, coche: true, hours: "", energy: "", proportion: "" },
    { id: 8, category: "L", nom: 'Big Light', "power": 800, coche: true, hours: "", energy: "", proportion: "" },
  ]);

  useEffect(() => {
    setIsFetchingMinimalTotalEnergy(true);
    getMinimalTotalEnergyConsumption(donnees.filter(donnee => donnee.coche).map(donnee => donnee.id))
      .then(setMinimalTotalConsumption)
      .then(() => setIsFetchingMinimalTotalEnergy(false))
  }, [JSON.stringify(donnees.map((donnee: any) => donnee.coche))]);

  useEffect(() => {
    setIsFetchingResults(true);
    if (parseFloat(totalConsumption) < parseFloat(minimalTotalConsumption)) {
      setMinError(true);
      return;
    }
    if (parseFloat(totalConsumption) > 75) {
      setMaxError(true);
      return;
    }
    setMinError(false);
    setMaxError(false);
    getEnergyConsumptions(donnees.filter(donnee => donnee.coche).map(donnee => donnee.id), totalConsumption)
      .then((data) => {
        const updateData = donnees.map((item) => {
          const toto = data.energies.find((d: any) => d.id === item.id);
          if (toto) {
            return {
              ...item,
              hours: toto.hours,
              energy: toto.energy,
              proportion: toto.proportion
            }
          }
          return item
        });
        setDonnees(updateData);
        setTotalComputed(data.total);
      })
      .then(() => setIsFetchingResults(false))
  }, [
    totalConsumption,
    JSON.stringify(donnees.map((donnee: any) => donnee.coche))
  ]);

  const toggleCheckbox = (id: number) => {
    if (donnees.filter(donnee => donnee.id === id)[0].coche && donnees.filter(donnee => donnee.coche).length === 1) {
      return
    }
    setDonnees((prevDonnees) =>
      prevDonnees.map((element) =>
        element.id === id ? { ...element, coche: !element.coche } : element
      )
    );
  };

  return (
    <>
      <TotalConsumption
        isFetchingMinimalTotalEnergy={isFetchingMinimalTotalEnergy}
        minimalTotalConsumption={minimalTotalConsumption}
        totalConsumption={totalConsumption}
        handleTotalConsumptionChange={handleInputChange}
        minError={minError}
        maxError={maxError}
      />
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th />
            <th style={{ textAlign: 'left' }}>Category</th>
            <th style={{ textAlign: 'left' }}>Appliance</th>
            <th style={{ textAlign: 'left' }}>Power (W)</th>
            <th style={{ textAlign: 'left' }}>Hours (h)</th>
            <th style={{ textAlign: 'left' }}>Energy (kWh/day)</th>
            <th style={{ textAlign: 'left' }}>Proportion (%)</th>
          </tr>
        </thead>
        <tbody>
          {donnees.map((element) => (
            <tr key={element.id}>
              <td>
                <input
                  type="checkbox"
                  checked={element.coche}
                  onChange={() => toggleCheckbox(element.id)}
                />
              </td>
              <td style={{ textAlign: 'center' }}>{element.category}</td>
              <td style={{ textAlign: 'left' }}>{element.nom}</td>
              <td style={{ textAlign: 'right' }}>{element.power}</td>
              {isFetchingResults ? (
                <>
                  <td style={{ textAlign: 'right' }}>...</td>
                  <td style={{ textAlign: 'right' }}>...</td>
                  <td style={{ textAlign: 'right' }}>...</td>
                </>
              ) : (
                <>
                  <td style={{ textAlign: 'right' }}>{element.hours}</td>
                  <td style={{ textAlign: 'right' }}>{element.energy}</td>
                  <td style={{ textAlign: 'right' }}>{element.proportion}</td>
                </>
              )}
            </tr>
          ))}
          <tr>
            <th />
            <th />
            <th />
            <th />
            <th />
            <th style={{ textAlign: 'right' }}>{isFetchingResults ? '...' : totalComputed}</th>
            <th style={{ textAlign: 'right' }}>{isFetchingResults ? '...' : 100}</th>
          </tr>
        </tbody>
      </table>
      <Constraints isFetchingResults={isFetchingResults} donnees={donnees} />
    </>
  );
}

export default App;
