const { useTranslation: _useTranslation } = require('next-i18next');
const { serverSideTranslations }          = require('next-i18next/serverSideTranslations');
const getAppExports                       = require('./appExports');
const { nextI18nextConfig }               = getAppExports(true);


export const getI18nStaticProps = (
  namespaces      = [nextI18nextConfig.defaultNS],
  additionalProps = {},
) => async ({ locale }) => ({
  props: {
    ...additionalProps,
    ...await serverSideTranslations(locale, namespaces),
  },
});

export const useTranslation = _useTranslation;
