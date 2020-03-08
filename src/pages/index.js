import React, { useState } from "react"
import { Link } from "gatsby"
import { IntlProvider, FormattedMessage } from "react-intl"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import LoginBox from "../components/loginBox"
import SwitchLang from "../components/switchLang"
import AudioPlayer from "../components/audioPlayer"

import en from '../i18n/en.js';
import zh from '../i18n/zh.js';

import Common from "../components/common"

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

  if (use_lang.includes('zh')) {
    return [use_lang, zh]
  } 
    
  return [use_lang, en]
}

const IndexPage = () => {

  const [locale, setLocale] = useState(navigator.language)
  const [lang, l10n_messages] = getLang(locale)

  return (
    <IntlProvider locale={lang} key={lang} defaultLocale="en" messages={l10n_messages}>
      <Layout>
        <SEO lang={lang} />
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
  )
}

export default IndexPage
