import React, { useState, useEffect, useRef, useCallback, createRef } from 'react'
import { FormattedMessage } from "react-intl"

import Question from "./question"

import adaptiveTestingStyle from "./adaptiveTesting.module.scss"

function AdaptiveTesting({ langFont, isMobile, axisBadgeImage }) {

  const questions = [{
    initScore: 3
  }]

  const scoresRef = useRef([])
  // free any refs that we're not using anymore
  scoresRef.current = scoresRef.current.slice(0, questions.length)
  for (let i = 0; i < questions.length; i++) {
    scoresRef.current[i] = createRef()
    scoresRef.current[i].current = questions[i].initScore
  }

  const getResult = useCallback(() => {
    console.log(scoresRef)
  }, [scoresRef]);

  return (
    <>
      <div className={adaptiveTestingStyle.title}>
        {axisBadgeImage}
        <div className={adaptiveTestingStyle.titleText}><h2> 想知道阿克西斯教適不適合自己嗎? 下面的適性測驗可以測試你跟阿克西斯教的速配指數!</h2></div>
        {axisBadgeImage}
      </div>
      <div className={adaptiveTestingStyle.sheet}>
        <Question
          size={11} minScore={0} questionID={'111'} headerStartID={'222'} headerEndID={'333'} 
          axisBadgeImage={axisBadgeImage} scoreRef={scoresRef.current[0]}
        />
      </div>
        <button type="button" onClick={getResult}>
        test
      </button>
    </>
  )
}

export default AdaptiveTesting