import Head          from 'next/head';
import React         from 'react';
import getAppExports from '../appExports';
import config        from '../config';

const {packageJson} = getAppExports();


/**
 * This component generates the pages <head> tag
 * @see https://github.com/zeit/next.js#populating-head
 */
export default React.memo((props) => {

  let metaData = props.metaData;

  metaData = [...config.seo.defaultMetaTags, ...(metaData || [])];

  const title = props.title || config.seo.defaultPagesTitle || packageJson.name;

  return (
    <Head>
      <title>{title}</title>
      {
        metaData.length > 0 &&
        metaData.map((meta, key) =>
          React.createElement(
            'meta',
            {
              key: meta.name || key,
              ...meta,
            },
          ),
        )
      }
      {
        process.env.NODE_ENV !== 'development' &&
        <link rel="manifest" href="/manifest.json"/>
      }
    </Head>
  );
});