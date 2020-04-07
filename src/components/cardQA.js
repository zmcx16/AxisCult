
// thumbnail size: 64x64
// desktop: 12x6
// mobile: 6x6

import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useSprings, animated } from 'react-spring'
import { FormattedMessage, FormattedHTMLMessage } from "react-intl"

import cardQAStyle from "./cardQA.module.scss"

function CardQA({ langFont, axisBadgeImage }) {

  const cardContent = [
    {
      frontContentKey: "cardQA.front1.text",
      backContentKey: "cardQA.back1.text"
    },
    {
      frontContentKey: "cardQA.front2.text",
      backContentKey: "cardQA.back2.text"
    },
    {
      frontContentKey: "cardQA.front3.text",
      backContentKey: "cardQA.back3.text"
    },
    {
      frontContentKey: "cardQA.front4.text",
      backContentKey: "cardQA.back4.text"
    }
  ]

  const data = useStaticQuery(graphql`
    query {
      cardFront: file(relativePath: { eq: "axis-icon.png" }) {
        childImageSharp {
          fluid{
            ...GatsbyImageSharpFluid
          }
        }
      }

      cardBack: file(relativePath: { eq: "AquaHoly.jpg" }) {
        childImageSharp {
          fluid{
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)


  const [flipped, setFlipped] = useState(Array(cardContent.length).fill(false))
  const flippedSpring = useSprings(cardContent.length, flipped.map(item =>({ 
    opacity: item ? 1 : 0,
    transform: `perspective(600px) rotateX(${item ? 180 : 0}deg)`,
    config: {
      mass: 5, tension: 500, friction: 80}
  })))

  var cardNodes = []
  for (let i = 0; i < cardContent.length; i++) {

    let transform = flippedSpring[i].transform
    let opacity = flippedSpring[i].opacity

    const cardFrontImgObj = (<Img fluid={data.cardFront.childImageSharp.fluid} className={cardQAStyle.cardImg} fadeIn={false} style={{ position: "fixed" }} />)
    const cardFrontContentObj = (<span className={langFont + ' ' + cardQAStyle.cardText}><FormattedHTMLMessage id={cardContent[i].frontContentKey} /></span>)
    const cardBackImgObj = (<Img fluid={data.cardBack.childImageSharp.fluid} className={cardQAStyle.cardImg} fadeIn={false} style={{ position: "fixed" }} />)
    const cardBackContentObj = (<span className={langFont + ' ' + cardQAStyle.cardText}><FormattedHTMLMessage id={cardContent[i].backContentKey} /></span>)

    cardNodes.push(
      <div className={cardQAStyle.cardContainer} onClick={() => {
        let flipped_t = []
        for (let j = 0; j < cardContent.length; j++) {
          flipped_t.push(j === i ? !flipped[j] : flipped[j])
        }
        setFlipped(flipped_t)
      }} key={i}>
        <animated.div className={cardQAStyle.card} style={{ opacity: opacity.to(o => 1 - o), transform: transform.to(t => `${t} rotateX(0deg)`) }}><div className={cardQAStyle.cardContent}>{cardFrontImgObj}{cardFrontContentObj}</div></animated.div>
      <animated.div className={cardQAStyle.card} style={{ opacity, transform: transform.to(t => `${t} rotateX(180deg)`) }} ><div className={cardQAStyle.cardContent}>{cardBackImgObj}{cardBackContentObj}</div></animated.div>
    </div>)
  }

  return (
    <>
      <div className={cardQAStyle.title}>
        {axisBadgeImage}
        <h2 className={langFont}><FormattedMessage id={'cardQA.title'} /> </h2>
        {axisBadgeImage}
      </div>
      <div className={cardQAStyle.grid}>
        {cardNodes}
      </div>
    </>
  )
}

export default CardQA