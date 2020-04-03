import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"

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

  const [headerText1_Opacity, setHeaderText1_Opacity] = useState(0)
  const [headerText2_Opacity, setHeaderText2_Opacity] = useState(0)
  const [headerText3_Opacity, setHeaderText3_Opacity] = useState(0)

  const fadeInQueue = [setHeaderText1_Opacity, setHeaderText2_Opacity, setHeaderText3_Opacity]

  return (
    <div className={headerStyle.kanbanContainer}>
      <div className={headerStyle.kanbanOverlay}>
        <h1 className={headerStyle.headerText1 + ' ' + langFont} style={{ opacity: headerText1_Opacity }}><FormattedMessage id="header.text1" /></h1>
        <h1 className={headerStyle.headerText2 + ' ' + langFont} style={{ opacity: headerText2_Opacity }}><FormattedMessage id="header.text2" /></h1>
        <h1 className={headerStyle.headerText3 + ' ' + langFont} style={{ opacity: headerText3_Opacity }}><FormattedMessage id="header.text3" /></h1>
        <div className={headerStyle.footer}>
          <LangSelect use_lang={use_lang} setLocale={setLocale} langFont={langFont} setLangFont={setLangFont}/>
        </div>
      </div>
      <Img fluid={data.placeholderImage.childImageSharp.fluid} className={headerStyle.kanbanImg} style={{ position: "fixed" }}
        onLoad={()=>{
          function fadeIn(index) {
            if (index < fadeInQueue.length) {
              fadeInQueue[index](1)
              setTimeout(fadeIn, 2000, index + 1);
            }
          }    
          setTimeout(fadeIn, 1000, 0)
        }}
      />
    </div>
  )
  
}


export default Header
