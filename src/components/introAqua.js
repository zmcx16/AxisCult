import React, { useState, useEffect } from 'react'
import { config } from 'react-spring'
import { isMobile } from 'react-device-detect'

import IntroImage from "./introImage"

import introBaseStyle from "./introBase.module.scss"

function IntroAqua({ langFont, axisBadgeImage }) {

  const introImgs = [
    {
      imgFileName: "introAqua1.jpg",
      textKey: "introAqua.caption1"
    },
    {
      imgFileName: "introAqua2.jpg",
      textKey: "introAqua.caption2"
    },
    {
      imgFileName: "introAqua3.jpg",
      textKey: "introAqua.caption3"
    },
    {
      imgFileName: "introAqua4.jpg",
      textKey: "introAqua.caption4"
    }
  ]

  const [imageNode, setImageNode] = useState()

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

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  return (
    <>
      <div className={introBaseStyle.leftText} style={{ display: isMobile ? 'none' : 'block' }}>
        <div className={introBaseStyle.textHeader} style={{ justifyContent: 'right' }}>
          {axisBadgeImage}<h2><b>我們信仰之神: 水之女神阿克婭</b></h2>{axisBadgeImage}
        </div>
        <div style={{display: 'grid', justifyContent: 'right' }}>
          <h2>關於阿克婭女神的豆知識:</h2>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3>多才多藝 - 花鳥風月滿級</h3></div>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3>得意料理是美乃滋鮪魚飯</h3></div>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3>一言以蔽之就是 萌萌噠 萌萌噠 萌萌噠!!!</h3></div>
        </div>
        <div className={introBaseStyle.textFooter} style={{ textAlign: 'right' }}>
          <h2><b>尼采曾說過:「上帝已死, 但阿克婭女神還在!」</b></h2>
          <h2><b>快加入我大阿克西斯教信奉阿克婭女神吧!!!</b></h2>
        </div>
      </div>
      {imageNode}
    </>
  )
}

export default IntroAqua