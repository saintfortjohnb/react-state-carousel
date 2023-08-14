import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import Card from "./Card";

it("renders without crashing", function () {
  render(
    <Card
      caption="Test Caption"
      src="test.com/image.jpg"
      currNum={1}
      totalNum={3}
    />
  );
});

it("matches snapshot", function () {
  const tree = renderer
    .create(
      <Card
        caption="Test Caption"
        src="test.com/image.jpg"
        currNum={1}
        totalNum={3}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
