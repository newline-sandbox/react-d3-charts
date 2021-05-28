import React from "react";
import { Story, Meta } from "@storybook/react";

import { Scatterplot, ScatterplotProps } from "../components/Scatterplot";

export default {
  title: "Example/Scatterplot",
  component: Scatterplot,
} as Meta;

const BASE_ARGS = {
  dimensions: {
    get width() {
      return 560 - this.margins.left - this.margins.right;
    },
    get height() {
      return 500 - this.margins.top - this.margins.bottom;
    },
    margins: {
      top: 10,
      right: 30,
      bottom: 75,
      left: 60,
    },
  },
  labels: {
    xAxis: "Petal Length (cm.)",
    yAxis: "Petal Width (cm.)",
  },
  xAccessorKey: "x",
  yAccessorKey: "y",
};

interface TemplateProps extends ScatterplotProps {
  isEmpty?: boolean;
}

const Template: Story<TemplateProps> = ({ isEmpty, ...args }, { loaded }) => {
  return (
    <Scatterplot
      {...args}
      data={isEmpty ? args.data : loaded ? loaded.scatterplotData : args.data}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  ...BASE_ARGS,
};

export const Empty = Template.bind({});
Empty.args = {
  ...BASE_ARGS,
  isEmpty: true,
};

export const Legend = Template.bind({});
Legend.args = {
  ...BASE_ARGS,
  categoryKey: "species",
  categoryColors: ["#754668", "#982649", "#9395d3"],
};
