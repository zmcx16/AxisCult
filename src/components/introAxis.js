import React, { useState } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"

import introBaseStyle from "./introBase.module.scss"
import introAxisStyle from "./introAxis.module.scss"

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
  

  var introImgNodesStyle = {}
  introImgs.forEach(function (element, index) {
    if(index === nowImgIndex){
      introImgNodesStyle[element.id] = "block"
    }
    else{
      introImgNodesStyle[element.id] = "none"
    }
  })
  const [introImgStyle, setIntroImgStyle] = useState(introImgNodesStyle)


  var introImgNodes = []
  introImgs.forEach(function (element) {
    const imgNode = data.images.edges.find(n => {
      return n.node.relativePath.includes(element.imgFileName);
    })
    
    introImgNodes.push(<Img fluid={imgNode.node.childImageSharp.fluid} className={introBaseStyle.imgBlock} key={element.id} style={{ display: introImgStyle[element.id] }} />)
  })

  const [introImgCaption, setIntroImgCaption] = useState(<FormattedMessage id={introImgs[nowImgIndex].captionKey} />)

  return (
    <>
      <div className={introBaseStyle.leftImg}>
        {introImgNodes}
        <span className={introBaseStyle.ImgCaption + ' ' + langFont}>{introImgCaption}</span>
	    </div>
      <div className={introBaseStyle.rightText}>
        <h2><b>Congratulation!! This is a best oppuraunity to become a devoted Axis believer.</b></h2>
            <p><br />The Axis Cult is location on city.</p>
        <h2><b>Join the Axis Cult today!!</b></h2>
	    	<span>Look the beautiful world.</span>
        <button onClick={() => {
          const changeIndex = (nowImgIndex + 1) % introImgs.length
          setIntroImgCaption(<FormattedMessage id={introImgs[changeIndex].captionKey} />)
          
          var imgStyle = {introImgStyle}
          console.log(imgStyle)
          imgStyle.introImgStyle[introImgs[nowImgIndex].id] = "none"
          imgStyle.introImgStyle[introImgs[changeIndex].id] = "block"
          console.log(imgStyle)
          setIntroImgStyle(imgStyle.introImgStyle)
          
          setNowImgIndex(changeIndex)
        }}>test</button>
      </div>
    </>
  )
}

export default IntroAxis