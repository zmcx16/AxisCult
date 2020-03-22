import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"
import { useTransition, animated } from 'react-spring'

import introBaseStyle from "./introBase.module.scss"

function IntroImage({ langFont, introImgs, introImgConfig}) {

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

  const imgStyle = 
    introImgConfig.imgPos === 'center' ? introBaseStyle.centerImg : 
    introImgConfig.imgPos === 'left' ? introBaseStyle.leftImg : introBaseStyle.rightImg

  const [nowImgIndex, setNowImgIndex] = useState(0)

  var introImgNodes = []
  introImgs.forEach(function (element) {
    const imgNode = data.images.edges.find(n => {
      return n.node.relativePath.includes(element.imgFileName)
    })
    
    const imgObj = (<Img fluid={imgNode.node.childImageSharp.fluid} className={introBaseStyle.imgBlock} key={element.id} fadeIn={false} />)
    const imgCaptionObj = (<span className={introBaseStyle.ImgCaption + ' ' + langFont}><FormattedMessage id={element.captionKey} /></span>)
    
    introImgNodes.push(({ style }) => <animated.div style={{ ...style }}>{imgObj}{imgCaptionObj}</animated.div>)
  })

  const doSwitchImgNode = useCallback(
    () => setNowImgIndex(state => (state + 1) % introImgNodes.length), []
  )

  const transitions = useTransition(nowImgIndex, p => p, introImgConfig.transitionsConfig)

  // useRef prevent render every time
  const imageHoverState = useRef(false)

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    const switchImg_interval = setInterval(function () {
      if (imageHoverState.current === false){
        doSwitchImgNode()
      }
    }, introImgConfig.interval)

    return () => {
      // componentWillUnmount is here!
      clearInterval(switchImg_interval)
    }
  }, [imageHoverState])

  return (
    <>
      <div className={imgStyle} onClick={doSwitchImgNode} 
        onMouseEnter={() => {
          imageHoverState.current = true
        }} 
        onMouseLeave={() => {
          imageHoverState.current = false
        }}>
        {transitions.map(({ item, props, key }) => {
          const Page = introImgNodes[item]
          return <Page key={key} style={props} />
        })}
      </div>
    </>
  )
}

export default IntroImage