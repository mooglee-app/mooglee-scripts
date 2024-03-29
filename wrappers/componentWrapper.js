import { withStyles }                   from '@material-ui/core/styles';
import withUIWidth                      from '@material-ui/core/withWidth';
import { withRouter as withNextRouter } from 'next/router';
import { connect }                      from 'react-redux';
import { compose }                      from 'recompose';
import config                           from '../config';
import { withTranslation }              from '../lib/i18n';


/**
 * This is a component wrapper that does the following things:
 * - connect the component to redux
 * - inject pageData after having fetching it from the API
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
 * @param {array} namespaces: custom namespaces that can be added to i18next
 * @returns {*}
 */
export default function componentWrapper(Component, {
  mapStateToProps = null,
  styles = {},
  isTranslatable = false,
  isConnected = false,
  hasStyles = true,
  withTheme = false,
  withWidth = false,
  withRouter = false,
  namespaces = [],
} = {}) {
  const args = [
    ...((isConnected || typeof mapStateToProps === 'function') ? [connect(mapStateToProps)] : []),
    ...((hasStyles || typeof styles === 'object') ? [withStyles(styles, { withTheme: withTheme })] : []),
    ...(withWidth ? [withUIWidth({ initialWidth: 'lg', withTheme })] : []),
    ...((config.lang.enabled && isTranslatable) ? [withTranslation([config.lang.defaultNamespace, ...namespaces])] : []),
    ...(withRouter ? [withNextRouter] : []),
  ];

  return compose(...args)(Component);
};
