import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

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
          {axisBadgeImage}<h2><b>加入阿克西斯教改變你悲慘的人生吧!</b></h2>{axisBadgeImage}
        </div>
        <div>
          <h2>只要成為阿克西斯教徒, 就能立刻享有以下加護:</h2>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3>不再壓抑自我, 樂於享受人生</h3></div>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3>想讓世界變美好的心靈以及行動力</h3></div>
          <div className={introBaseStyle.subTitle}>{axisBadgeImage}<h3>討厭的人直接遠離你</h3></div>
        </div>
        <div className={introBaseStyle.textFooter} style={{ textAlign: 'left' }}>
          <h2><b>想要無拘無束享受未來快樂的人生嗎?  快加入阿克西斯教吧!</b></h2>
        </div>
      </div>
    </>
  )
}

export default IntroAxis