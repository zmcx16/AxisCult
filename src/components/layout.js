/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import Header from "../components/header"
import layoutStyle from "./layout.module.scss"

const Layout = ({ children, use_lang, setLocale, langFont, setLangFont} ) => {
  
  return (
    <>
      <div className={layoutStyle.container}>
        <Header use_lang={use_lang} setLocale={setLocale} langFont={langFont} setLangFont={setLangFont} />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://project.zmcx16.moe/">zmcx16</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
