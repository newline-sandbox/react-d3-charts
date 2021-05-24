import React, { forwardRef, ComponentPropsWithoutRef } from "react";
import PropTypes from "prop-types";
import { TICKS_COUNT } from "../enums";
import useColorScale from "../hooks/useColorScale";
import useScale from "../hooks/useScale";
import { Legend } from "./Legend";
import { XAxis } from "./XAxis";
import { YAxis } from "./YAxis";
import { Dimensions } from "../types";
import { dimensionsPropsType } from "../utils";

interface DataRecord {
  id: string;
  [key: string]: string | number;
}

interface Labels {
  xAxis: string;
  yAxis: string;
}

export interface ScatterplotProps extends ComponentPropsWithoutRef<"svg"> {
  /**
   * A class name (or names, spaced out) to add to the root <svg /> element.
   */
  className?: string;
  /**
   * A list of records to plot on a scatterplot.
   */
  data: DataRecord[];
  /**
   * An object with the scatterplot's dimensions (height, width and margins).
   */
  dimensions: Dimensions;
  /**
   * A mapping of labels to axes.
   */
  labels: Labels;
  /**
   * A key to access a record's category.
   */
  categoryKey?: string;
  /**
   * A list of colors to visually differentiate categories.
   */
  categoryColors?: string[];
  /**
   * A key to access data corresponding to the independent variable within a record.
   */
  xAccessorKey: string;
  /**
   * A key to access data corresponding to the dependent variable within a record.
   */
  yAccessorKey: string;
  /**
   * A number to determine how many ticks to mark along the x-axis.
   */
  xAxisTicksCount?: number;
  /**
   * A number to determine how many ticks to mark along the y-axis.
   */
  yAxisTicksCount?: number;
}

/**
 * Scatterplot visualization component.
 */
export const Scatterplot = forwardRef<SVGSVGElement, ScatterplotProps>(
  (
    {
      className,
      data,
      dimensions,
      labels,
      categoryKey,
      categoryColors,
      xAccessorKey,
      yAccessorKey,
      xAxisTicksCount,
      yAxisTicksCount,
    },
    ref
  ) => {
    const xScale = useScale({
      data,
      accessorKey: xAccessorKey,
      range: [
        dimensions.margins.left,
        dimensions.width - dimensions.margins.right,
      ],
    });

    const yScale = useScale({
      data,
      accessorKey: yAccessorKey,
      range: [
        dimensions.height - dimensions.margins.bottom,
        dimensions.margins.top,
      ],
    });

    const { categories, colorScale } = useColorScale({
      data,
      key: categoryKey,
      colors: categoryColors,
    });

    return (
      <svg
        ref={ref}
        className={className}
        width={`${dimensions.width}px`}
        height={`${dimensions.height}px`}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        {xScale && yScale ? (
          <>
            <g transform={`translate(${dimensions.margins.left}, 0)`}>
              {data.map((d) => (
                <circle
                  key={d.id}
                  r="3"
                  cx={xScale(d[xAccessorKey])}
                  cy={yScale(d[yAccessorKey])}
                  fill={
                    categoryKey && colorScale
                      ? colorScale(d[categoryKey])
                      : "black"
                  }
                />
              ))}
            </g>
            <XAxis
              dimensions={dimensions}
              label={labels.xAxis}
              scale={xScale}
              ticksCount={xAxisTicksCount || TICKS_COUNT}
            />
            <YAxis
              dimensions={dimensions}
              label={labels.yAxis}
              scale={yScale}
              ticksCount={yAxisTicksCount || TICKS_COUNT}
            />
            {colorScale && (
              <Legend
                categories={categories}
                scale={colorScale}
                dimensions={dimensions}
              />
            )}
          </>
        ) : null}
      </svg>
    );
  }
);

Scatterplot.displayName = "Scatterplot";

Scatterplot.propTypes = {
  className: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  dimensions: dimensionsPropsType,
  labels: PropTypes.exact({
    xAxis: PropTypes.string.isRequired,
    yAxis: PropTypes.string.isRequired,
  }).isRequired,
  categoryKey: PropTypes.string,
  categoryColors: PropTypes.arrayOf(PropTypes.string.isRequired),
  xAccessorKey: PropTypes.string.isRequired,
  yAccessorKey: PropTypes.string.isRequired,
  xAxisTicksCount: PropTypes.number,
  yAxisTicksCount: PropTypes.number,
};

Scatterplot.defaultProps = {
  data: [],
};
