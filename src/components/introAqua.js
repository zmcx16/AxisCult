import React from 'react';
import { config } from 'react-spring'

import IntroImage from "./introImage"

import introBaseStyle from "./introBase.module.scss"

function IntroAqua({ langFont }) {

  const introImgs = [
    {
      id: "intro1",
      imgFileName: "introAqua1.jpg",
      captionKey: "introAqua1.caption"
    },
    {
      id: "intro2",
      imgFileName: "introAqua2.jpg",
      captionKey: "introAqua2.caption"
    },
    {
      id: "intro3",
      imgFileName: "introAqua3.jpg",
      captionKey: "introAqua3.caption"
    },
    {
      id: "intro4",
      imgFileName: "introAqua4.jpg",
      captionKey: "introAqua4.caption"
    }
  ]

  const introImgConfig = {
    imgPos: 'right',
    transitionsConfig: {
      from: { opacity: 0 },
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