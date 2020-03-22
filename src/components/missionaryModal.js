import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { FormattedMessage } from "react-intl"

import missionaryModalStyle from "./missionaryModal.module.scss"

const useStyles = makeStyles(theme => ({
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

export default function MissionaryModal({ langFont, use_lang }) {

  const data = useStaticQuery(graphql`
    query {
      enImage: file(relativePath: { eq: "application-form-en.jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      zhTWImage: file(relativePath: { eq: "application-form-zh-TW.jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }

      isekaiImage: file(relativePath: { eq: "application-form-isekai.jpg" }) {
        childImageSharp {
          fluid(quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  var applicationForm = null
  if (use_lang.includes('zh')) {
    applicationForm = data.zhTWImage
  } else if (use_lang.includes('isekai')) {
    applicationForm = data.isekaiImage
  } else {
    applicationForm = data.enImage
  }

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Img fluid={applicationForm.childImageSharp.fluid} className={missionaryModalStyle.applicationFormImg} />
            <div className={missionaryModalStyle.textfield}>
              test
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}