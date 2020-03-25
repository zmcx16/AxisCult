
// thumbnail size: 64x64
// desktop: 12x6
// mobile: 6x6

import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useSpring, animated } from 'react-spring'

import cardQAStyle from "./cardQA.module.scss"

function CardQA({ langFont, isMobile }) {

  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "axis-icon.png" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  })
  return (
    <div className={cardQAStyle.grid}>
      <div className={cardQAStyle.cardContainer} onClick={() => set(state => !state)}>
        <animated.div className={cardQAStyle.card} style={{ opacity: opacity.interpolate(o => 1 - o), transform }}><div className={cardQAStyle.cardContent}>00000000000</div></animated.div>
        <animated.div className={cardQAStyle.card} style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} ><div className={cardQAStyle.cardContent}>11111111111</div></animated.div>
      </div>
      <div className={cardQAStyle.cardContainer} onClick={() => set(state => !state)}>
        <animated.div className={cardQAStyle.card} style={{ opacity: opacity.interpolate(o => 1 - o), transform }}><div className={cardQAStyle.cardContent}>00000000000</div></animated.div>
        <animated.div className={cardQAStyle.card} style={{ opacity, transform: transform.interpolate(t => `${t} rotateX(180deg)`) }} ><div className={cardQAStyle.cardContent}>11111111111</div></animated.div>
      </div>
    </div>
  )
}

export default CardQA