import React from 'react';


export default function withTranslation(pageName = '', namespaces, config) {
  return ComposedComponent => {
    if (config.lang.enabled) {
      const _namespaces = config.lang.namespaces.includes(pageName) ? [pageName, ...namespaces] : namespaces;

      // This way we do not have to define namespacesRequired two times in every page components
      const Extended           = (props) => React.createElement(ComposedComponent, props);
      Extended.getInitialProps = async (props = {}) => {
        const initialProps = ComposedComponent.getInitialProps
          ? await ComposedComponent.getInitialProps(Object.assign({}, props /*{ pageData }*/))
          : {};

        return Object.assign(
          {},
          initialProps,
          { namespacesRequired: [config.lang.defaultNamespace, ..._namespaces] },
        );
      };

      return withTranslation(_namespaces)(Extended);
    }
    return ComposedComponent;
  };
}
