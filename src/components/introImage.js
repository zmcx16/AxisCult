import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"
import { useTransition, animated } from 'react-spring'

import { isPageVisibility } from '../common/utils'

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
    introImgConfig.imgPos === 'centerMobileImg' ? introBaseStyle.centerMobileImg : 
    introImgConfig.imgPos === 'centerWithFullText' ? introBaseStyle.centerImg : 
    introImgConfig.imgPos === 'left' ? introBaseStyle.leftImg : introBaseStyle.rightImg

  const textStyle = 
    introImgConfig.textStyle === 'imgFullTextMobile' ? introBaseStyle.imgFullTextMobile : 
    introImgConfig.textStyle === 'imgFullText' ? introBaseStyle.imgFullText : 
    introImgConfig.textStyle === 'imgCaptionMobile' ? introBaseStyle.imgCaptionMobile : introBaseStyle.imgCaption

  const [nowImgIndex, setNowImgIndex] = useState(0)

  var introImgNodes = []
  for (let i = 0; i < introImgs.length; i++) {
    const imgNode = data.images.edges.find(n => {
      return n.node.relativePath.includes(introImgs[i].imgFileName)
    })
    
    const imgObj = (<Img fluid={imgNode.node.childImageSharp.fluid} className={textStyle === 'imgFullTextMobile' || textStyle === 'imgFullTextMobile' ? introBaseStyle.imgBlockWithOpacity : introBaseStyle.imgBlock} key={i} fadeIn={false} loading={'eager'} />)
    const imgTextObj = (<span className={textStyle + ' ' + langFont}><FormattedMessage id={introImgs[i].textKey} /></span>)
    
    introImgNodes.push(({ style }) => <animated.div style={{ ...style }}>{imgObj}{imgTextObj}</animated.div>)
  }

  const doSwitchImgNode = useCallback(
    () => {
      setNowImgIndex(state => (state + 1) % introImgNodes.length)
    }, []
  )

  const transitions = useTransition(nowImgIndex, p => p, introImgConfig.transitionsConfig)

  // useRef prevent render every time
  const imageHoverState = useRef(false)
  
  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    const switchImg_interval = setInterval(function () {
      if (isPageVisibility() && imageHoverState.current === false){
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
        <div className={introBaseStyle.imgFrameLeft}></div>
        <div className={introBaseStyle.imgFrameRight}></div>
        <div className={introBaseStyle.imgFrameTop}></div>
        <div className={introBaseStyle.imgFrameBottom}></div>
      </div>
    </>
  )
}

export default IntroImage