import React from "react"

import Marquee from "../components/marquee"
import IntroAxis from "../components/introAxis"
import IntroAqua from "../components/introAqua"
import KaoGei from "../components/kaoGei"

import contentStyle from "./content.module.scss"

const Content = ({langFont}) => {

  // RWD
  let isMobile = false
  if (typeof window !== 'undefined') {
    if(window.screen.width < 960){
      isMobile = true
    }
  }

  return (
    <div className={contentStyle.contentContainer}>
      <Marquee text_id={'marquee.text1'} langFont={langFont} />
      <div className={contentStyle.section + ' ' + contentStyle.sectionLR}>
        <IntroAxis langFont={langFont} isMobile={isMobile}/>
      </div>
      <div className={contentStyle.section + ' ' + contentStyle.sectionLR}>
        <IntroAqua langFont={langFont} isMobile={isMobile} />
      </div>
      <div className={contentStyle.section + ' ' + contentStyle.sectionCenter}>
        <KaoGei langFont={langFont} isMobile={isMobile} />
      </div>
      <Marquee text_id={'marquee.text2'} langFont={langFont} />
    </div>
  )
}


export default Content
