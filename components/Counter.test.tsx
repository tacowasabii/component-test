import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter", () => {
  it("should render correctly", () => {
    const { getByTestId } = render(<Counter />);
    expect(getByTestId("count")).toHaveTextContent("Clicked 0 times");
  });

  it("should increment count", () => {
    const { getByRole, getByTestId } = render(<Counter />);
    const incrementButton = getByRole("button");
    fireEvent.click(incrementButton);
    fireEvent.click(incrementButton);
    expect(getByTestId("count")).toHaveTextContent("Clicked 2 times");
  });

  describe("title test", () => {
    beforeEach(() => {
      // title을 먼저 설정하고 Counter를 렌더 해줘야 함
      // const initialTitleRef = useRef(document.title); 이거땜에
      document.title = "origin title";
      render(<Counter />);
    });
    it.only("should checkBox not to be checked in start", () => {
      const checkBox = screen.getByLabelText(
        "Check to display count in document title"
      );
      expect(checkBox).not.toBeChecked();
      expect(document.title).toBe("origin title");
    });

    it("should checkBox to be checked in start when user press checkbox", () => {
      const checkBox = screen.getByLabelText(
        "Check to display count in document title"
      );
      fireEvent.click(checkBox);
      expect(checkBox).toBeChecked();
      expect(document.title).toBe("Total number of clicks: 0");
    });

    it("should document title appear when user press checkbox and increment button 1 time", () => {
      const checkBox = screen.getByLabelText(
        "Check to display count in document title"
      );
      fireEvent.click(checkBox);
      const incrementButton = screen.getByText("Increment");
      fireEvent.click(incrementButton);
      expect(document.title).toBe("Total number of clicks: 1");
    });

    it("should document title appear when user press checkbox and increment button 2 times", () => {
      const checkBox = screen.getByLabelText(
        "Check to display count in document title"
      );
      fireEvent.click(checkBox);
      const incrementButton = screen.getByText("Increment");
      fireEvent.click(incrementButton);
      expect(document.title).toBe("Total number of clicks: 1");
    });

    it("should document origin title appear when user press checkbox twice", () => {
      const checkBox = screen.getByLabelText(
        "Check to display count in document title"
      );
      fireEvent.click(checkBox);
      fireEvent.click(checkBox);
      expect(checkBox).not.toBeChecked();
      expect(document.title).toBe("origin title");
    });
  });
});
