import { render, fireEvent } from "@testing-library/react";
import renderer from "react-test-renderer";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});

it("left arrow moves to previous image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="Test Title" />
  );

  // Click right arrow to move to the second image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // Click left arrow to move back to the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // Expect the first image to be displayed again
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
});

it("left arrow is missing on first image, right arrow is missing on last image", function () {
  const { container } = render(
    <Carousel photos={TEST_IMAGES} title="Test Title" />
  );

  // Expect the left arrow to be missing on the first image
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  expect(leftArrow).toBeNull();

  // Click right arrow to move to the last image
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // Expect the right arrow to be missing on the last image
  const updatedRightArrow = container.querySelector(".bi-arrow-right-circle");
  expect(updatedRightArrow).toBeNull();
});

it("renders without crashing", function () {
  render(<Carousel photos={TEST_IMAGES} title="Test Title" />);
});

it("matches snapshot", function () {
  const tree = renderer
    .create(<Carousel photos={TEST_IMAGES} title="Test Title" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
