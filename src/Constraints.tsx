import CategoryConstraint from "./CategoryConstraint";
import { Appliance } from "./types";

type ConstraintsProps = {
  isResultHidden: boolean;
  donnees: Appliance[];
};

function Constraints({
  isResultHidden,
  donnees
}: ConstraintsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
      <CategoryConstraint
        isResultHidden={isResultHidden}
        donnees={donnees}
        applianceIds={[1, 2]}
        minBoundary={6}
        maxBoundary={8}
      />
      <CategoryConstraint
        isResultHidden={isResultHidden}
        donnees={donnees}
        applianceIds={[3, 4, 5]}
        minBoundary={1}
        maxBoundary={4}
      />
      <CategoryConstraint
        isResultHidden={isResultHidden}
        donnees={donnees}
        applianceIds={[6, 7, 8]}
        minBoundary={4}
        maxBoundary={24}
      />
    </div>
  );
}

export default Constraints;

