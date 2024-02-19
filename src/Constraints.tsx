type ConstraintsProps = {
  isResultHidden: boolean;
  donnees: any;
};

function Constraints({
  isResultHidden,
  donnees
}: ConstraintsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ marginRight: '50px' }}>Category F</div>
        <div>6</div>
        <div>&#8804;</div>
        <div style={{ display: 'flex', width: '100px', justifyContent: 'center' }}>
          {isResultHidden ? '...' : (
            <>
              <div>{donnees.find((donnee: any) => donnee.id === 1)!.hours}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 2)!.hours}</div>
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
          {isResultHidden ? '...' : (
            <>
              <div>{donnees.find((donnee: any) => donnee.id === 3)!.hours}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 4)!.hours}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 5)!.hours}</div>
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
          {isResultHidden ? '...' : (
            <>
              <div>{donnees.find((donnee: any) => donnee.id === 6)!.hours}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 7)!.hours}</div>
              <div>+</div>
              <div>{donnees.find((donnee: any) => donnee.id === 8)!.hours}</div>
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

