import React from "react";
import PropTypes from "prop-types";
import { FONT_FAMILY, FONT_SIZE, FONT_COLOR, AXIS_COLOR } from "../enums";
import { Dimensions } from "../types";
import { dimensionsPropsType } from "../utils";

export interface XAxisProps {
  dimensions: Dimensions;
  label: string;
  scale: {
    (tick: string | number | Date): number;
    ticks(count?: number): number[];
  };
  ticks?: (string | number | Date)[];
  ticksCount?: number;
}

export const XAxis = ({
  dimensions,
  label,
  scale,
  ticks,
  ticksCount,
}: XAxisProps): JSX.Element => (
  <g
    transform={`translate(${dimensions.margins.left}, ${
      dimensions.height - (dimensions.margins.bottom - dimensions.margins.top)
    })`}
  >
    {(ticks ? ticks : scale.ticks(ticksCount)).map((tick, i) => (
      <g key={`${tick}-${i}`} transform={`translate(${scale(tick)} 0)`}>
        <line stroke={AXIS_COLOR} y1="5" y2="0" />
        <text
          fill={FONT_COLOR}
          y="20"
          textAnchor="middle"
          fontFamily={FONT_FAMILY}
          fontSize={FONT_SIZE}
        >
          {tick}
        </text>
      </g>
    ))}
    <path fill={AXIS_COLOR} d={`M0,2V0H${dimensions.width}V2`}></path>
    <text
      fill={FONT_COLOR}
      x={`${
        dimensions.width / 2 -
        dimensions.margins.left -
        dimensions.margins.right
      }`}
      y={`${dimensions.margins.bottom - 15}`}
      fontFamily={FONT_FAMILY}
      fontSize={FONT_SIZE}
    >
      {label}
    </text>
  </g>
);

XAxis.displayName = "XAxis";

XAxis.propTypes = {
  dimensions: dimensionsPropsType,
  label: PropTypes.string.isRequired,
  scale: PropTypes.func.isRequired,
  ticks: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.instanceOf(Date),
    ])
  ),
  ticksCount: PropTypes.number,
};

XAxis.defaultProps = {};
