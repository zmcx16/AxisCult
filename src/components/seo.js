/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Helmet from "react-helmet"
import { useIntl, defineMessages  } from "react-intl"

import Common from "../components/common"

// local function
function getHrefLang() {
  let hreflangs = []
  Common.support_langs.forEach(element => {
    hreflangs.push({
      rel: "alternate",
      href: "https://" + window.location.hostname + "/#" + element,
      hreflang: element,
    })
  })

  return hreflangs
}

function SEO({ lang }) {

  const messages = defineMessages({
    siteMetadata_title: {
      id: 'siteMetadata.title',
    },
    siteMetadata_description: {
      id: 'siteMetadata.description',
    },
    siteMetadata_author: {
      id: 'siteMetadata.author',
    }
  });

  const intl = useIntl()
  const title = intl.formatMessage(messages.siteMetadata_title)
  const description = intl.formatMessage(messages.siteMetadata_description)
  const author = intl.formatMessage(messages.siteMetadata_author)

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${title}`}
      meta={[
        {
          name: `description`,
          content: description,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: description,
        },
      ]}
      link={getHrefLang()}
    />
  )
}

SEO.defaultProps = {
  lang: `en`
}

SEO.propTypes = {
  lang: PropTypes.string
}

export default SEO
