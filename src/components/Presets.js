import React, { useState } from "react";
import PresetForm from "./PresetForm";

function LifeForm({ preset, index, removePreset }) {
  return (
    <>
      <div className="form-container" key={index}>
        <p>{preset.name}</p>
        <p>{preset.description}</p>
      </div>
      <button onClick={() => removePreset(index)}>Delete</button>
    </>
  );
}

const Presets = (props) => {
  const [presets, setPreset] = useState([
    // { name: "Glider" },
    { name: "GliderGun" },
  ]);

  const addPreset = (name) => {
    const newPresets = [...presets, { name }];
    setPreset(newPresets);
  };

  const removePreset = (index) => {
    const newPresets = [...presets];
    newPresets.splice(index, 1);
    setPreset(newPresets);
  };

  return (
    <div className="form-container">
      {presets.map((preset, index) => {
        return (
          <LifeForm
            key={index}
            index={index}
            preset={preset}
            removePreset={removePreset}
            style={{ color: "black" }}
          />
        );
      })}
      <PresetForm addPreset={addPreset} />
    </div>
  );
};
export default Presets;
