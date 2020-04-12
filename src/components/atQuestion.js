import React, { useState, useEffect } from 'react'
import { FormattedMessage } from "react-intl"

import atQuestionStyle from "./atQuestion.module.scss"

function AtQuestion({ langFont, config, axisBadgeImage, scoreRef }) {

  const [score, setScore] = useState(scoreRef.current)

  var blocks = []
  // use var i will all i = size
  for(let i=0; i<config.size; i++){
    var blockStyle = atQuestionStyle.block
    if(i===0){
      blockStyle = atQuestionStyle.blockStart
    } else if (i === config.size-1){
      blockStyle = atQuestionStyle.blockEnd
    }

    var blockStyle2 = i===score ? atQuestionStyle.selected : ''

    blocks.push(
      (<div className={blockStyle + ' ' + blockStyle2} key={i} 
          onClick={() => {
            if(i>=config.minScore){
              setScore(i)
              scoreRef.current = i
            }
          }}>
        <div style={{ opacity: i === score ? .8 : .3, filter: i === score ? 'saturate(5)' : 'none'}}>{axisBadgeImage}</div>
      </div>)
    )
  }

  const [question, setQuestion] = useState()
  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    setQuestion(
      <>
        <div className={atQuestionStyle.questionText}><h4 className={langFont}><FormattedMessage id={config.questionID} /></h4></div>
        <div className={atQuestionStyle.header}>
          <div className={langFont}><FormattedMessage id={config.headerStartID} /></div>
          <div className={langFont} style={{ textAlign: 'right' }}><FormattedMessage id={config.headerEndID} /></div>
        </div>
      </>
    )

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  return (
    <div className={atQuestionStyle.question}>
      {question}
      <div className={atQuestionStyle.blockContainer} style={{ gridTemplateColumns: 'repeat(' + config.size + ', 1fr)'}}>
        {blocks}
      </div>
    </div>
  )
}

export default AtQuestion