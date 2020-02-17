import { withStyles } from '@material-ui/core/styles';
import PropTypes      from 'prop-types';
import React          from 'react';
import config         from '../config';
import Head           from './Head';


const styles = theme => ({
  root: {
    background: theme.palette.background.primary,
  },
});


/**
 *  This component is a simple page layout that must be added to every page of the app.
 *  Note that in order to work properly, it needs a 'pageData' prop that contains
 *  all the information about the current page (those information have generally been fetched from an API but it can also
 *  be a simple config file or anything else). This prop will principally be used for SEO purpose, like generating the page <head>
 *  tag with some metas, title, etc.
 *
 *  Note that all other props passed to this component (except 'children' of course) will be passed
 *  to the Head component. It means that you can easily override some pageData properties like title for example.
 * @param props
 * @returns {*}
 */
const PageLayout = withStyles(styles)(function Layout(props) {

  let {
        Header, // A component to be used as a header
        Footer, // A component to be used as a footer
        pageData, // The pageData object received by the component
        children, // the page content
        backgroundColor, // The background color of the page
        classes,
        ...rest
      } = props;

  // Display an error if pageData is not defined or if it contains an error
  if (!pageData || pageData.error) {
    const error   = pageData.error || {};
    const message = (process.env.NODE_ENV === 'development' && error.devMessage)
      ? error.devMessage
      : error.message;
    const e       = new Error(message);
    e.code        = 'ENOENT';  // Triggers a 404

    if (process.env.NODE_ENV === 'development') {
      console.warn(
        '\nNo `pageData` prop have been passed to the `PageLayout` component of your page.\nThis will end with a 404 redirection. The `pageLayout` prop is required.\n');

      if (message) {
        console.warn(message);
      }
    }

    throw e;
  }

  pageData = pageData || {
    title: config.seo.defaultPagesTitle,
  };

  Object.assign(pageData || {}, rest);

  return (
    <div className={`${classes.root} page-${pageData.title}`} style={backgroundColor ? { backgroundColor } : {}}>
      <Head {...pageData}/>
      {Header}
      {children}
      {Footer}
    </div>
  );
});

PageLayout.defaultProps = {
  pageData: config.api.fetchPagesData ? undefined : {},
};

PageLayout.propTypes = {
  pageData: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  classes: PropTypes.object,
  backgroundColor: PropTypes.string,
  Header: PropTypes.any,
  Footer: PropTypes.any,
  requiredPageData: PropTypes.bool,
  fullWidth: PropTypes.bool,
};

export default PageLayout;
