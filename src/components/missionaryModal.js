import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { FormattedMessage } from "react-intl"

import missionaryModalStyle from "./missionaryModal.module.scss"

export default function MissionaryModal({ langFont, isMobile }) {

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

  const applicationForm = data.images.edges.find(n => {
    return n.node.relativePath.includes('application-form-isekai.jpg')
  })

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  
  const [modalPageStyle, setModalPageStyle] = useState(missionaryModalStyle.paper)

  // options function
  const joinAxisNow = () =>{
    const party = data.images.edges.find(n => {
      return n.node.relativePath.includes('party.jpg')
    })

    setModalPageStyle(missionaryModalStyle.story)
    setModalContent(
    <>
      <Img fluid={party.node.childImageSharp.fluid} fadeIn={false} />
      <div className={missionaryModalStyle.storyCenterTextField}>
        <h1 className={langFont + ' ' + missionaryModalStyle.paperTextLine}>歡迎加入世界上最喜歡宴會和祭典的阿克西斯教</h1>
        <h1 className={langFont + ' ' + missionaryModalStyle.paperTextLine}>把腦袋的螺絲轉鬆一起黑皮黑皮吧!!!</h1>
      </div>
    </>)
  }

  const isAxisBeliever = () =>{
    const party = data.images.edges.find(n => {
      return n.node.relativePath.includes('bless.jpg')
    })

    var fSize = ''
    if (isMobile)
      fSize = 'xx-small'

    setModalPageStyle(missionaryModalStyle.story)
    setModalContent(
    <>
      <Img fluid={party.node.childImageSharp.fluid} fadeIn={false} />
      <div className={missionaryModalStyle.storyCenterTextField}>
        <h2 style={{ fontSize: fSize }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id="missionary.believer.text1" /><FormattedMessage id="missionary.believer.text2" /></h2>
        <h2 className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id="missionary.believer.text3" /></h2>
      </div>
    </>)
  }

  const [modalContent, setModalContent] = useState(
    <>
      <Img fluid={applicationForm.node.childImageSharp.fluid} className={missionaryModalStyle.applicationFormImg} fadeIn={false}/>
      <div className={missionaryModalStyle.paperTextField}>
        <h3 className={langFont + ' ' + missionaryModalStyle.paperTextLine}>你覺得阿克西斯教如何?</h3>
        <h3 className={langFont + ' ' + missionaryModalStyle.paperTextLine}>心動了嗎? 一定心動了吧!</h3>
        <h3 className={langFont + ' ' + missionaryModalStyle.paperTextLine}>現在就加入阿克西斯教吧!!!</h3>
      </div>
      <div className={missionaryModalStyle.optionContainerCenter}>
        <div onClick={joinAxisNow}><h4 className={langFont + ' ' + missionaryModalStyle.optionText} >立刻加入阿克西斯教</h4></div>
        <div onClick={isAxisBeliever}><h4 className={langFont + ' ' + missionaryModalStyle.optionText}>我已經是虔誠的阿克西斯教徒</h4></div>
        <div><h4 className={langFont + ' ' + missionaryModalStyle.optionText}>我拒絕 / 下次再說</h4></div>
        <div><h4 className={langFont + ' ' + missionaryModalStyle.optionText}>我是艾莉絲教徒...</h4></div>
      </div>
    </>)

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={missionaryModalStyle.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={modalPageStyle}>
            {modalContent}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}