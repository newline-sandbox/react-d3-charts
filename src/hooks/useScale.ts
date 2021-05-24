import { useMemo } from "react";
import { extent } from "d3-array";
import { scaleLinear } from "d3-scale";

const useScale = (params) => {
  return useMemo(() => {
    if (!params) {
      return null;
    }

    const { data, accessorKey, domain, range, scaleFn, isRangeRound, padding } =
      params;
    let scaleChain = scaleFn ? scaleFn : scaleLinear;

    // Domain
    scaleChain = scaleChain().domain(
      domain ? domain : extent(data, (d) => d[accessorKey])
    );

    // Range
    if (isRangeRound) {
      // Apply spacing between bars in bar chart.
      scaleChain = scaleChain.rangeRound(range).padding(padding ? padding : 0);
    } else {
      scaleChain = scaleChain.range(range);
    }

    return scaleChain;
  }, [params]);
};

export default useScale;
