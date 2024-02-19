import { ChangeEvent } from 'react';

type TotalConsumptionProps = {
  isFetchingMinimalTotalEnergy: boolean;
  minimalTotalConsumption: string;
  totalConsumption: string;
  handleTotalConsumptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
  minError: boolean;
  maxError: boolean;
};

function TotalConsumption({
  isFetchingMinimalTotalEnergy,
  minimalTotalConsumption,
  totalConsumption,
  handleTotalConsumptionChange,
  minError,
  maxError
}: TotalConsumptionProps) {
  const minTotalEnergyContent = isFetchingMinimalTotalEnergy ? '...' : `${minimalTotalConsumption} kWh/day`;
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

