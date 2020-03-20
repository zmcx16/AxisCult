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
        <h1 className={headerStyle.headerText1 + ' ' + langFont}>歡迎你, 迷途的小羔羊阿</h1>
        <h1 className={headerStyle.headerText2 + ' ' + langFont}>來傾訴你的罪孽吧</h1>
        <h1 className={headerStyle.headerText3 + ' ' + langFont}>阿克婭女神肯定會聽到, 並賜予你救贖</h1>
        <div className={headerStyle.footer}>
          <LangSelect use_lang={use_lang} setLocale={setLocale} langFont={langFont} setLangFont={setLangFont}/>
        </div>
      </div>
      <Img fluid={data.placeholderImage.childImageSharp.fluid} className={headerStyle.kanbanImg} style={{ position: "fixed" }} />
    </div>
  )
  
}


export default Header
