/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useState } from "react"
import PropTypes from "prop-types"

import Content from "../components/content"
import Header from "../components/header"

import layoutStyle from "./layout.module.scss"

const Layout = ({ children, use_lang, setLocale, langFont, setLangFont} ) => {
  
  return (
    <>
      <div className={layoutStyle.container}>
        <Header use_lang={use_lang} setLocale={setLocale} langFont={langFont} setLangFont={setLangFont} />
        <Content />
        <main>{children}</main>
        <footer>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
