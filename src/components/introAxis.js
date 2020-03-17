import React from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"

import introAxisStyle from "./introAxis.module.scss"

const introImgs = [
  {
    imgKey: "demo1",
    textKey: ""
  },
  {
    imgKey: "demo2",
    textKey: ""
  },
  {
    imgKey: "demo3",
    textKey: ""
  },
  {
    imgKey: "demo4",
    textKey: ""
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

  const introImg = data.images.edges.find(n => {
    return n.node.relativePath.includes("arukakantia1.jpg");
  });

  return (
    <>
      <div className={introAxisStyle.leftImg}>
        <Img fluid={introImg.node.childImageSharp.fluid} className={introAxisStyle.imgBlock} />
	  </div>
      <div className={introAxisStyle.rightText}>
		<h2>Join the Axis Cult today!!</h2>
		  <p><b>Congratulation!! This is a best oppuraunity to become a devoted Axis believer.</b><br />The Axis Cult is location on city.</p>
		<span>Look the beautiful world.</span>
      </div>
    </>
  )
}

export default IntroAxis