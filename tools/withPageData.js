import React         from 'react';
import { fetchPage } from '../store/core.actions';


function getErrorStatus(error = {}) {
  let statusCode = undefined;
  for (let _code of ['status', 'code', 'statusCode', 'status', 'code', 'statusCode']) {
    if (!!error[_code]) {
      statusCode = error[_code];
      break;
    }
  }
  return statusCode;
}


const lazyGetPageData = (pageName, dispatch) => new Promise((resolve, reject) => {
  dispatch(fetchPage(pageName, false, (res, err) => {
    if (res && !err) return resolve(res);
    else {
      reject(err);
    }
  }));
});

// This is a HOC that can be used with all the app pages.
// Its goal is simply to make a request to the API when the Component getServerSideProps is called
// an retrieve specific data for the page. these data will be accessible under the page prop 'pageData'


const withPageData = (pageName = '', opts = {}) => ComposedComponent => {

  const required = Boolean(opts.required);

  const Extended = (props) => React.createElement(ComposedComponent, props);

  Extended.getServerSideProps = async (props = {}) => {

    // Resolve page data
    let pageData = {};

    const currentStore = props.store.getState() || {};
    if (currentStore.core && currentStore.core.pages && currentStore.core.pages[pageName]) {
      pageData = currentStore.core.pages[pageName];
    } else if (required) {
      try {
        pageData = await lazyGetPageData(pageName, props.store.dispatch);
      } catch (err) {
        pageData = { error: { code: getErrorStatus(err) || 404 } }; // Store the status of the error somewhere
      }
    }

    // Run page getServerSideProps with store and isServer
    const initialProps = ComposedComponent.getServerSideProps
      ? await ComposedComponent.getServerSideProps(Object.assign({}, props, { pageData }))
      : {};

    return {
      props: Object.assign({}, initialProps, { pageData, pageName })
    };
  };

  return Extended;
};

export default withPageData;
