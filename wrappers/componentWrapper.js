import { withStyles }                   from '@material-ui/core/styles';
import withUIWidth                      from '@material-ui/core/withWidth';
import { withRouter as withNextRouter } from 'next/router';
import { connect }                      from 'react-redux';
import { compose }                      from 'recompose';
import config                           from '../config';


/**
 * This is a component wrapper that does the following things:
 * - connect the component to redux
 * - Add MUI styles
 * @param Component
 * @param {function} mapStateToProps: you know what it is
 * @param {object} styles: custom component styles
 * @param {boolean} isTranslatable: defines if the component should be translatable (will add the 't' function)
 * @param {boolean} isConnected: defines if the component should be connected to redux store
 * @param {boolean} hasStyles: defines if the component uses MUI styles
 * @param {boolean} withTheme: defines if the theme should be injected to the component's props
 * @param {boolean} withWidth: defines if the current screen size breakpoint should be injected to the component's props
 * @param {boolean} withRouter: inject the pathname, query and asPath into the component
 * @returns {*}
 */
const componentWrapper = (Component, {
  mapStateToProps = null,
  styles = {},
  isConnected = false,
  hasStyles = true,
  withTheme = false,
  withWidth = false,
  withRouter = false,
} = {}) => {
  const args = [
    ...((isConnected || typeof mapStateToProps === 'function') ? [connect(mapStateToProps)] : []),
    ...((hasStyles || typeof styles === 'object') ? [withStyles(styles, { withTheme: withTheme })] : []),
    ...(withWidth ? [withUIWidth({ initialWidth: 'lg', withTheme })] : []),
    ...(withRouter ? [withNextRouter] : []),
  ];

  return compose(...args)(Component);
};

export default componentWrapper;
