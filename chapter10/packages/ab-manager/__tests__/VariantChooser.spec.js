import React from "react";
import renderer from "react-test-renderer";
import VariantChooser from "../src/VariantChooser";

it("Should pick variant A", () => {
  const VariantA = () => <div>A</div>;
  const tree = renderer
    .create(
      <VariantChooser
        variations={{
          a: VariantA,
        }}
        variant="a"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("Should pick variant A", () => {
  const VariantB = () => <div>B</div>;
  const tree = renderer
    .create(
      <VariantChooser
        variations={{
          b: VariantB,
        }}
        variant="b"
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
