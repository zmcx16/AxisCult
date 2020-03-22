
// thumbnail size: 64x64
// desktop: 12x6
// mobile: 6x6

import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'

import kaoGeiStyle from "./kaoGei.module.scss"

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


const useModalStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    width: '90%'
  },
}));

// prevent always regen thumbnail ---
const kaoGeiImgCount = 4
var kaoGeiImgs = []

for (let i = 1; i <= kaoGeiImgCount; i++) {
  kaoGeiImgs.push({ thumbnail: 'kaoGei' + i + '-thumbnail.jpg', source: 'kaoGei' + i + '.jpg', id: 'kaoGei' + i })
}

shuffle(kaoGeiImgs)
// -------------------------------------

function KaoGei({ langFont, isMobile }) {

  const data = useStaticQuery(graphql`
    query {
      thumbnailImages: allFile{
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fixed(width: 64 quality: 100) {
                ...GatsbyImageSharpFixed
              }
            }
          }
        }
      }

      sourceImages: allFile{
        edges {
          node {
            relativePath
            name
            childImageSharp {
              fluid(quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)  

  var introImgNodes = []
  kaoGeiImgs.forEach(function (element) {
    const thumbnailNode = data.thumbnailImages.edges.find(n => {
      return n.node.relativePath.includes(element.thumbnail)
    })
    
    introImgNodes.push(
    <div key={element.id} onClick={() => {
      const sourceNode = data.sourceImages.edges.find(n => {
        return n.node.relativePath.includes(element.source)
      })
      setModalImage(<Img fluid={sourceNode.node.childImageSharp.fluid} fadeIn={false}/>)
      setModalOpen(true)
    }}>
      <Img fixed={thumbnailNode.node.childImageSharp.fixed} fadeIn={false} className={kaoGeiStyle.thumbnail}/>
    </div>
    )
  })

  var imagesStyle = kaoGeiStyle.grid
  if (isMobile){
    imagesStyle = kaoGeiStyle.gridMobile
  }

  // Modal
  const modalStyle = useModalStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  const [modalImage, setModalImage] = useState(<></>)
  
  return (
    <>
      <div>
        <h1> 想更進一步認識阿克婭女神嗎? 點擊下面的圖片吧!!! </h1>
      </div>
      <div className={imagesStyle}>
        {introImgNodes}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={modalStyle.modal}
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
        timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div className={modalStyle.paper}>
            <div>
              {modalImage}
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default KaoGei