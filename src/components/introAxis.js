import React, { useState, useCallback } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"
import { useTransition, animated } from 'react-spring'

import introBaseStyle from "./introBase.module.scss"

const introImgs = [
  {
    id: "intro1",
    imgFileName: "alcanretia1.jpg",
    captionKey: "alcanretiaImg1.caption"
  },
  {
    id: "intro2",
    imgFileName: "alcanretia2.jpg",
    captionKey: "alcanretiaImg2.caption"
  },
  {
    id: "intro3",
    imgFileName: "alcanretia3.jpg",
    captionKey: "alcanretiaImg3.caption"
  },
  {
    id: "intro4",
    imgFileName: "alcanretia4.jpg",
    captionKey: "alcanretiaImg4.caption"
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

  const onClick = useCallback(
    () => setNowImgIndex(state => (state + 1) % 4), []
  )
  const transitions = useTransition(nowImgIndex, p => p, {
    from: { opacity: 0, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)', width: '100%', height: '100%', position: 'absolute' },
    leave: { opacity: 0, transform: 'translate3d(-100%,0,0)', width: '100%', height: '100%', position: 'absolute' },
    config: { duration: 600 }
  })

  return (
    <>
      <div className={introBaseStyle.leftImg} onClick={onClick}>
        {transitions.map(({ item, props, key }) => {
          const Page = introImgNodes[item]
          return <Page key={key} style={props} />
        })}
      </div>
      
      <div className={introBaseStyle.rightText}>
        <h2><b>Congratulation!! This is a best oppuraunity to become a devoted Axis believer.</b></h2>
            <p><br />The Axis Cult is location on city.</p>
        <h2><b>Join the Axis Cult today!!</b></h2>
	    	<span>Look the beautiful world.</span>
        <button onClick={() => {
        }}>test</button>
      </div>
    </>
  )
}

export default IntroAxis