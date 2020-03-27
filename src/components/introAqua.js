import React from 'react'
import { config } from 'react-spring'

import IntroImage from "./introImage"

import introBaseStyle from "./introBase.module.scss"

function IntroAqua({ langFont, isMobile }) {

  const introImgs = [
    {
      imgFileName: "introAqua1.jpg",
      captionKey: "introAqua1.caption"
    },
    {
      imgFileName: "introAqua2.jpg",
      captionKey: "introAqua2.caption"
    },
    {
      imgFileName: "introAqua3.jpg",
      captionKey: "introAqua3.caption"
    },
    {
      imgFileName: "introAqua4.jpg",
      captionKey: "introAqua4.caption"
    }
  ]

  const introImgConfig = {
    imgPos: isMobile? 'center': 'right',
    interval: 70000000,
    transitionsConfig: {
      from: { opacity: 1 },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: { duration: 600 }
    }
  }

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
      <IntroImage langFont={langFont} introImgs={introImgs} introImgConfig={introImgConfig}/>
    </>
  )
}

export default IntroAqua