import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { FormattedMessage } from "react-intl"

import footerStyle from "./footer.module.scss"

const Footer = ({langFont}) => {

  return (
    <div className={footerStyle.kanbanContainer} style={{ backgroundSize: 'cover', backgroundPosition: 'center center', backgroundAttachment: 'fixed', backgroundImage: 'url(' + require("../images/mosaicAqua.jpg") + ')' }}>
      <div className={footerStyle.kanbanOverlay}>
      </div>
      <footer>
        © {new Date().getFullYear()}, Built with
          {` `}
        <a href="https://project.zmcx16.moe/">zmcx16</a>
      </footer>
    </div>
  )
  
}

export default Footer
