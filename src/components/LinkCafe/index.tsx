import { IconMinus } from "@tabler/icons-react";
import React, { MouseEventHandler, useState } from "react";

export default function LinkCafe(value, onChange) {
  const [internalValue, setInternalValue] = useState([]);

  function handleChange(i, event) {
    let values = [...internalValue];
    values[i] = event.target.value;
    setInternalValue(values);
  }

  function addClick() {
    setInternalValue((prevState) => [...prevState, ""]);
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
                <select className="select select-bordered w-3/8">
                  <option disabled selected>
                    Who shot first?
                  </option>
                  <option>Han Solo</option>
                  <option>Greedo</option>
                </select>
                <input
                  value={el || ""}
                  onChange={handleChange.bind(this, i)}
                  type="text"
                  placeholder="info@site.com"
                  className="input input-bordered w-full"
                />
                <button
                  type="button"
                  value="remove"
                  onClick={removeClick.bind(this, i)}
                  className="btn btn-outline"
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
