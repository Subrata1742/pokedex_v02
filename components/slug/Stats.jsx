import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const Stats = ({ P }) => {
  const chartData = P.stats.map((s) => ({
    ...s,
    name: formatStatName(s.name),
  }));
  function formatStatName(name) {
    const mapping = {
      "special-attack": "Sp.Atk",
      "special-defense": "Sp.Def",
      hp: "HP",
      speed: "Speed",
    };
    return mapping[name] || name.charAt(0).toUpperCase() + name.slice(1);
  }
  return (
    <div className="flex flex-col h-full w-full">
      <div className="text-white text-center text-2xl text-bold">
        Stats Overview
      </div>
      <ResponsiveContainer width="100%" height={280} className="my-6">
        <RadarChart data={chartData}>
          <PolarGrid stroke="#64748b" />
          <PolarAngleAxis dataKey="name" stroke="#f1f5f9" />
          <Radar
            name={P.name}
            dataKey="value"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.6}
          />{" "}
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const { name, value } = payload[0].payload;
                return (
                  <div className="rounded-lg bg-slate-800 px-3 py-2 shadow-lg text-sm text-white">
                    <p className="font-semibold text-yellow-400">{name}</p>
                    <p className="text-slate-200">Value: {value}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Stats;
