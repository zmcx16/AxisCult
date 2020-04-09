import React, { useState, useEffect, useRef, useCallback, createRef } from 'react'
import { FormattedMessage } from "react-intl"
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Button from '@material-ui/core/Button';
import { isMobile } from 'react-device-detect'

import AtQuestion from "./atQuestion"
import AtReport from "./atReport"

import adaptiveTestingStyle from "./adaptiveTesting.module.scss"

function AdaptiveTesting({ langFont, axisBadgeImage }) {

  const questions = [{
      initScore: 5,
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
      initScore: 5,
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

  const [wordBreakStyle, setWordBreakStyle] = useState('keep-all')

  const [questionNode, setQuestionNode] = useState([])
  const scoresRef = useRef([])
  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    var questionNodeTemp = []

    // free any refs that we're not using anymore
    scoresRef.current = scoresRef.current.slice(0, questions.length)
    for (let i = 0; i < questions.length; i++) {

      scoresRef.current[i] = createRef()
      scoresRef.current[i].current = isMobile ? parseInt(questions[i].initScore / 2) : questions[i].initScore

      questionNodeTemp.push(<AtQuestion
        key={i}
        langFont={langFont}
        config={{
          size: isMobile ? 6 : 11,
          minScore: isMobile ? parseInt(questions[i].minScore / 2) : questions[i].minScore,
          questionID: questions[i].questionID,
          headerStartID: questions[i].headerStartID,
          headerEndID: questions[i].headerEndID
        }} axisBadgeImage={axisBadgeImage} scoreRef={scoresRef.current[i]}
      />)
    }

    setQuestionNode(questionNodeTemp)

    if(isMobile){
      setWordBreakStyle('')
    }

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  const getReportCallback = useRef(null)

  const getResult = useCallback(() => {

    let scores = []
    for(let i=0; i<scoresRef.current.length; i++){
      scores.push(scoresRef.current[i].current * 100 / (isMobile ? 5 : 10))
    }
    getReportCallback.current(scores)

  }, [scoresRef])

  return (
    <>
      <div className={adaptiveTestingStyle.title}>
        {axisBadgeImage}
        <div className={adaptiveTestingStyle.titleText} style={{ wordBreak: wordBreakStyle }}><h2 className={langFont}><FormattedMessage id={'adaptiveTesting.title'} /></h2></div>
        {axisBadgeImage}
      </div>
      <div className={adaptiveTestingStyle.sheet}>
        {questionNode}
      </div>
      <div className={adaptiveTestingStyle.buttonContainer}>
        <MuiThemeProvider theme={createMuiTheme({ palette: { secondary: blue } })}>
          <Button variant="contained" color="secondary" onClick={getResult}><span className={langFont}><FormattedMessage id={'adaptiveTesting.reportButton'} /></span></Button>
        </MuiThemeProvider>
      </div>
      <AtReport langFont={langFont} getReportCallback={getReportCallback} axisBadgeImage={axisBadgeImage}/>
    </>
  )
}

export default AdaptiveTesting