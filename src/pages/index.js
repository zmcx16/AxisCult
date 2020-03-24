import React, { useState } from "react"
import { IntlProvider, FormattedMessage } from "react-intl"
import { StylesProvider } from "@material-ui/core/styles"

import Common from "../components/common"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Content from "../components/content"
import MissionaryModal from "../components/missionaryModal"

import en from '../i18n/en.js'
import zh_tw from '../i18n/zh-tw.js'
import isekai from '../i18n/isekai.js'

import layoutStyle from "../components/layout.module.scss"

// local function
function getLang(locale){

  let href = ''
  if (typeof window !== 'undefined') {
    href = window.location.href
  }

  let use_lang = null;
  Common.support_langs.some(function (lang) {
    if (href.indexOf('#' + lang) !== -1) {  // use url lang first
      use_lang = lang
      return true;
    }
    return false;
  });

  if (use_lang === null) { // use browser language
    use_lang = locale;
  }

  if (use_lang.includes('zh-TW')) {
    return [use_lang, zh_tw]
  } else if (use_lang.includes('isekai')){
    return [use_lang, isekai]
  }

  return ['en', en]
}

const IndexPage = () => {

  // workaround: https://github.com/gatsbyjs/gatsby/issues/309 
  // Server side rendering is by definition done on the “server” side, where “window” is not a thing.
  let language = 'en'
  if (typeof window !== 'undefined') {
    language = navigator.language
  }

  const [locale, setLocale] = useState(language)
  const [use_lang, l10n_messages] = getLang(locale)
  const [langFont, setLangFont] = useState( use_lang.includes('isekai') ? layoutStyle.isekaiFont : layoutStyle.defaultFont)

  return (
    <StylesProvider injectFirst>
      <IntlProvider locale={use_lang} key={use_lang} defaultLocale="en" messages={l10n_messages}>
        <SEO use_lang={use_lang} />
        <Layout use_lang={use_lang} setLocale={setLocale} langFont={langFont} setLangFont={setLangFont}>
          <Content langFont={langFont} />
          <MissionaryModal langFont={langFont} />
        </Layout>
      </IntlProvider>
    </StylesProvider>
  )
}

export default IndexPage
