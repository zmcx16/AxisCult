import React from 'react'

import IntroImage from "./introImage"

import introCreedStyle from "./introCreed.module.scss"

function IntroCreed({ langFont, isMobile, axisBadgeImage }) {

  const introImgs = [
    {
      imgFileName: "introAxis1.jpg",
      textKey: "introAxis1.caption"
    },
    {
      imgFileName: "introAxis2.jpg",
      textKey: "introAxis2.caption"
    },
    {
      imgFileName: "introAxis3.jpg",
      textKey: "introAxis3.caption"
    },
    {
      imgFileName: "introAxis4.jpg",
      textKey: "introAxis4.caption"
    }
  ]

  const introImgConfig = {
    imgPos: isMobile ? 'centerMobileImg' : 'centerWithFullText',
    interval: 9000,
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