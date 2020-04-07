import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { FormattedMessage } from "react-intl"

import IntroImage from "./introImage"

import introBaseStyle from "./introBase.module.scss"

function IntroAxis({ langFont, axisBadgeImage }) {

  const introImgs = [
    {
      imgFileName: "introAxis1.jpg",
      textKey: "introAxis.caption1"
    },
    {
      imgFileName: "introAxis2.jpg",
      textKey: "introAxis.caption2"
    },
    {
      imgFileName: "introAxis3.jpg",
      textKey: "introAxis.caption3"
    },
    {
      imgFileName: "introAxis4.jpg",
      textKey: "introAxis.caption4"
    }
  ]

  const [imageNode, setImageNode] = useState()

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    setImageNode(<IntroImage langFont={langFont} introImgs={introImgs}
      introImgConfig={{
        imgPos: isMobile ? 'centerMobileImg' : 'left',
        textStyle: isMobile ? 'imgCaptionMobile' : 'imgCaption',
        interval: 4000,
        transitionsConfig: {
          from: { opacity: 1, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
          enter: { opacity: 1, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
          leave: { opacity: 0, transform: 'translate3d(-100%,0,0)', width: '100%', height: '100%', position: 'absolute' },
          config: { duration: 600 }
        }
      }} 
    />)

    return () => {
      // componentWillUnmount is here!
    }
  }, [])
  
  return (
    <>
      {imageNode}
      <div className={introBaseStyle.rightText} style={{ display: isMobile ? 'none' : 'block'}}>
        <div className={introBaseStyle.textHeader} style={{ justifyContent: 'left'}} >
          {axisBadgeImage}<h2 className={langFont}><b><FormattedMessage id="introAxis.header" /></b></h2>{axisBadgeImage}
        </div>
        <div>
          <h2 className={langFont}><FormattedMessage id="introAxis.title" /></h2>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3 className={langFont}><FormattedMessage id="introAxis.subTitle1" /></h3></div>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3 className={langFont}><FormattedMessage id="introAxis.subTitle2" /></h3></div>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3 className={langFont}><FormattedMessage id="introAxis.subTitle3" /></h3></div>
        </div>
        <div className={introBaseStyle.textFooter} style={{ textAlign: 'left' }}>
          <h2 className={langFont}><b><FormattedMessage id="introAxis.footerText" /></b></h2>
        </div>
      </div>
    </>
  )
}

export default IntroAxis