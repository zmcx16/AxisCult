import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedHTMLMessage } from "react-intl"

import missionaryLoliStyle from "./missionaryLoli.module.scss"

function MissionaryLoli({ langFont, axisBadgeImage }) {

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

  const [title, setTitle] = useState()

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    setTitle(<h2 className={langFont}><FormattedHTMLMessage id="missionaryLoli.header" /></h2>)

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  return (
    <>
      <div className={missionaryLoliStyle.title}>
        {axisBadgeImage}
        {title}
        {axisBadgeImage}
      </div>
      <Img fluid={data.images.childImageSharp.fluid} className={missionaryLoliStyle.centerImg} loading={'eager'}/>
    </>
  )
}

export default MissionaryLoli