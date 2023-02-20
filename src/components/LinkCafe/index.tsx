import { IconMinus } from "@tabler/icons-react";
import React, { useEffect, useMemo, useState } from "react";

export default function LinkCafe({ value, onChange }) {
  const [internalValue, setActualInternalValue] = useState(value);

  const setInternalValue = (val) => {
    onChange(val);
  };

  useMemo(() => {
    setActualInternalValue(value);
  }, [value]);

  // useEffect(() => {
  //  onChange(internalValue);
  // }, [internalValue]);

  useEffect(() => {
    // setInternalValue(value);
  }, [value]);

  function handleTChange(i, event) {
    const values = [...internalValue];
    const { text, ...oldValues } = values[i];
    values[i] = { text: event.target.value, ...oldValues };
    setInternalValue(values);
  }

  function handleSChange(i, event) {
    const values = [...internalValue];
    const { type, ...oldValues } = values[i];
    values[i] = { type: event.target.value, ...oldValues };
    setInternalValue(values);
  }

  function addClick() {
    setInternalValue((prevState) => [
      ...prevState,
      { type: undefined, text: "" },
    ]);
  }

  function removeClick(i) {
    const values = [...internalValue];
    values.splice(i, 1);
    setInternalValue(values);
  }

  return (
    <div>
      {internalValue.map((el, i) => {
        return (
          <div key={i}>
            <div className="form-control pb-4">
              <label className="input-group">
                <select
                  value={el.type}
                  onChange={handleSChange.bind(this, i)}
                  className="select select-bordered w-3/8"
                >
                  <option value="invalid" disabled selected>
                    Link Type
                  </option>
                  <option value="other">Other</option>
                  <option value="github">Github</option>
                  <option value="buymeacoffee">Buy Me A Coffee</option>
                  <option value="cashlink">Direct Contribution Link</option>
                </select>
                <input
                  value={el.text}
                  onChange={handleTChange.bind(this, i)}
                  type="text"
                  placeholder="https://.../"
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  value="remove"
                  onClick={removeClick.bind(this, i)}
                  className="btn btn-outline btn-error"
                >
                  <IconMinus className="h-6 w-6" />
                </button>
              </label>
            </div>
          </div>
        );
      })}
      <input
        className="input input-bordered border-dashed w-full"
        onClick={(event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
          event.preventDefault();
          event.stopPropagation();
          event.currentTarget.blur();
          addClick();
        }}
        placeholder="Add Link"
      />
    </div>
  );
}
