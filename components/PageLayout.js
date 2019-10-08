import { withStyles } from '@material-ui/core/styles';
import PropTypes      from 'prop-types';
import React          from 'react';
import Inspector      from 'react-inspector';
import getAppExports  from '../appExports';
import config         from '../config';
import Head           from './Head';


const Error = getAppExports().errorPage;

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
        classes,
        backgroundColor, // The background color of the page
        debug, // An object to display on the inspector tool (dev only)
        fullWidth,
        ...rest // Any other property will be assigned to the pageData object
      } = props;

  // Display an error if pageData is not defined or if it contains an error
  if (!pageData || pageData.error === 404 || (pageData.error && pageData.error !== 404)) {
    const statusCode = pageData && pageData.statusCode ? pageData.statusCode : 404;
    const message = process.env.NODE_ENV === 'production'
      ? null
      : 'Warning : No pageData has been provided to the PageLayout component. On production this will result in a 404 error page.'
    return <Error statusCode={statusCode}/>;
  }

  const containerStyles = {};

  if (fullWidth) {
    containerStyles.width = '100vw';
  }

  Object.assign(pageData || {}, rest);

  return (
    <div className={`${classes.root} page-${pageData.title}`} style={backgroundColor ? { backgroundColor } : {}}>
      <Head {...pageData}/>
      {Header}
      {children}
      {Footer}
      {
        // Optional inspector tool displayed at the bottom of the page
        process.env.NODE_ENV === 'development' && typeof debug === 'object' &&
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          zIndex: 1000,
        }}>
          <Inspector
            theme="chromeDark"
            data={debug}
            expandLevel={0}
          />
        </div>
      }
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
  debug: PropTypes.object,
  Header: PropTypes.any,
  Footer: PropTypes.any,
  fullWidth: PropTypes.bool,
};

export default PageLayout;
