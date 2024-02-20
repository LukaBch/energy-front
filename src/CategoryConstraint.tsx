import { ComputedAppliance } from "./types";

type CategoryConstraintProps = {
  isResultHidden: boolean;
  donnees: ComputedAppliance[];
  applianceIds: number[];
  minBoundary: number;
  maxBoundary: number;
  title: string;
};

function CategoryConstraint({
  isResultHidden,
  donnees,
  applianceIds,
  minBoundary,
  maxBoundary,
  title,
}: CategoryConstraintProps) {
  const selectedAppliances = donnees.filter((donnee) => donnee.selected);

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <div style={{ marginRight: '50px' }}>{title}</div>
      <div>{minBoundary}</div>
      <div>&#8804;</div>
      <div style={{ display: 'flex', width: '100px', justifyContent: 'center', gap: '5px' }}>
        {isResultHidden || selectedAppliances.every((donnee) => !applianceIds.includes(donnee.id)) ? (
          '...'
        ) : (
          applianceIds.map((applianceId, index, array) => (
            <div style={{ display: 'flex', gap: '5px' }} key={applianceId}>
              <div>{donnees.find((donnee: ComputedAppliance) => donnee.id === applianceId)!.hours}</div>
              {index < array.length - 1 && <div>+</div>}
            </div>
          ))
        )}
      </div>
      <div>&#8804;</div>
      <div>{maxBoundary}</div>
    </div>
  );
}

export default CategoryConstraint;
