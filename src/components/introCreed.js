import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'
import { FormattedMessage } from "react-intl"

import IntroImage from "./introImage"

import introCreedStyle from "./introCreed.module.scss"

function IntroCreed({ langFont, axisBadgeImage }) {

  const introImgs = [
    {
      imgFileName: "introCreed1.jpg",
      textKey: "introCreed.text1"
    },
    {
      imgFileName: "introCreed2.jpg",
      textKey: "introCreed.text2"
    },
    {
      imgFileName: "introCreed3.jpg",
      textKey: "introCreed.text3"
    },
    {
      imgFileName: "introCreed4.jpg",
      textKey: "introCreed.text4"
    },
    {
      imgFileName: "introCreed5.jpg",
      textKey: "introCreed.text5"
    },
    {
      imgFileName: "introCreed6.jpg",
      textKey: "introCreed.text6"
    },
    {
      imgFileName: "introCreed7.jpg",
      textKey: "introCreed.text7"
    },
    {
      imgFileName: "introCreed8.jpg",
      textKey: "introCreed.text8"
    },
    {
      imgFileName: "introCreed9.jpg",
      textKey: "introCreed.text9"
    }
  ]

  const [imageNode, setImageNode] = useState()

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    setImageNode(<IntroImage langFont={langFont} introImgs={introImgs}
      introImgConfig={{
        imgPos: isMobile ? 'centerMobileImg' : 'centerWithFullText',
        textStyle: isMobile ? 'imgFullTextMobile' : 'imgFullText',
        interval: 9000,
        transitionsConfig: {
          from: { opacity: 1, transform: 'translate3d(99%,0,0)', width: '100%', height: '100%', position: 'absolute' },
          enter: { opacity: 1, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
          leave: { opacity: 1, transform: 'translate3d(-99%,0,0)', width: '100%', height: '100%', position: 'absolute' },
          config: { duration: 800 }
        }
      }}
    />)

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  return (
    <>
      <div className={introCreedStyle.title}>
        {axisBadgeImage}
        <h2 className={langFont}><FormattedMessage id="introCreed.header" /></h2>
        {axisBadgeImage}
      </div>
      <div className={introCreedStyle.imgContainer}>
        {imageNode}
      </div>
    </>
  )
}

export default IntroCreed