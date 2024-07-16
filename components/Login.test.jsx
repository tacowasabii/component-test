import axios from "axios";
import Login from "./Login";
import { fireEvent } from "@testing-library/dom";
import { render } from "@testing-library/react";

jest.mock("axios");

describe("api success test", () => {
  beforeEach(() => {
    localStorage.removeItem("token");
  });

  test("is api work", async () => {
    const fakeUsertoken = { token: "fakeToken" };
    const response = { data: fakeUsertoken };

    axios.post.mockResolvedValue(response);

    const { getByLabelText, getByRole, findByRole } = render(<Login />);

    fireEvent.change(getByLabelText(/Username/i), {
      target: {
        value: "taco",
      },
    });
    fireEvent.change(getByLabelText(/Password/i), {
      target: {
        value: "1234",
      },
    });

    fireEvent.click(getByRole("button"));

    const alert = await findByRole("alert");
    const token = localStorage.getItem("token");

    expect(alert).toHaveTextContent(/congrat/i);
    expect(token).toEqual(fakeUsertoken.token);
  });

  test("api failure test", async () => {
    const response = { message: "Internal Server Error" };

    axios.post.mockRejectedValue(response);

    const { getByRole, findByRole } = render(<Login />);

    fireEvent.click(getByRole("button"));

    const alert = await findByRole("alert");

    expect(alert).toHaveTextContent(response.message);
    expect(localStorage.getItem("token")).toBeNull();
  });
});
