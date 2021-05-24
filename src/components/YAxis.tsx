import React from "react";
import PropTypes from "prop-types";
import { FONT_FAMILY, FONT_SIZE, FONT_COLOR, AXIS_COLOR } from "../enums";
import { Dimensions } from "../types";
import { dimensionsPropsType } from "../utils";

export interface YAxisProps {
  dimensions: Dimensions;
  label: string;
  scale: {
    (tick: string | number | Date): number;
    ticks(count?: number): number[];
  };
  ticks?: number[];
  ticksCount?: number;
}

export const YAxis = ({
  dimensions,
  label,
  scale,
  ticks,
  ticksCount,
}: YAxisProps): JSX.Element => (
  <g transform={`translate(${dimensions.margins.left}, 0)`}>
    {(ticks ? ticks : scale.ticks(ticksCount)).map((tick, i) => (
      <g key={`${tick}-${i}`} transform={`translate(0, ${scale(tick)})`}>
        <line stroke={AXIS_COLOR} x1="-5" x2="0" />
        <text
          fill={FONT_COLOR}
          x="-10"
          dominantBaseline="middle"
          textAnchor="end"
          fontFamily={FONT_FAMILY}
          fontSize={FONT_SIZE}
        >
          {tick}
        </text>
      </g>
    ))}
    <path
      fill={AXIS_COLOR}
      d={`M-2,0H0V${
        dimensions.height - (dimensions.margins.bottom - dimensions.margins.top)
      }H-2`}
    ></path>
    <text
      fill={FONT_COLOR}
      x={`${(dimensions.height / 2) * -1}`}
      y={`${15 - dimensions.margins.left}`}
      transform="rotate(-90)"
      textAnchor="middle"
      fontFamily={FONT_FAMILY}
      fontSize={FONT_SIZE}
    >
      {label}
    </text>
  </g>
);

YAxis.displayName = "YAxis";

YAxis.propTypes = {
  dimensions: dimensionsPropsType,
  label: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  ticks: PropTypes.arrayOf(PropTypes.number),
  ticksCount: PropTypes.number,
};

YAxis.defaultProps = {};
