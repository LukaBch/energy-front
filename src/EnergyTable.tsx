type EnergyTableProps = {
  isFetchingResults: boolean;
  donnees: any;
  toggleCheckbox: (id: number) => void;
  totalComputed: any;
};

function EnergyTable({
  isFetchingResults,
  donnees,
  toggleCheckbox,
  totalComputed
}: EnergyTableProps) {
  return (
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
        {donnees.map((element: any) => (
          <tr key={element.id}>
            <td>
              <input
                type="checkbox"
                checked={element.selected}
                onChange={() => toggleCheckbox(element.id)}
              />
            </td>
            <td style={{ textAlign: 'center' }}>{element.category}</td>
            <td style={{ textAlign: 'left' }}>{element.name}</td>
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
  );
}

export default EnergyTable;

