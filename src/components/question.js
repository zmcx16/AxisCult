import React, { useState, useEffect, useRef } from 'react'
import { FormattedMessage } from "react-intl"

import questionStyle from "./question.module.scss"

function Question({ size, minScore, questionID, headerStartID, headerEndID, axisBadgeImage, scoreRef }) {

  const [score, setScore] = useState(scoreRef.current)

  var blocks = []
  // use var i will all i = size
  for(let i=0; i<size; i++){
    var blockStyle = questionStyle.block
    if(i===0){
      blockStyle = questionStyle.blockStart
    } else if (i === size-1){
      blockStyle = questionStyle.blockEnd
    }

    var blockStyle2 = i===score ? questionStyle.selected : ''

    blocks.push(
      (<div className={blockStyle + ' ' + blockStyle2} key={i} 
          onClick={() => {
            setScore(i)
            scoreRef.current = i
          }}>
        <div style={{opacity: i===score ? .8 : .3}}>{axisBadgeImage}</div>
      </div>)
    )
  }

  return (
    <div className={questionStyle.question}>
      <div className={questionStyle.questionText}><h4>CCC</h4></div>
      <div className={questionStyle.header}>
        <div>0</div>
        <div style={{textAlign: 'right'}}>10 - 非常同意</div>
      </div>
      <div className={questionStyle.blockContainer} style={{ gridTemplateColumns: 'repeat(' + size + ', 1fr)'}}>
        {blocks}
      </div>
    </div>
  )
}

export default Question