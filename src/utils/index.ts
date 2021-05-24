import PropTypes from "prop-types";

export const dimensionsPropsType = PropTypes.exact({
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  margins: PropTypes.exact({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
}).isRequired;
