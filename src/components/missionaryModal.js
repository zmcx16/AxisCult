import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    if (isMobile) {
      setModalPageStyle(missionaryModalStyle.paperMobile)
    }

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

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
        <h1 style={{ fontSize: isMobile ? 'large' : ''}} className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id={'missionary.joinAxisNow.text1'} /></h1>
        <h1 style={{ fontSize: isMobile ? 'large' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id={'missionary.joinAxisNow.text2'} /></h1>
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
        <h2 style={{ fontSize: isMobile ? 'small' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id="missionary.believer.text3" /></h2>
      </div>
    </>)

    enableClose.current = true
  }

  // do missionary
  const doMissionary = () =>{

    enableClose.current = false
    openModalRef.current.doMissionary = false

    const scripts = [
      {
        imgFileName: "missionary1.jpg",
        textContent1: "missionary.doMissionary1.textContent1",
        textContent2: "missionary.doMissionary1.textContent2"
      },
      {
        imgFileName: "missionary2.jpg",
        textContent1: "missionary.doMissionary2.textContent1",
        textContent2: "missionary.doMissionary2.textContent2"
      },
      {
        imgFileName: "missionary3.jpg",
        textContent1: "missionary.doMissionary3.textContent1",
        textContent2: "missionary.doMissionary3.textContent2"
      },
      {
        imgFileName: "missionary4.jpg",
        textContent1: "missionary.doMissionary4.textContent1",
        textContent2: "missionary.doMissionary4.textContent2"
      },
      {
        imgFileName: "missionary5.jpg",
        textContent1: "missionary.doMissionary5.textContent1",
        textContent2: "missionary.doMissionary5.textContent2"
      },
      {
        imgFileName: "missionary6.jpg",
        textContent1: "missionary.doMissionary6.textContent1",
        textContent2: "missionary.doMissionary6.textContent2"
      },
      {
        imgFileName: "missionary7.jpg",
        textContent1: "missionary.doMissionary7.textContent1",
        textContent2: "missionary.doMissionary7.textContent2"
      },
      {
        imgFileName: "missionary8.jpg",
        textContent1: "missionary.doMissionary8.textContent1",
        textContent2: "missionary.doMissionary8.textContent2"
      }   
    ]

    const pick = scripts[Math.floor(Math.random() * (scripts.length))]

    const imageNode = data.images.edges.find(n => {
      return n.node.relativePath.includes(pick.imgFileName)
    })

    setModalPageStyle(missionaryModalStyle.story)
    setModalContent(
      <>
        <Img fluid={imageNode.node.childImageSharp.fluid} fadeIn={false} loading={'eager'}/>
        <div className={missionaryModalStyle.storyCenterTextField} style={{ top: isMobile ? '40%' : '50%' }}>
          <h2 style={{ fontSize: isMobile ? 'x-small' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id={pick.textContent1} /></h2>
          <h2 style={{ fontSize: isMobile ? 'x-small' : '' }} className={langFont + ' ' + missionaryModalStyle.paperTextLine}><FormattedMessage id={pick.textContent2} /></h2>
        </div>
        <div className={isMobile ? missionaryModalStyle.missionButtonContainerMobile : missionaryModalStyle.missionButtonContainer }>
          <MuiThemeProvider theme={createMuiTheme({ palette: { secondary: blue } })}>
            <div></div>
            <Button size={isMobile ? "small" : "medium"} variant="contained" color="secondary" style={{ fontSize: isMobile ? 'x-small' : '' }} onClick={()=>{
              joinAxisNow()
              enableMissionary.current = false
              openModalRef.current.doMissionary = false
            }}><span className={langFont}><FormattedMessage id="missionary.doMissionary.yesButton" /></span></Button>
            <Button size={isMobile ? "small" : "medium"} variant="contained" color="secondary" style={{ fontSize: isMobile ? 'x-small' : '' }} onClick={() => {
              enableMissionary.current = true
              openModalRef.current.doMissionary = true
              setOpen(false)
            }}><span className={langFont}><FormattedMessage id="missionary.doMissionary.noButton" /></span></Button>
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
        <h3 className={langFont}><FormattedMessage id="missionary.applicationFormText1" /></h3>
        <h3 className={langFont}><FormattedMessage id="missionary.applicationFormText2" /></h3>
        <h3 className={langFont}><FormattedMessage id="missionary.applicationFormText3" /></h3>
      </div>
      <div className={missionaryModalStyle.optionContainerCenter}>
        <div onClick={joinAxisNow}><h4 className={langFont + ' ' + missionaryModalStyle.optionText} ><FormattedMessage id="missionary.applicationFormOption1" /></h4></div>
        <div onClick={isAxisBeliever}><h4 className={langFont + ' ' + missionaryModalStyle.optionText}><FormattedMessage id="missionary.applicationFormOption2" /></h4></div>
        <div onClick={doMissionary}><h4 className={langFont + ' ' + missionaryModalStyle.optionText}><FormattedMessage id="missionary.applicationFormOption3" /></h4></div>
        <div onClick={isErisBeliever}><h4 className={langFont + ' ' + missionaryModalStyle.optionText}><FormattedMessage id="missionary.applicationFormOption4" /></h4></div>
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