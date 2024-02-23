import CategoryConstraint from "./CategoryConstraint";
import { Boundaries, Category, ComputedAppliance } from "./types";

type ConstraintsProps = {
  isResultHidden: boolean;
  computedAppliances: ComputedAppliance[];
  boundaries: Boundaries;
};

function Constraints({
  isResultHidden,
  computedAppliances,
  boundaries
}: ConstraintsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', marginTop: '50px' }}>
      {
        Object.keys(boundaries).map((category: string) => {
          const appliances = computedAppliances.filter(appliance => appliance.category === category);
          const categoryBoundaries = boundaries[category as Category];

          return (
            <CategoryConstraint
              key={category}
              isResultHidden={isResultHidden}
              computedAppliances={computedAppliances}
              applianceIds={appliances.map(appliance => appliance.id)}
              minBoundary={categoryBoundaries["min"]}
              maxBoundary={categoryBoundaries["max"]}
              title={`Category ${category}`}
            />
          );
        })
      }
    </div>
  );
}

export default Constraints;
