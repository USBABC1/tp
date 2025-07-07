import React from "react";

export default function CampoSimNao({ 
  label, 
  value, 
  onChange, 
  textField, 
  textValue, 
  onTextChange 
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="text-white font-medium text-sm mb-3 block">
          {label}
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={`radio-${label}`}
              checked={value === true}
              onChange={() => onChange(true)}
              className="w-4 h-4 text-emerald-600 bg-white/20 border-white/30 focus:ring-emerald-500"
            />
            <span className="text-white">Sim</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name={`radio-${label}`}
              checked={value === false}
              onChange={() => onChange(false)}
              className="w-4 h-4 text-emerald-600 bg-white/20 border-white/30 focus:ring-emerald-500"
            />
            <span className="text-white">Não</span>
          </label>
        </div>
      </div>
      
      {textField && value === true && (
        <div>
          <label className="text-white font-medium text-sm mb-2 block">
            {textField}
          </label>
          <input
            type="text"
            value={textValue || ""}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full px-3 py-2 glass-input rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      )}
    </div>
  );
}