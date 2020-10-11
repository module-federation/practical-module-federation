import React from "react";
import variants from "ab-manager/variants";

const chooseVariant = (test) =>
  variants[test][Math.floor(Math.random() * variants[test].length)];

const VariantChooser = ({ test, variant, variations, ...props }) => {
  const [testVariant] = React.useState(variant || chooseVariant(test));
  const Component = variations[testVariant];
  return (
    <React.Suspense fallback={<div>Loading variant</div>}>
      <Component {...props} />
    </React.Suspense>
  );
};

export default VariantChooser;
