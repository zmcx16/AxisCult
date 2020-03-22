import React from 'react'
import Button from '@material-ui/core/Button'

function SwitchLang({ setLocale }) {

  return (
    <div>{'Hello world!'}
      <Button onClick={() => {
        setLocale('en') 
        window.history.pushState("", "", '#en')
      }}>Switch En</Button>
      <Button onClick={() => {
        setLocale('zh-Hant')
        window.history.pushState("", "", '#zh')
      }}>Switch Zh</Button>
    </div>
  );
}

export default SwitchLang