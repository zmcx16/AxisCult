import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"

import missionaryLoliStyle from "./missionaryLoli.module.scss"

function MissionaryLoli({ langFont, isMobile, axisBadgeImage }) {

  const data = useStaticQuery(graphql`
    query {
      images: file(relativePath: { eq: "axisLoli.jpg" }){
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }  
      }
    }
  `)

  return (
    <>
      <div className={missionaryLoliStyle.title}>
        {axisBadgeImage}
        <h2> 都看到這裡了還等什麼? 快加入阿克西斯教吧!!! </h2>
        {axisBadgeImage}
      </div>
      <Img fluid={data.images.childImageSharp.fluid} className={missionaryLoliStyle.centerImg} />
    </>
  )
}

export default MissionaryLoli