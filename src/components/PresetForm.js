import React, { useState } from "react";

const PresetForm = ({ addPreset }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addPreset(value);
    setValue("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <br />
        <h4>Create life forms for Game with link to its [x,y] values:</h4>
        <label>Name </label>
        <input
          type="text"
          className="input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <br />
      </form>
      <br />
      <button className="run" type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
};

export default PresetForm;
