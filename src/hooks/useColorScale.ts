import { useMemo } from "react";
import { scaleOrdinal } from "d3-scale";
import useScale from "./useScale";

const useColorScale = ({ data, key, colors }) => {
  const categories = useMemo(
    () => (key && colors ? Array.from(new Set(data.map((d) => d[key]))) : []),
    [data, key, colors]
  );

  const colorScale = useScale(
    key && colors
      ? {
          data,
          domain: categories,
          range: colors,
          scaleFn: scaleOrdinal,
        }
      : null
  );

  return { categories, colorScale };
};

export default useColorScale;
