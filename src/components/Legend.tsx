import React from "react";
import PropTypes from "prop-types";
import { FONT_FAMILY, FONT_SIZE, FONT_COLOR } from "../enums";
import { Dimensions } from "../types";
import { dimensionsPropsType } from "../utils";

export interface LegendProps {
  categories: string[];
  scale: (category: string) => string;
  dimensions: Dimensions;
}

export const Legend = ({
  categories,
  scale,
  dimensions,
}: LegendProps): JSX.Element => (
  <g transform={`translate(${dimensions.margins.left + 25}, 25)`}>
    {categories.map((category, i) => (
      <g key={category} transform={`translate(0, ${i * 20})`}>
        <rect height="10" width="10" fill={scale(category)} />
        <text
          dominantBaseline="middle"
          y="5"
          x="20"
          fontFamily={FONT_FAMILY}
          fontSize={FONT_SIZE}
          fill={FONT_COLOR}
        >
          {category}
        </text>
      </g>
    ))}
  </g>
);

Legend.displayName = "Legend";

Legend.propTypes = {
  dimensions: dimensionsPropsType,
  scale: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

Legend.defaultProps = {};
