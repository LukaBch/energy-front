import CategoryConstraint from "./CategoryConstraint";
import constants from "./constants";
import { ComputedAppliance, Category } from "./types";

type ConstraintsProps = {
  isResultHidden: boolean;
  donnees: ComputedAppliance[];
};

function Constraints({
  isResultHidden,
  donnees
}: ConstraintsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
      {constants.categories.map((category) => {
        const appliances = constants.appliances.filter(appliance => appliance.category === category);
        const boundaries = constants.boundaries[category];
        return <CategoryConstraint
          key={category}
          isResultHidden={isResultHidden}
          donnees={donnees}
          applianceIds={appliances.map(appliance => appliance.id)}
          minBoundary={boundaries["min"]}
          maxBoundary={boundaries["max"]}
          title={`Category ${category}`}
        />
      }
      )}
    </div>
  );
}

export default Constraints;

