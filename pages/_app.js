import CssBaseline                          from '@material-ui/core/CssBaseline';
import Hidden                               from '@material-ui/core/Hidden';
import { ThemeProvider }                    from '@material-ui/styles';
import config                               from '@mooglee/core/config';
import { appWithTranslation, i18n }         from '@mooglee/core/lib/i18n';
import createStore                          from '@mooglee/core/store/createStore';
import envBoolean                           from '@mooglee/core/tools/envBoolean';
import withRedux                            from 'next-redux-wrapper';
import App                                  from 'next/app';
import NProgress                            from 'nprogress';
import React                                from 'react';
import { Provider }                         from 'react-redux';
import appExports                           from '../appExports';
import { fetchAppSettings, setAppLanguage } from '../store/core.actions';


const { theme } = appExports();



class _App extends App {
  static async getInitialProps({ Component, ctx, customAppInitialPropsModifier }) {
    const props = {};

    props.lang = !ctx.req ? i18n.language : ctx.req.language;

    if (!props.lang) {
      props.lang = config.lang.default;
    }

    ctx.store.dispatch(setAppLanguage(props.lang));
    props.pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps({ ...ctx, lang: props.lang }) : {}),
    };
    // Store the app settings
    if (config.api.fetchAppSettings === true && ctx.store.getState().core.syncSettings !== true) {
      await ctx.store.dispatch(fetchAppSettings());
    }

    props.query = ctx.query || ctx.req.params;

    if (typeof customAppInitialPropsModifier === 'function') {
      await customAppInitialPropsModifier(props, ctx);
    }
    return props;
  }


  /**
   * componentDidMount
   */
  componentDidMount() {

    // Init the service-worker
    this._initServiceWorker();

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    /** On router change start **/

    this.props.router.events.on('routeChangeStart', url => {
      if (process.env.NODE_ENV !== 'production') {
        console.groupCollapsed('%c-- Router change START : ' + url, 'background:#00ff8d;color:#000');
        console.trace();
        console.groupEnd();
      }
      NProgress.start();
    });

    /** On router change complete **/

    this.props.router.events.on('routeChangeComplete', async url => {
      if (process.env.NODE_ENV !== 'production') {
        console.groupCollapsed('%c-- Router change COMPLETE : ' + url, 'background:#00ff8d;color:#000');
        console.trace();
        console.groupEnd();
      }

      NProgress.done();
    });

    /** On router change error **/

    this.props.router.events.on('routeChangeError', () => NProgress.done());

  }


  /**
   * Init the service worker
   * @private
   */
  _initServiceWorker() {
    if (process.browser && 'serviceWorker' in navigator) {
      if (envBoolean(process.env.ENABLE_SERVICE_WORKER)) {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(() => {
            console.log('> service worker registration successful');
          })
          .catch(err => {
            console.warn('> service worker registration failed', err.message);
          });
      } else {
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          for (let registration of registrations) {
            registration.unregister()
              .then(() => {
                console.log('> service worker successfully unregistered');
              })
              .catch(err => {
                console.warn('> service worker unregistration failed', err.message);
              });

          }
        });
      }
    }
  }


  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <div className="app">
            <Component {...pageProps}/>


            { // This is a dev component that displays the current screen size label at the bottom right corner
              // of the screen
              process.env.NODE_ENV === 'development' &&
              <div style={{
                position: 'fixed',
                bottom: 0,
                right: 0,
                background: 'green',
                color: 'white',
                padding: 5,
                fontSize: 16,
                zIndex: 4000,
              }}>
                <Hidden smUp>xs</Hidden>
                <Hidden xsDown mdUp>sm</Hidden>
                <Hidden lgUp smDown>md</Hidden>
                <Hidden xlUp mdDown>lg</Hidden>
                <Hidden lgDown>xl</Hidden>
              </div>
            }

          </div>
        </ThemeProvider>
      </Provider>
    );
  }
};

export default withRedux(createStore)(
  config.lang.enabled
    ? appWithTranslation(_App)
    : _App,
);
