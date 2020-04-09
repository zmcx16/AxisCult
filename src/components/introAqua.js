import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { FormattedMessage } from "react-intl"

import IntroImage from "./introImage"

import introBaseStyle from "./introBase.module.scss"

function IntroAqua({ langFont, axisBadgeImage }) {

  const introImgs = [
    {
      imgFileName: "introAqua1.jpg",
      textKey: "introAqua.caption1",
      mobileImgObjectPosition: '30%'
    },
    {
      imgFileName: "introAqua2.jpg",
      textKey: "introAqua.caption2",
      mobileImgObjectPosition: '45%'
    },
    {
      imgFileName: "introAqua3.jpg",
      textKey: "introAqua.caption3",
      mobileImgObjectPosition: '55%'
    },
    {
      imgFileName: "introAqua4.jpg",
      textKey: "introAqua.caption4",
      mobileImgObjectPosition: 'center center'
    }
  ]

  const [imageNode, setImageNode] = useState()
  const [textDisplay, setTextDisplay] = useState('block')

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    setImageNode(<IntroImage langFont={langFont} introImgs={introImgs} 
      introImgConfig={{
        imgPos: !isMobile ? 'right' : 'centerMobileImg',
        textStyle: !isMobile ? 'imgCaption' : 'imgCaptionMobile',
        interval: 7000,
        transitionsConfig: {
          from: { opacity: 1 },
          enter: { opacity: 1 },
          leave: { opacity: 0 },
          config: { duration: 600 }
      }}
    } />)

    if(isMobile){
      setTextDisplay('none')
    }

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  return (
    <>
      <div className={introBaseStyle.leftText} style={{ display: textDisplay }}>
        <div className={introBaseStyle.textHeader} style={{ justifyContent: 'right' }}>
          {axisBadgeImage}<h2 className={langFont}><b><FormattedMessage id="introAqua.header" /></b></h2>{axisBadgeImage}
        </div>
        <div style={{display: 'grid', justifyContent: 'right' }}>
          <h2 className={langFont}><FormattedMessage id="introAqua.title" /></h2>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3 className={langFont}><FormattedMessage id="introAqua.subTitle1" /></h3></div>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3 className={langFont}><FormattedMessage id="introAqua.subTitle2" /></h3></div>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3 className={langFont}><FormattedMessage id="introAqua.subTitle3" /></h3></div>
        </div>
        <div className={introBaseStyle.textFooter} style={{ textAlign: 'right' }}>
          <h2 className={langFont}><b><FormattedMessage id="introAqua.footerText1" /></b></h2>
          <h2 className={langFont}><b><FormattedMessage id="introAqua.footerText2" /></b></h2>
        </div>
      </div>
      {imageNode}
    </>
  )
}

export default IntroAqua