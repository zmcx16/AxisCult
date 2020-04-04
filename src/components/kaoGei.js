
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
import { isMobile } from 'react-device-detect'

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
    width: '80%'
  },
}));

// prevent always regen thumbnail ---
const kaoGeiImgTotal = 104
var kaoGeiImgs = []

for (let i = 1; i <= kaoGeiImgTotal; i++) {
  kaoGeiImgs.push({ thumbnail: 'kaoGei' + i + '-thumbnail.jpg', source: 'kaoGei' + i + '.jpg', id: 'kaoGei' + i })
}

shuffle(kaoGeiImgs)
// -------------------------------------

function KaoGei({ langFont, axisBadgeImage }) {

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

  const [introImgNodes, setIntroImgNodes] = useState()
  const [imagesStyle, setImagesStyle] = useState(kaoGeiStyle.grid)

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!

    var kaoGeiImgCount = 72
    if (isMobile) {
      kaoGeiImgCount = 36
      setImagesStyle(kaoGeiStyle.gridMobile)
    }

    var introImgNodesTemp = []
    for (let i = 0; i < kaoGeiImgCount; i++) {
      const thumbnailNode = data.thumbnailImages.edges.find(n => {
        return n.node.relativePath.includes(kaoGeiImgs[i].thumbnail)
      })

      introImgNodesTemp.push(
        <div key={kaoGeiImgs[i].id} onClick={() => {
          const sourceNode = data.sourceImages.edges.find(n => {
            return n.node.relativePath.includes(kaoGeiImgs[i].source)
          })
          setModalImage(<Img fluid={sourceNode.node.childImageSharp.fluid} fadeIn={false} />)
          setModalOpen(true)
        }}>
          <Img fixed={thumbnailNode.node.childImageSharp.fixed} fadeIn={false} className={kaoGeiStyle.thumbnail} />
        </div>
      )
    }

    setIntroImgNodes(introImgNodesTemp)

    return () => {
      // componentWillUnmount is here!
    }
  }, [isMobile])

  // Modal
  const modalStyle = useModalStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };

  const [modalImage, setModalImage] = useState(<></>)
  
  return (
    <>
      <div className={kaoGeiStyle.title}>
        {axisBadgeImage}
        <h2> 想更進一步認識阿克婭女神嗎? 點擊下面的圖片吧!!! </h2>
        {axisBadgeImage}
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