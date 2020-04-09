
// thumbnail size: 64x64
// desktop: 12x6
// mobile: 6x6

import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { useSpring, animated } from 'react-spring'
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

  function CardNode({ langFont, cardData }) {
    
    const [flipped, set] = useState(false)
    const { transform, opacity } = useSpring({
      opacity: flipped ? 1 : 0,
      transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
      config: { mass: 5, tension: 500, friction: 80 }
    })

    const [card, setCard] = useState()
    useEffect(() => {
      // componentDidMount is here!
      // componentDidUpdate is here!

      const cardFrontImgObj = (<Img fluid={data.cardFront.childImageSharp.fluid} className={cardQAStyle.cardImg} fadeIn={false} style={{ position: "fixed" }} />)
      const cardFrontContentObj = (<span className={langFont + ' ' + cardQAStyle.cardText}><FormattedHTMLMessage id={cardData.frontContentKey} /></span>)
      const cardBackImgObj = (<Img fluid={data.cardBack.childImageSharp.fluid} className={cardQAStyle.cardImg} fadeIn={false} style={{ position: "fixed" }} />)
      const cardBackContentObj = (<span className={langFont + ' ' + cardQAStyle.cardText}><FormattedHTMLMessage id={cardData.backContentKey} /></span>)

      setCard(
        <div className={cardQAStyle.cardContainer} onClick={() => set(state => !state)}>
          <animated.div className={cardQAStyle.card} style={{ opacity: opacity.to(o => 1 - o), transform: transform.to(t => `${t} rotateX(0deg)`) }}><div className={cardQAStyle.cardContent}>{cardFrontImgObj}{cardFrontContentObj}</div></animated.div>
          <animated.div className={cardQAStyle.card} style={{ opacity, transform: transform.to(t => `${t} rotateX(180deg)`) }} ><div className={cardQAStyle.cardContent}>{cardBackImgObj}{cardBackContentObj}</div></animated.div>
        </div>)

      return () => {
        // componentWillUnmount is here!
      }
    }, [])

    return (<>{card}</>)
  }

  const cardNodes = [cardContent.map((content, index)=>{
    return <CardNode langFont={langFont} cardData={content} key={index} />
  })]

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