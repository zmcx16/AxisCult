import React from "react"

import Marquee from "../components/marquee"
import IntroAxis from "../components/introAxis"
import IntroAqua from "../components/introAqua"

import contentStyle from "./content.module.scss"

const Content = ({langFont}) => {
  return (
    <div className={contentStyle.contentContainer}>
      <Marquee text_id={'marquee.text1'} langFont={langFont} />
      <div className={contentStyle.section}>
        <IntroAxis langFont={langFont}/>
      </div>
      <div className={contentStyle.section}>
        <IntroAqua langFont={langFont} />
      </div>
      <div className={contentStyle.section}>
      </div>
      <Marquee text_id={'marquee.text2'} langFont={langFont} />
    </div>
  )
}


export default Content
