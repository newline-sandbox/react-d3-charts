import styled from "styled-components";
import { FONT_FAMILY, FONT_SIZE, FONT_COLOR, AXIS_COLOR } from "../enums";

export const StyledText = styled.text`
  fill: ${FONT_COLOR};
  font-family: ${FONT_FAMILY};
  font-size: ${FONT_SIZE};
`;

export const StyledLine = styled.line`
  stroke: ${AXIS_COLOR};
`;

export const StyledPath = styled.path`
  fill: ${AXIS_COLOR};
`;
