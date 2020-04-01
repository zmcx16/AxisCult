import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

import Marquee from "../components/marquee"
import IntroAxis from "../components/introAxis"
import IntroAqua from "../components/introAqua"
import KaoGei from "../components/kaoGei"
import CardQA from "../components/cardQA"
import IntroCreed from "../components/introCreed"
import MissionaryLoli from "../components/missionaryLoli"

import contentStyle from "./content.module.scss"

const Content = ({langFont, isMobile}) => {

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "axis-icon.png" }) {
        childImageSharp {
          fixed(width: 32){
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const axisBadgeImage = (<Img fixed={data.placeholderImage.childImageSharp.fixed}/>)

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
        <KaoGei langFont={langFont} isMobile={isMobile} axisBadgeImage={axisBadgeImage} />
      </div>
      <div className={contentStyle.section + ' ' + contentStyle.sectionCenter}>
        <CardQA langFont={langFont} isMobile={isMobile} axisBadgeImage={axisBadgeImage} />
      </div>
      <div className={contentStyle.section + ' ' + contentStyle.sectionCenter}>
        <IntroCreed langFont={langFont} isMobile={isMobile} axisBadgeImage={axisBadgeImage} />
      </div>
      <div className={contentStyle.section + ' ' + contentStyle.sectionCenter}>
        <MissionaryLoli langFont={langFont} isMobile={isMobile} axisBadgeImage={axisBadgeImage} />
      </div>
      <Marquee text_id={'marquee.text2'} langFont={langFont} />
    </div>
  )
}


export default Content
