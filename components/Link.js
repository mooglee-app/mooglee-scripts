import MUILink              from '@material-ui/core/Link';
import classNames           from 'classnames';
import { useRouter }        from 'next/router';
import PropTypes            from 'prop-types';
import React                from 'react';
import getAppExports        from '../appExports';
import config               from '../config';
import { Link as NextLink } from '../lib/i18n';
import removeUrlLastSlash   from '../tools/removeUrlLastSlash';
import wrapper              from '../wrappers/componentWrapper';


const { routes } = getAppExports();

function Link({
                activeClassName,
                checkSubActive,
                activeStyle,
                LinkProps,
                component,
                className,
                underline,
                urlQuery,
                prefetch,
                disabled,
                children,
                variant,
                target,
                color,
                style,
                query,
                name,
                to,
              }) {


  const router = useRouter();

  let isActive = false;
  if (router.route === '/index' && to === '/') {
    isActive = true;
  } else if (checkSubActive) {
    const segment = router.asPath.split('?')[0]
      .split('/')[1];
    isActive      = to === `/${segment}`;
  } else {
    console.log(router, router.route, to);
    isActive = router.asPath.split('?')[0] === to;
  }

  // Find a matching route in the route.js config file
  let { page } = routes[to] || {};

  // Check if a matching route has been found
  // if not, only show an error log on dev env
  if (typeof to !== 'string' || !page) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`Link.js: No matching route has been found for '${to}'`);
    }
  }

  if (typeof query === 'object') {
    Object.entries(query).forEach(([queryName, queryValue]) => (
      queryValue && queryName ? to = to.replace(`:${queryName}`, queryValue) : null
    ));
  }

  let pathname   = removeUrlLastSlash(to);
  let isExternal = false;

  if (to.includes('.') || to.includes('://')) {
    pathname   = to;
    isExternal = true;
  } else if (target === '_blank') {
    pathname   = removeUrlLastSlash(config.server.getUrl(to));
    isExternal = true;
  }

  if (disabled) {
    return children;
  }


  style = (isActive === true && activeStyle !== undefined)
    ? { ...style, ...activeStyle }
    : style;

  className = (isActive === true && activeClassName !== undefined)
    ? classNames(className, activeClassName)
    : className;

  const NativeLinkComponent = (
    <MUILink
      href={pathname}
      name={name || typeof children === 'string' ? children : ''}
      target={target}
      rel={target === '_blank' ? 'noopener' : ''}
      className={className}
      style={style}
      variant={variant}
      component={component}
      underline={underline}
      color={color}
      {...LinkProps}
    >
      {children}
    </MUILink>
  );

  return (
    <NextLink
      href={{
        pathname: removeUrlLastSlash(page || to),
        query,
      }}
      as={pathname + urlQuery}
      prefetch={prefetch}
    >
      {NativeLinkComponent}
    </NextLink>
  );
}

Link.propTypes = {

  // The content of the link, it can be almost anything
  children: PropTypes.any.isRequired,

  // The route path as defined in the routes.js file
  to: PropTypes.string.isRequired,

  // The route query(ies)
  query: PropTypes.any,

  // A className that is applied to the <a> tag of the link
  className: PropTypes.string,

  // A style to be used when the link is active
  activeStyle: PropTypes.object,

  // A className to be used when the link is active
  activeClassName: PropTypes.string,

  // The name of the link (native)
  name: PropTypes.string,

  // The target of the link (native)
  target: PropTypes.string,

  // Define if the related page must be pre-fetched (only in prod)
  prefetch: PropTypes.bool,

  // A query that can be passed to the link
  urlQuery: PropTypes.string,

  // Defines if the link is disabled
  disabled: PropTypes.bool,

  // Colors for the Typography component
  color: PropTypes.oneOf(['initial', 'error', 'inherit', 'primary', 'secondary', 'textPrimary', 'textSecondary']),

  // Add an underline to the link
  underline: PropTypes.oneOf(['none', 'hover', 'always']),

  // if true, the component will consider the link active whenever its first segment matches the current route
  checkSubActive: PropTypes.bool,
};

Link.defaultProps = {
  variant: 'button',
  component: 'a',
  target: '_self',
  prefetch: false,
  underline: 'none',
  urlQuery: '',
  disabled: false,
  checkSubActive: false,
  style: {},
};


export default wrapper(Link, {
  isTranslatable: false,
  hasStyles: false,
  withRouter: true,
});
