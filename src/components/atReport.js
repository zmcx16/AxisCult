import React, { useState, useEffect, useRef } from 'react'
import { FormattedMessage, FormattedHTMLMessage} from "react-intl"
import { isMobile } from 'react-device-detect'

import atReportStyle from "./atReport.module.scss"

function AtReport({ langFont, getReportCallback, axisBadgeImage }) {
  
  const [report, setReport] = useState()

  getReportCallback.current = (elements) => {

    console.log(elements)

    let sum = 0
    for (let i = 0; i < elements.length; i++) {
      sum += elements[i]
    }

    let avg = sum / elements.length

    var scoreIcons = []
    let saturate = (avg - 10) / 20               // (0~4.5), mini = 10
    for (let i = 0; i < avg / (isMobile ? 20 : 10); i++) {  // 0 ~ 10 incons (mobile: 0 ~ 5)
      scoreIcons.push(<div key={i} style={{ filter: `saturate(${saturate})`}}>{axisBadgeImage}</div>)
    }

    var finalIcons = []
    for (let i = 0; i < 30; i++) { // full
      finalIcons.push(<div key={i} style={{filter: 'saturate(7)'}}>{axisBadgeImage}</div>)
    }

    const reportContentID = 
      avg < 50 ? 'adaptiveTesting.report.lowResult':
      avg < 90 ? 'adaptiveTesting.report.midResult': 'adaptiveTesting.report.highResult'

    setReport(
    <div className={atReportStyle.reportContainer}> 
      <div className={atReportStyle.score}>
        <div className={atReportStyle.scoreHeader}><h4 className={langFont}><FormattedMessage id={'adaptiveTesting.report.scoreText'} /></h4></div>
        {scoreIcons}
      </div>
      <div className={atReportStyle.score}>
        <div className={atReportStyle.scoreHeader}><h4 className={langFont}><FormattedMessage id={'adaptiveTesting.report.fitnessText'} /></h4></div>
        {finalIcons}
      </div>
      <div className={atReportStyle.comment}>
        <div className={langFont}><FormattedHTMLMessage id={reportContentID} /></div>
        <div className={langFont}><FormattedHTMLMessage id={'adaptiveTesting.report.resultText1'} /></div>
        <div className={atReportStyle.commentCenter + ' ' + langFont}><h3><FormattedMessage id={'adaptiveTesting.report.resultText2'} /></h3></div>
      </div>
    </div>
    )
  }

    return (
      <>
        {report}
      </>
    )
}

export default AtReport