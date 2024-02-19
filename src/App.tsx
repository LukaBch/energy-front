import { useState, ChangeEvent, useEffect, useRef } from 'react';
import './App.css';
import Constraints from './Constraints';
import EnergyTable from './EnergyTable';
import { getMinimalTotalEnergyConsumption, getEnergyConsumptions } from './service';
import TotalConsumption from './TotalConsumption';
import { Appliance } from './types';

function App() {
  const [minimalTotalConsumption, setMinimalTotalConsumption] = useState('...');
  const [totalConsumption, setTotalConsumption] = useState('45');
  const [isFetchingMinimalTotalEnergy, setIsFetchingMinimalTotalEnergy] = useState<boolean>(false);
  const [isResultHidden, setIsResultHidden] = useState<boolean>(false);
  const [totalComputed, setTotalComputed] = useState(0);

  const prevTotalConsumption = useRef<string>();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTotalConsumption(e.target.value);

  const [donnees, setDonnees] = useState<Appliance[]>([
    { id: 1, category: "F", name: 'Fridge', "power": 2000, selected: true, hours: "", energy: "", proportion: "" },
    { id: 2, category: "F", name: 'Freezer', "power": 2500, selected: true, hours: "", energy: "", proportion: "" },
    { id: 3, category: "A", name: 'Washing machine', "power": 1500, selected: true, hours: "", energy: "", proportion: "" },
    { id: 4, category: "A", name: 'Dishwasher', "power": 2500, selected: true, hours: "", energy: "", proportion: "" },
    { id: 5, category: "A", name: 'Induction Stove', "power": 3000, selected: true, hours: "", energy: "", proportion: "" },
    { id: 6, category: "L", name: 'TV', "power": 500, selected: true, hours: "", energy: "", proportion: "" },
    { id: 7, category: "L", name: 'Small Light', "power": 100, selected: true, hours: "", energy: "", proportion: "" },
    { id: 8, category: "L", name: 'Big Light', "power": 800, selected: true, hours: "", energy: "", proportion: "" },
  ]);

  const validateTotalConsumption = (minimalTotalConsumptionInput: any, totalConsumptionInput: any) => {
    if (totalConsumptionInput === '') {
      return false;
    }
    if (parseFloat(totalConsumptionInput) < parseFloat(minimalTotalConsumptionInput)) {
      return false;
    }
    if (parseFloat(totalConsumptionInput) > 75) {
      return false;
    }
    return true;
  }

  const fetchMinimalTotalEnergy = async () => {
    return getMinimalTotalEnergyConsumption(donnees.filter(donnee => donnee.selected).map(donnee => donnee.id))
      .then((newMinimalTotalConsumption) => {
        setMinimalTotalConsumption(newMinimalTotalConsumption);
        setIsFetchingMinimalTotalEnergy(false)
        return newMinimalTotalConsumption;
      })
  }

  const fetchEnergyConsumptions = () => {
    getEnergyConsumptions(donnees.filter(donnee => donnee.selected).map(donnee => donnee.id), totalConsumption)
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
      .then(() => setIsResultHidden(false));
  }

  useEffect(() => {
    if (prevTotalConsumption.current !== totalConsumption) {
      setIsResultHidden(true);
      if (validateTotalConsumption(minimalTotalConsumption, totalConsumption)) {
        fetchEnergyConsumptions();
      }
    }
    else {
      setIsFetchingMinimalTotalEnergy(true);
      fetchMinimalTotalEnergy().then((updatedMinimalTotalConsumption) => {
        setIsResultHidden(true);
        if (!validateTotalConsumption(updatedMinimalTotalConsumption, totalConsumption)) {
          return;
        }
        fetchEnergyConsumptions();
      })
    }
    prevTotalConsumption.current = totalConsumption;
  }, [
    totalConsumption,
    JSON.stringify(donnees.map((donnee: any) => donnee.selected))
  ]);

  const toggleCheckbox = (id: number) => {
    if (donnees.filter(donnee => donnee.id === id)[0].selected && donnees.filter(donnee => donnee.selected).length === 1) {
      return
    }
    setDonnees((prevDonnees) =>
      prevDonnees.map((element) =>
        element.id === id ? { ...element, selected: !element.selected } : element
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
      />
      <EnergyTable
        isResultHidden={isResultHidden}
        donnees={donnees}
        toggleCheckbox={toggleCheckbox}
        totalComputed={totalComputed}
      />
      <Constraints isResultHidden={isResultHidden} donnees={donnees} />
    </>
  );
}

export default App;
