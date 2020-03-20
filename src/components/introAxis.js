import React, { useState, useCallback, useEffect } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"
import { useTransition, animated } from 'react-spring'

import introBaseStyle from "./introBase.module.scss"

const introImgs = [
  {
    id: "intro1",
    imgFileName: "introAxis1.jpg",
    captionKey: "introAxis1.caption"
  },
  {
    id: "intro2",
    imgFileName: "introAxis2.jpg",
    captionKey: "introAxis2.caption"
  },
  {
    id: "intro3",
    imgFileName: "introAxis3.jpg",
    captionKey: "introAxis3.caption"
  },
  {
    id: "intro4",
    imgFileName: "introAxis4.jpg",
    captionKey: "introAxis4.caption"
  }
]


function IntroAxis({ langFont }) {

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

  const [nowImgIndex, setNowImgIndex] = useState(0)

  var introImgNodes = []
  introImgs.forEach(function (element) {
    const imgNode = data.images.edges.find(n => {
      return n.node.relativePath.includes(element.imgFileName);
    })
    
    const imgObj = (<Img fluid={imgNode.node.childImageSharp.fluid} className={introBaseStyle.imgBlock} key={element.id} fadeIn={false} />)
    const imgCaptionObj = (<span className={introBaseStyle.ImgCaption + ' ' + langFont}><FormattedMessage id={element.captionKey} values={{ alcanretia: <b><FormattedMessage id='alcanretia.text' /></b>, axisCult: <b><FormattedMessage id='axisCult.text' /></b> }} /></span>)

    introImgNodes.push(({ style }) => <animated.div style={{ ...style }}>{imgObj}{imgCaptionObj}</animated.div>)
  })

  const doSwitchImgNode = useCallback(
    () => setNowImgIndex(state => (state + 1) % introImgNodes.length), []
  )

  const transitions = useTransition(nowImgIndex, p => p, {
    from: { opacity: 0, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)', width: '100%', height: '100%', position: 'absolute' },
    config: { duration: 600 }
  })

  const [imageHoverState, setImageHoverState] = useState(false)

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    const switchImg_interval = setInterval(function () {
      if (imageHoverState === false){
        doSwitchImgNode()
      }
    }, 5000)

    return () => {
      // componentWillUnmount is here!
      clearInterval(switchImg_interval)
    }
  }, [imageHoverState])

  return (
    <>
      <div className={introBaseStyle.leftImg} onClick={doSwitchImgNode} 
        onMouseEnter={() => {
          setImageHoverState(true)
        }} 
        onMouseLeave={() => {
          setImageHoverState(false)
        }}>
        {transitions.map(({ item, props, key }) => {
          const Page = introImgNodes[item]
          return <Page key={key} style={props} />
        })}
      </div>
      
      <div className={introBaseStyle.rightText}>
        <h2><b>Congratulation!! This is a best oppuraunity to become a devoted Axis believer.</b></h2>
            <p><br />are you ever do some evil ... or have xxx.</p>
        <h2><b>Join the Axis Cult today!!</b></h2>
	    	<span>ya</span>
        <button onClick={() => {
        }}>test</button>
      </div>
    </>
  )
}

export default IntroAxis