import React, { useState, useEffect, useRef } from 'react'
import { FormattedMessage } from "react-intl"
import { isMobile } from 'react-device-detect'

import atReportStyle from "./atReport.module.scss"

function AtReport({ getReportCallback, axisBadgeImage }) {
  
  const [report, setReport] = useState()

  getReportCallback.current = (elements) => {

    console.log(elements)

    let sum = 0
    for (let i = 0; i < elements.length; i++) {
      sum += elements[i]
    }

    let avg = sum / elements.length

    var scoreIcons = []
    let saturate = avg / 20               // (0~5)
    for (let i = 0; i < avg / (isMobile ? 20 : 10); i++) {  // 0 ~ 10 incons (mobile: 0 ~ 5)
      scoreIcons.push(<div key={i} style={{ filter: `saturate(${saturate})`}}>{axisBadgeImage}</div>)
    }

    var finalIcons = []
    for (let i = 0; i < 30; i++) { // full
      finalIcons.push(<div key={i} style={{filter: 'saturate(10)'}}>{axisBadgeImage}</div>)
    }

    setReport(
    <div className={atReportStyle.reportContainer}> 
      <div className={atReportStyle.score}>
        <div className={atReportStyle.scoreHeader}><h4>測驗分數:</h4></div>
        {scoreIcons}
      </div>
      <div className={atReportStyle.score}>
        <div className={atReportStyle.scoreHeader}><h4>適性度:</h4></div>
        {finalIcons}
      </div>
      <div className={atReportStyle.comment}>
        <div>雖然你的測驗分數不高, 不過這代表你內心是十分渴望救贖的, 放心, 阿克西斯教的教義就是容許一切, OOOXX之類的。</div>
        <div>最後經過我們阿克西斯教超級電腦運算的結果, 你跟阿克西斯教的適性度是100%。</div>
        <div className={atReportStyle.commentCenter}><h3>來吧! 不要再猶豫了, 快加入阿克西斯教吧!!!</h3></div>
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