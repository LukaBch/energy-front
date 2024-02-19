import { ChangeEvent } from 'react';

type TotalConsumptionProps = {
  isFetchingMinimalTotalEnergy: boolean;
  minimalTotalConsumption: string;
  totalConsumption: string;
  handleTotalConsumptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function TotalConsumption({
  isFetchingMinimalTotalEnergy,
  minimalTotalConsumption,
  totalConsumption,
  handleTotalConsumptionChange,
}: TotalConsumptionProps) {
  const minTotalEnergyContent = isFetchingMinimalTotalEnergy ? '...' : `${minimalTotalConsumption} kWh/day`;
  const minError = parseFloat(totalConsumption) < parseFloat(minimalTotalConsumption);
  const maxError = parseFloat(totalConsumption) > 75;
  const minDisplay = minError ? <div style={{ color: 'red', width: '120px' }}>{minTotalEnergyContent}</div> : <div style={{ width: '120px' }}>{minTotalEnergyContent}</div>
  const maxDisplay = maxError ? <div style={{ color: 'red' }}>75 kWh/day</div> : <div>75 kWh/day</div>
  return (
    <div style={{ display: 'flex', gap: '10px', marginBottom: "50px" }}>
      {minDisplay}
      <div>&#8804;</div>
      <input
        style={{ width: '50px' }}
        type="number"
        step={1}
        value={totalConsumption}
        onChange={handleTotalConsumptionChange}
      />
      <div>&lt;</div>
      {maxDisplay}
    </div>
  );
}

export default TotalConsumption;

