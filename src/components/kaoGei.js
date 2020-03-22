
// thumbnail size: 64x64
// desktop: 12x6
// mobile: 6x6

import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

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
    width: '400px'
    //padding: theme.spacing(2, 4, 3),
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
      images: allFile{
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
    }
  `)    
  
  var introImgNodes = []
  kaoGeiImgs.forEach(function (element) {
    const imgNode = data.images.edges.find(n => {
      return n.node.relativePath.includes(element.thumbnail);
    })
    
      introImgNodes.push(
        <div key={element.id} onClick={() => {
          //setModalSource(element.source)
          setModalOpen(true);
        }}>
          <Img fixed={imgNode.node.childImageSharp.fixed} fadeIn={false}/>
        </div>
      )
  })

  // Modal
  const modalStyle = useModalStyles();
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleClose = () => {
    setModalOpen(false);
  };
  
  return (
    <>
      <div>
        <h1> 想更了解我們信奉的女神阿克婭大人嗎? 點擊下面的圖片吧!!!</h1>
      </div>
      <div>
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
              test
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  )
}

export default KaoGei