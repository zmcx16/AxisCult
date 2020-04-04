import React, { useState, useEffect } from 'react'
import { isMobile } from 'react-device-detect'

import IntroImage from "./introImage"

import introBaseStyle from "./introBase.module.scss"

function IntroAxis({ langFont }) {

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
  }, [isMobile])

  return (
    <>
      {imageNode}
      <div className={introBaseStyle.rightText}>
        <h2><b>Congratulation!! This is a best oppuraunity to become a devoted Axis believer.</b></h2>
            <p><br />are you ever do some evil ... or have xxx.</p>
        <h2><b>Join the Axis Cult today!!</b></h2>
	    	<span>ya</span>
        <button onClick={() => {
        }}>test</button>
      </div>
    </>
  )
}

export default IntroAxis