import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"
import BackgroundImage from 'gatsby-background-image'
import { isMobile } from 'react-device-detect'

import footerStyle from "./footer.module.scss"

const Footer = ({langFont}) => {

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "mosaicAqua.jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <BackgroundImage
      className={footerStyle.kanbanContainer}
      fluid={data.placeholderImage.childImageSharp.fluid}
      fadeIn={false}
      loading={'eager'}
      style={{ backgroundSize: 'cover', backgroundPosition: 'center center', backgroundAttachment: 'fixed' }}
    >
      <footer className={isMobile ? footerStyle.footContainerMobile : footerStyle.footContainer}>
        <div className={footerStyle.links1} style={{ marginBottom: isMobile ? '10px' : '15px' }}>
          <a target="_blank" href="https://github.com/zmcx16/AxisCult/blob/master/demo/Aqua-org.png">AQUA IMAGE</a>
          <a target="_blank" href="https://github.com/zmcx16/AxisCult/blob/master/demo/mosaicAqua-org.jpg">AQUA IMAGE (mosaic)</a>
        </div>
        <div className={footerStyle.links2} style={{ marginBottom: isMobile ? '10px' : '15px' }}>
          <a target="_blank" href="https://github.com/zmcx16/AxisCult">AxisCutl Github</a>
          <a target="_blank" href="https://project.zmcx16.moe/">zmcx16's side projects</a>
          <a target="_blank" href="https://blog.zmcx16.moe/">zmcx16's Blog</a>
        </div>
        <div className={footerStyle.notice}>
          <div style={{ marginBottom: '5px' }}>這個網站是為了介紹和推廣"為了美好世界獻上祝福"系列作品以及為了將阿克西斯教的美妙傳到世界各地所製作, 網站大多數素材皆來自"為了美好世界獻上祝福"第一、二季動畫並為美好世界製作委員會所有, 禁止將該網站素材作非法或營利使用。</div>
          <div>關於網站素材的使用以及相關權利的細節部分, 請參考 <a target="_blank" href="https://github.com/zmcx16/AxisCult/blob/master/README.md">README</a></div>
        </div>
      </footer>
    </BackgroundImage>
  )
  
}

export default Footer
