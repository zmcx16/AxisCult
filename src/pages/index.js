import React, { useState } from "react"
import { Link } from "gatsby"
import { IntlProvider, FormattedMessage } from "react-intl"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import LoginBox from "../components/loginBox"
import SwitchLang from "../components/switchLang"

import en from '../i18n/en.js';
import zh from '../i18n/zh.js';

const IndexPage = () => {
  const [locale, setLocale] = useState(navigator.language);

  let messages
  if (locale.includes('zh')) {
    messages = zh
  } else {
    messages = en
  }

  return (
    <IntlProvider locale={locale} key={locale} defaultLocale="en" messages={messages}>
      <Layout>
        <SEO title="Home" />
        <h1><FormattedMessage id="app.hi" values={{ name: 'React' }} /></h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link>
        <LoginBox />
        <SwitchLang setLocale={setLocale} />
      </Layout>
    </IntlProvider>
  )
}

export default IndexPage
