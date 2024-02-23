import { useState, ChangeEvent, useEffect, useRef } from 'react';
import './App.css';
import Constraints from './components/Constraints';
import EnergyTable from './components/EnergyTable';
import { getMinimalTotalEnergyConsumption, getEnergyConsumptions, getAppliancesAndBoundaries } from './service';
import TotalConsumption from './components/TotalConsumption';
import { ComputedAppliance, EnergyConsumptionApi, Category } from './types';

function App() {
  const initialTotalEnergyConsumption = '45';
  const [minimalTotalConsumption, setMinimalTotalConsumption] = useState('...');
  const [totalConsumption, setTotalConsumption] = useState(initialTotalEnergyConsumption);
  const [isFetchingMinimalTotalEnergy, setIsFetchingMinimalTotalEnergy] = useState<boolean>(false);
  const [isResultHidden, setIsResultHidden] = useState<boolean>(false);
  const [isAppliancesAndBoundariesFetched, setIsAppliancesAndBoundariesFetched] = useState<boolean>(false);
  const [totalComputed, setTotalComputed] = useState(0);

  const prevTotalConsumption = useRef<string>(initialTotalEnergyConsumption);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTotalConsumption(e.target.value);

  const [computedAppliances, setComputedAppliances] = useState<ComputedAppliance[]>([]);

  const [boundaries, setBoundaries] = useState<Record<Category, { min: number; max: number }>>();

  const validateTotalConsumption = (minimalTotalConsumptionInput: string, totalConsumptionInput: string) => {
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
    return getMinimalTotalEnergyConsumption(computedAppliances.filter(donnee => donnee.selected).map(donnee => donnee.id))
      .then((newMinimalTotalConsumption) => {
        setMinimalTotalConsumption(newMinimalTotalConsumption);
        setIsFetchingMinimalTotalEnergy(false)
        return newMinimalTotalConsumption;
      })
  }

  const fetchEnergyConsumptions = () => {
    getEnergyConsumptions(computedAppliances.filter(donnee => donnee.selected).map(donnee => donnee.id), totalConsumption)
      .then((data) => {
        const updateData = computedAppliances.map((item) => {
          const toto = data.energies.find((d: EnergyConsumptionApi) => d.id === item.id)!;
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
        setComputedAppliances(updateData);
        setTotalComputed(data.total);
      })
      .then(() => setIsResultHidden(false));
  }

  useEffect(() => {
    getAppliancesAndBoundaries().then((data) => {
      setBoundaries(data.boundaries);
      setComputedAppliances(data.appliances.map(appliance => {
        return {
          ...appliance,
          selected: true,
          hours: "",
          energy: "",
          proportion: ""
        }
      }))
      setIsAppliancesAndBoundariesFetched(true);
    })
  }, []);

  useEffect(() => {
    if (isAppliancesAndBoundariesFetched) {
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
    }
  }, [
    isAppliancesAndBoundariesFetched,
    totalConsumption,
    JSON.stringify(computedAppliances.map((donnee: ComputedAppliance) => donnee.selected))
  ]);

  const toggleCheckbox = (id: number) => {
    if (computedAppliances.filter(donnee => donnee.id === id)[0].selected && computedAppliances.filter(donnee => donnee.selected).length === 1) {
      return
    }
    setComputedAppliances((prevDonnees) =>
      prevDonnees.map((element) =>
        element.id === id ? { ...element, selected: !element.selected } : element
      )
    );
  };

  if (!isAppliancesAndBoundariesFetched || !boundaries || !computedAppliances) {
    return <div>Fetching data...</div>
  }

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
        computedAppliances={computedAppliances}
        toggleCheckbox={toggleCheckbox}
        totalComputed={totalComputed}
      />
      <Constraints
        isResultHidden={isResultHidden}
        computedAppliances={computedAppliances}
        boundaries={boundaries}
      />
    </>
  );
}

export default App;
