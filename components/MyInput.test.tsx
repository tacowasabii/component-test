import * as React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import MyInput from "./MyInput";

describe("MyInput", () => {
  it("should render correctly", () => {
    // MyInput 컴포넌트를 렌더링합니다.
    const { unmount } = render(<MyInput />);
    // wrapper.unmount() 함수를 호출해도 에러가 발생하지 않는지 확인합니다.
    expect(unmount).not.toThrow();
  });

  it("should clear the value and onClear is triggered", () => {
    // 필요하다면 jest mock 함수나 ref를 생성합니다.
    const handleClick = jest.fn();
    const ref = React.createRef<HTMLInputElement>();
    // MyInput 컴포넌트를 렌더링합니다.
    const { getByRole } = render(<MyInput isClearable ref={ref} onClear={handleClick} defaultValue="test"/>);
    // clearButton 있는지
    expect(handleClick).not.toBeNull();
    // clearButton을 클릭합니다.
    fireEvent.click(getByRole("button"));
    // input 요소의 값이 ""인지 확인합니다.
    expect(ref.current?.value).toBe("");   
    // onClear 함수가 한 번 호출되었는지 확인합니다.
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});