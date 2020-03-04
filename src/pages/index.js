import React from "react"
import { Link } from "gatsby"
import { IntlProvider } from "react-intl"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

import LoginBox from "../components/loginBox"

const IndexPage = () => {
  const locale = navigator.language

  return (
    <IntlProvider locale={locale} key={locale} defaultLocale="en">
      <Layout>
        <SEO title="Home" />
        <h1>Hi people</h1>
        <p>Welcome to your new Gatsby site.</p>
        <p>Now go build something great.</p>
        <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
          <Image />
        </div>
        <Link to="/page-2/">Go to page 2</Link>
        <LoginBox/>
      </Layout>
    </IntlProvider>
  )
}

export default IndexPage
