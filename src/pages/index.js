import React, { useState } from "react"
import { Link } from "gatsby"
import { IntlProvider, FormattedMessage } from "react-intl"
import { StylesProvider } from "@material-ui/core/styles"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import LoginBox from "../components/loginBox"
import SwitchLang from "../components/switchLang"
import AudioPlayer from "../components/audioPlayer"


import en from '../i18n/en.js';
import zh_tw from '../i18n/zh-tw.js';
import isekai from '../i18n/isekai.js';

import Common from "../components/common"

import layoutStyle from "../components/layout.module.scss"

// local function
function getLang(locale){
  let use_lang = null;
  Common.support_langs.some(function (lang) {
    if (window.location.href.indexOf('#' + lang) !== -1) {  // use url lang first
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

  const [locale, setLocale] = useState(navigator.language)
  const [use_lang, l10n_messages] = getLang(locale)
  const [langFont, setLangFont] = useState( use_lang.includes('isekai') ? layoutStyle.isekaiFont : layoutStyle.defaultFont)

  console.log("langFont:" + langFont)

  return (
    <StylesProvider injectFirst>
      <IntlProvider locale={use_lang} key={use_lang} defaultLocale="en" messages={l10n_messages}>
        <SEO use_lang={use_lang} />
        <Layout use_lang={use_lang} setLocale={setLocale} langFont={langFont} setLangFont={setLangFont}>
          <h1><FormattedMessage id="app.hi" values={{ name: 'React' }} /></h1>
          <h1><FormattedMessage id="siteMetadata.title"/></h1>
          <p>Welcome to your new Gatsby site.</p>
          <p>Now go build something great.</p>
          <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
            <Image />
          </div>
          <Link to="/page-2/">Go to page 2</Link>
          <LoginBox />
          <AudioPlayer />
          <SwitchLang setLocale={setLocale} />
        </Layout>
      </IntlProvider>
    </StylesProvider>
  )
}

export default IndexPage
