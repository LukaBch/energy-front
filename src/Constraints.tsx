type ConstraintsProps = {
  isFetchingResults: boolean;
  donnees: any;
};

function Constraints({
  isFetchingResults,
  donnees
}: ConstraintsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ marginRight: '50px' }}>Category F</div>
        <div>6</div>
        <div>&#8804;</div>
        <div style={{ display: 'flex', width: '100px', justifyContent: 'center' }}>
          {isFetchingResults ? '...' : (
            <>
              <div>{donnees.find((donnee: any) => donnee.id === 1)!.energy}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 2)!.energy}</div>
            </>
          )}
        </div>
        <div>&#8804;</div>
        <div>8</div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ marginRight: '50px' }}>Category A</div>
        <div>1</div>
        <div>&#8804;</div>
        <div style={{ display: 'flex', width: '100px', justifyContent: 'center' }}>
          {isFetchingResults ? '...' : (
            <>
              <div>{donnees.find((donnee: any) => donnee.id === 3)!.energy}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 4)!.energy}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 5)!.energy}</div>
            </>
          )}
        </div>
        <div>&#8804;</div>
        <div>4</div>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ marginRight: '50px' }}>Category L</div>
        <div>4</div>
        <div>&#8804;</div>
        <div style={{ display: 'flex', width: '100px', justifyContent: 'center' }}>
          {isFetchingResults ? '...' : (
            <>
              <div>{donnees.find((donnee: any) => donnee.id === 6)!.energy}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 7)!.energy}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 8)!.energy}</div>
            </>
          )}
        </div>
        <div>&#8804;</div>
        <div>24</div>
      </div>
    </div>
  );
}

export default Constraints;

