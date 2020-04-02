
// thumbnail size: 64x64
// desktop: 12x6
// mobile: 6x6

import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useSprings, animated } from 'react-spring'
import { FormattedMessage } from "react-intl"

import cardQAStyle from "./cardQA.module.scss"

function CardQA({ langFont, isMobile, axisBadgeImage }) {

  const cardContent = [
    {
      imgFileName: "card1.jpg",
      frontContentKey: "introAqua.caption1",
      backContentKey: "introAqua.caption2"
    },
    {
      imgFileName: "card1.jpg",
      frontContentKey: "introAqua.caption2",
      backContentKey: "introAqua.caption3"
    },
    {
      imgFileName: "card1.jpg",
      frontContentKey: "introAqua.caption3",
      backContentKey: "introAqua.caption4"
    },
    {
      imgFileName: "card1.jpg",
      frontContentKey: "introAqua.caption1",
      backContentKey: "introAqua.caption2"
    }
  ]

  const data = useStaticQuery(graphql`
    query {
      images: allFile{
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
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

    const frontImgNode = data.images.edges.find(n => {
      return n.node.relativePath.includes('axis-icon.png')
    })

    const backImgNode = data.images.edges.find(n => {
      return n.node.relativePath.includes(cardContent[i].imgFileName)
    })

    const cardFrontImgObj = (<Img fluid={frontImgNode.node.childImageSharp.fluid} className={cardQAStyle.cardImg} fadeIn={false} style={{ position: "fixed" }} />)
    const cardFrontContentObj = (<span className={langFont + ' ' + cardQAStyle.cardText}><FormattedMessage id={cardContent[i].frontContentKey} /></span>)
    const cardBackImgObj = (<Img fluid={backImgNode.node.childImageSharp.fluid} className={cardQAStyle.cardImg} fadeIn={false} style={{ position: "fixed" }} />)
    const cardBackContentObj = (<span className={langFont + ' ' + cardQAStyle.cardText}><FormattedMessage id={cardContent[i].backContentKey} /></span>)

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
        <h2> 阿克西斯教 問與答專欄 </h2>
        {axisBadgeImage}
      </div>
      <div className={cardQAStyle.grid}>
        {cardNodes}
      </div>
    </>
  )
}

export default CardQA