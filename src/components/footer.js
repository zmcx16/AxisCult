import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
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

  const [footContainerStyle, setFootContainerStyle] = useState(footerStyle.footContainer)
  const [footLinkStyle, setFootLinkStyle] = useState(footerStyle.footLink)

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    if (isMobile){
      setFootContainerStyle(footerStyle.footContainerMobile)
      setFootLinkStyle(footerStyle.footLinkMoblie)
    }

    return () => {
      // componentWillUnmount is here!
    }
  }, [])


  return (
    <BackgroundImage
      className={footerStyle.kanbanContainer}
      fluid={data.placeholderImage.childImageSharp.fluid}
      fadeIn={false}
      loading={'eager'}
      style={{ backgroundSize: 'cover', backgroundPosition: 'center center', backgroundAttachment: 'fixed' }}
    >
      <footer className={footContainerStyle}>
        <div className={footerStyle.links1 + ' ' + footLinkStyle}>
          <a target="_blank" href="https://github.com/zmcx16/AxisCult/blob/master/demo/Aqua-org.png"><span className={langFont}><FormattedMessage id="footer.aquaImage.text" /></span></a>
          <a target="_blank" href="https://github.com/zmcx16/AxisCult/blob/master/demo/mosaicAqua-org.jpg"><span className={langFont}><FormattedMessage id="footer.aquaImageMosaic.text" /></span></a>
        </div>
        <div className={footerStyle.links2 + ' ' + footLinkStyle}>
          <a target="_blank" href="https://github.com/zmcx16/AxisCult"><span className={langFont}><FormattedMessage id="footer.github" /></span></a>
          <a target="_blank" href="https://project.zmcx16.moe/"><span className={langFont}><FormattedMessage id="footer.sideProjects" /></span></a>
          <a target="_blank" href="https://blog.zmcx16.moe/"><span className={langFont}><FormattedMessage id="footer.blog" /></span></a>
        </div>
        <div className={footerStyle.notice}>
          <div className={langFont} style={{ marginBottom: '5px' }}><FormattedMessage id="footer.notice.text1" /></div>
          <div className={langFont}><FormattedMessage id="footer.notice.text2" /><a target="_blank" href="https://github.com/zmcx16/AxisCult/blob/master/README.md"><span className={langFont}><FormattedMessage id="footer.readme" /></span></a></div>
        </div>
      </footer>
    </BackgroundImage>
  )
  
}

export default Footer
