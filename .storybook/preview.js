import { csv } from "d3-fetch";
import { nanoid } from "nanoid";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const fetchScatterplotData = async () => {
  try {
    return await csv(
      "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv",
      ({ petal_length: x, petal_width: y, species }) => ({
        id: nanoid(),
        x: +x,
        y: +y,
        species,
      })
    );
  } catch (err) {
    console.error(err);

    return [];
  }
};

export const loaders = [
  async () => ({
    scatterplotData: await fetchScatterplotData(),
  }),
];
