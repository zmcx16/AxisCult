import React, { useState, useEffect, useCallback } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button';
import { FormattedMessage } from "react-intl"
import GifPlayer from "react-gif-player"

import { isMobile } from 'react-device-detect'

import missionaryModalStyle from "./missionaryModal.module.scss"
import "./missionaryModal-gif.css"


export default function MissionaryModal({ langFont, openModalRef }) {

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

  const [open, setOpen] = React.useState(false)
  const enableClose = React.useRef(false)

  const enableMissionary = React.useRef(false)

  const handleOpen = () => {
    if (enableMissionary.current){
      doMissionary()
    }

    setOpen(true)
  }

  const handleClose = () => {
    if (enableClose.current){
      setOpen(false)
    }
  }

  openModalRef.current.openModal = handleOpen // use for parent trigger
  
  const [modalPageStyle, setModalPageStyle] = useState(missionaryModalStyle.paper)

  // options function
  // join axis cult
  const joinAxisNow = () =>{
    openModalRef.current.openModal = null
    
    const imageNode = data.images.edges.find(n => {
      return n.node.relativePath.includes('party.jpg')
    })

    setModalPageStyle(missionaryModalStyle.story)
    setModalContent(
    <>
      <Img fluid={imageNode.node.childImageSharp.fluid} fadeIn={false} loading={'eager'}/>
      <div className={missionaryModalStyle.storyCenterTextField}>
        <h1 style={{ fontSize: isMobile ? 'large' : ''}} className={langFont + ' ' + missionaryModalStyle.paperTextLine}>歡迎加入世界上最喜歡宴會和祭典的阿克西斯教</h1>
        <h1 style={{ fontSize: isMobile ? 'large' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}>把腦袋的螺絲轉鬆一起黑皮黑皮吧!!!</h1>
      </div>
    </>)

    enableClose.current = true
  }

  // axis believer
  const isAxisBeliever = () =>{
    openModalRef.current.openModal = null

    const imageNode = data.images.edges.find(n => {
      return n.node.relativePath.includes('bless.jpg')
    })

    setModalPageStyle(missionaryModalStyle.story)
    setModalContent(
    <>
      <Img fluid={imageNode.node.childImageSharp.fluid} fadeIn={false} loading={'eager'}/>
      <div className={missionaryModalStyle.storyCenterTextField}>
        <h2 style={{ fontSize: isMobile ? 'xx-small' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id="missionary.believer.text1" /><FormattedMessage id="missionary.believer.text2" /></h2>
        <h2 style={{ fontSize: isMobile ? 'large' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id="missionary.believer.text3" /></h2>
      </div>
    </>)

    enableClose.current = true
  }

  // do missionary
  const doMissionary = () =>{
    console.log('doMissionary')
    enableClose.current = false

    const imageNode = data.images.edges.find(n => {
      return n.node.relativePath.includes('missionary1.jpg')
    })

    setModalPageStyle(missionaryModalStyle.story)
    setModalContent(
      <>
        <Img fluid={imageNode.node.childImageSharp.fluid} fadeIn={false} loading={'eager'}/>
        <div className={missionaryModalStyle.storyCenterTextField}>
          <h2 style={{ fontSize: isMobile ? 'small' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}>哎呀! 剛好我很擅長占卜, 讓我幫你占卜一下吧! 就在剛才, 占卜的結果出爐了。 不久後你會遭遇不幸, 但如果加入阿克西斯教, 就能夠迴避這場災難!</h2>
          <h2 style={{ fontSize: isMobile ? 'small' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}>入教吧! 現在就該入教了吧!!!</h2>
        </div>
        <div className={isMobile ? missionaryModalStyle.missionButtonContainerMobile : missionaryModalStyle.missionButtonContainer }>
          <MuiThemeProvider theme={createMuiTheme({ palette: { secondary: blue } })}>
            <div></div>
            <Button variant="contained" color="secondary" style={{ fontSize: isMobile ? 'x-small' : '' }} onClick={()=>{
              joinAxisNow()
              enableMissionary.current = false
              openModalRef.current.doMissionary = false
            }}>加入阿克西斯教</Button>
            <Button variant="contained" color="secondary" style={{ fontSize: isMobile ? 'x-small' : '' }} onClick={() => {
              enableMissionary.current = true
              openModalRef.current.doMissionary = true
              setOpen(false)
            }}>立刻逃跑</Button>
            <div></div>
          </MuiThemeProvider>
        </div>
      </>)
  }

  // Eris believer
  const isErisBeliever = () => {
    openModalRef.current.openModal = null

    const erisGifs = [
      {
        gif: require("../images/missionary/eris1-no-repeat.gif"),
        time: 9000
      },
      {
        gif: require("../images/missionary/eris2-no-repeat.gif"),
        time: 5000
      },
      {
        gif: require("../images/missionary/eris3-no-repeat.gif"),
        time: 11000
      },
      {
        gif: require("../images/missionary/eris4-no-repeat.gif"),
        time: 8000
      }
    ]

    const pick = erisGifs[Math.floor(Math.random() * (erisGifs.length))]
    console.log(pick)
    setModalPageStyle(missionaryModalStyle.storyNoBorder)
    setModalContent(
      <div style={{pointerEvents: 'none'}}>
        <GifPlayer gif={pick.gif} autoplay/>
      </div>)

    setTimeout(() => {
      setOpen(false)
    }, pick.time+1000)
  }

  const [modalContent, setModalContent] = useState(
    <>
      <Img fluid={applicationForm.node.childImageSharp.fluid} className={missionaryModalStyle.applicationFormImg} fadeIn={false} loading={'eager'}/>
      <div className={missionaryModalStyle.paperTextField}>
        <h3 className={langFont + ' ' + missionaryModalStyle.paperTextLine}>你覺得阿克西斯教如何?</h3>
        <h3 className={langFont + ' ' + missionaryModalStyle.paperTextLine}>心動了嗎? 一定心動了吧!</h3>
        <h3 className={langFont + ' ' + missionaryModalStyle.paperTextLine}>現在就加入阿克西斯教吧!!!</h3>
      </div>
      <div className={missionaryModalStyle.optionContainerCenter}>
        <div onClick={joinAxisNow}><h4 className={langFont + ' ' + missionaryModalStyle.optionText} >立刻加入阿克西斯教</h4></div>
        <div onClick={isAxisBeliever}><h4 className={langFont + ' ' + missionaryModalStyle.optionText}>我已經是虔誠的阿克西斯教徒</h4></div>
        <div onClick={doMissionary}><h4 className={langFont + ' ' + missionaryModalStyle.optionText}>我拒絕 / 下次再說</h4></div>
        <div onClick={isErisBeliever}><h4 className={langFont + ' ' + missionaryModalStyle.optionText}>我是艾莉絲教徒...</h4></div>
      </div>
    </>)

  return (
    <div>
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