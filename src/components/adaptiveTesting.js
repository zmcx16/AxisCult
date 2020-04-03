import React, { useState, useEffect, useRef, useCallback, createRef } from 'react'
import { FormattedMessage } from "react-intl"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button';

import AtQuestion from "./atQuestion"
import AtReport from "./atReport"

import adaptiveTestingStyle from "./adaptiveTesting.module.scss"

function AdaptiveTesting({ langFont, isMobile, axisBadgeImage }) {

  const questions = [{
      initScore: 6,
      minScore: 0,
      questionID: 'adaptiveTesting.question1.text',
      headerStartID: 'adaptiveTesting.question1.headerStart',
      headerEndID: 'adaptiveTesting.question1.headerEnd'
    }, {
      initScore: 5,
      minScore: 0,
      questionID: 'adaptiveTesting.question2.text',
      headerStartID: 'adaptiveTesting.question2.headerStart',
      headerEndID: 'adaptiveTesting.question2.headerEnd'
    }, {
      initScore: 7,
      minScore: 0,
      questionID: 'adaptiveTesting.question3.text',
      headerStartID: 'adaptiveTesting.question3.headerStart',
      headerEndID: 'adaptiveTesting.question3.headerEnd'
    }, {
      initScore: 5,
      minScore: 0,
      questionID: 'adaptiveTesting.question4.text',
      headerStartID: 'adaptiveTesting.question4.headerStart',
      headerEndID: 'adaptiveTesting.question4.headerEnd'
    }, {
      initScore: 10,
      minScore: 10,
      questionID: 'adaptiveTesting.question5.text',
      headerStartID: 'adaptiveTesting.question5.headerStart',
      headerEndID: 'adaptiveTesting.question5.headerEnd'
    }
  ]

  var questionNode = []

  const scoresRef = useRef([])
  console.log(scoresRef)
  // free any refs that we're not using anymore
  scoresRef.current = scoresRef.current.slice(0, questions.length)
  for (let i = 0; i < questions.length; i++) {

    scoresRef.current[i] = createRef()
    scoresRef.current[i].current = questions[i].initScore

    questionNode.push(<AtQuestion
      key={i}
      config={{
        size: 11,
        minScore: questions[i].minScore,
        questionID: questions[i].questionID,
        headerStartID: questions[i].headerStartID,
        headerEndID: questions[i].headerEndID
      }} axisBadgeImage={axisBadgeImage} scoreRef={scoresRef.current[i]}
    />)
  }

  const getReportCallback = useRef(null)

  const getResult = useCallback(() => {

    let scores = []
    for(let i=0; i<scoresRef.current.length; i++){
      scores.push(scoresRef.current[i].current)
    }
    getReportCallback.current(scores)

  }, [scoresRef])

  return (
    <>
      <div className={adaptiveTestingStyle.title}>
        {axisBadgeImage}
        <div className={adaptiveTestingStyle.titleText}><h2> 想知道阿克西斯教適不適合自己嗎? 下面的適性測驗可以測試你跟阿克西斯教的速配指數!</h2></div>
        {axisBadgeImage}
      </div>
      <div className={adaptiveTestingStyle.sheet}>
        {questionNode}
      </div>
      <div className={adaptiveTestingStyle.buttonContainer}>
        <MuiThemeProvider theme={createMuiTheme({ palette: { secondary: blue } })}>
          <Button variant="contained" color="secondary" onClick={getResult}>測驗結果</Button>
        </MuiThemeProvider>
      </div>
      <AtReport getReportCallback={getReportCallback} axisBadgeImage={axisBadgeImage}/>
    </>
  )
}

export default AdaptiveTesting