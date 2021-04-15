import { withStyles }  from '@material-ui/core/styles';
import React           from 'react';
import { connect }     from 'react-redux';
import { compose }     from 'recompose';
import config          from '../config';


/**
 * This is a page wrapper that does the following things:
 * - connect the component to redux
 * - connect the component to i18next
 * - Add MUI styles
 * @param Component
 * @param {function} mapStateToProps: you know what it is
 * @param {object} styles: custom component styles
 * @param {boolean} withTheme: define if the prop 'theme' containing the app theme should be injected into the component
 * @returns {*}
 */

const pageWrapper = (Component, {
  mapStateToProps = null,
  styles = {},
  withTheme = false,
} = {}) => {

  const args = [
    connect(mapStateToProps),
    withStyles(styles, { withTheme: withTheme }),
  ];

  return compose(...args)(Component);
};

export default pageWrapper;
