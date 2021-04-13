import { withStyles } from '@material-ui/core/styles';
import PropTypes      from 'prop-types';
import React          from 'react';
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

  return (
    <div className={`${classes.root} ${!!pageData?.title && `page-${pageData.title}`}`} style={backgroundColor ? { backgroundColor } : {}}>
      <Head {...pageData} {...rest}/>
      {Header}
      {children}
      {Footer}
    </div>
  );
});

PageLayout.defaultProps = {
  pageData: {},
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
