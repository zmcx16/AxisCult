import React from 'react'
import IntroImage from "./introImage"

import introBaseStyle from "./introBase.module.scss"

function IntroAxis({ langFont, isMobile }) {

  const introImgs = [
    {
      imgFileName: "introAxis1.jpg",
      captionKey: "introAxis1.caption"
    },
    {
      imgFileName: "introAxis2.jpg",
      captionKey: "introAxis2.caption"
    },
    {
      imgFileName: "introAxis3.jpg",
      captionKey: "introAxis3.caption"
    },
    {
      imgFileName: "introAxis4.jpg",
      captionKey: "introAxis4.caption"
    }
  ]

  const introImgConfig = {
    imgPos: isMobile ? 'center' : 'left',
    interval: 4000,
    transitionsConfig: {
      from: { opacity: 1, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
      enter: { opacity: 1, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
      leave: { opacity: 0, transform: 'translate3d(-100%,0,0)', width: '100%', height: '100%', position: 'absolute' },
      config: { duration: 600 }
    }
  }

  return (
    <>
      <IntroImage langFont={langFont} introImgs={introImgs} introImgConfig={introImgConfig} isMobile={isMobile}/>
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