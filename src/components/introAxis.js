import React, { useState } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"

import introBaseStyle from "./introBase.module.scss"
import introAxisStyle from "./introAxis.module.scss"

const introImgs = [
  {
    imgFileName: "alcanretia1.jpg",
    captionKey: "alcanretiaImg1.caption"
  },
  {
    imgFileName: "alcanretia2.jpg",
    captionKey: ""
  },
  {
    imgFileName: "alcanretia3.jpg",
    captionKey: ""
  },
  {
    imgFileName: "alcanretia4.jpg",
    captionKey: ""
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

  var introImgNodes = []
  introImgs.forEach(function (element) {
    introImgNodes.push(data.images.edges.find(n => {
      return n.node.relativePath.includes(element.imgFileName);
    }))
  });

  var introImgCaption = introImgs[0].captionKey

  return (
    <>
      <div className={introBaseStyle.leftImg}>
        <Img fluid={introImgNodes[0].node.childImageSharp.fluid} className={introBaseStyle.imgBlock} />
        <Img fluid={introImgNodes[1].node.childImageSharp.fluid} className={introBaseStyle.imgBlock} />
        <span className={introBaseStyle.ImgCaption + ' ' + langFont}><FormattedMessage id={introImgCaption} /></span>
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