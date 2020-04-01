import React from 'react'

import IntroImage from "./introImage"

import introCreedStyle from "./introCreed.module.scss"

function IntroCreed({ langFont, isMobile, axisBadgeImage }) {

  const introImgs = [
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text1"
    },
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text2"
    },
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text3"
    },
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text4"
    },
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text5"
    },
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text6"
    },
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text7"
    },
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text8"
    },
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text9"
    }
  ]

  const introImgConfig = {
    imgPos: isMobile ? 'centerMobileImg' : 'centerWithFullText',
    textStyle: isMobile ? 'imgFullTextMobile' : 'imgFullText',
    interval: 9000000,
    transitionsConfig: {
      from: { opacity: 1, transform: 'translate3d(99%,0,0)', width: '100%', height: '100%', position: 'absolute' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
      leave: { opacity: 1, transform: 'translate3d(-99%,0,0)', width: '100%', height: '100%', position: 'absolute' },
      config: { duration: 800 }
    }
  }

  return (
    <>
      <div className={introCreedStyle.title}>
        {axisBadgeImage}
        <h2> 阿克西斯教 教義 </h2>
        {axisBadgeImage}
      </div>
          <div className={introCreedStyle.imgContainer}>
        <IntroImage langFont={langFont} introImgs={introImgs} introImgConfig={introImgConfig} isMobile={isMobile}/>
      </div>
    </>
  )
}

export default IntroCreed