import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import LangSelect from "./langSelect"

import headerStyle from "./header.module.scss"

const Header = ({ use_lang, setLocale, langFont, setLangFont }) => {

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "church.jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <div className={headerStyle.kanbanContainer}>
      <div className={headerStyle.kanbanOverlay}>
        <div className={headerStyle.footer}>
          <LangSelect use_lang={use_lang} setLocale={setLocale} langFont={langFont} setLangFont={setLangFont}/>
        </div>
      </div>
      <Img fluid={data.placeholderImage.childImageSharp.fluid} className={headerStyle.kanbanImg} style={{ position: "fixed" }} />
    </div>
  )
  
}


export default Header
