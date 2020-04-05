import React, { useState, useEffect } from 'react'
import { config } from 'react-spring'
import { isMobile } from 'react-device-detect'

import IntroImage from "./introImage"

import introBaseStyle from "./introBase.module.scss"

function IntroAqua({ langFont }) {

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
      <div className={introBaseStyle.leftText}>
        <h2><b>Congratulation!! This is a best oppuraunity to become a devoted Axis believer.</b></h2>
            <p><br />are you ever do some evil ... or have xxx.</p>
        <h2><b>Join the Axis Cult today!!</b></h2>
	    	<span>ya</span>
        <button onClick={() => {
        }}>test</button>
      </div>
      {imageNode}
    </>
  )
}

export default IntroAqua