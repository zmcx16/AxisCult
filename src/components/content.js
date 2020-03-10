import React from "react"
import contentStyle from "./content.module.scss"

const Content = () => {
  return (
    <div className={contentStyle.contentContainer}>
      <div className={contentStyle.section}
        style={{
          minHeight: 500,
        }}
      >
      </div>
      <div className={contentStyle.section}
        style={{
          minHeight: 500,
        }}
      >
      </div>
      <div className={contentStyle.section}
        style={{
          minHeight: 500,
        }}
      >
      </div>
    </div>
  )
}


export default Content
