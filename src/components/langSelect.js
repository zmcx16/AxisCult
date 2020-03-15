import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { FormattedMessage } from "react-intl"

import layoutStyle from "./layout.module.scss"
import langSelectStyle from "./langSelect.module.scss"

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    minWidth: 120,
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      backgroundColor: theme.palette.background.default,
    },
  },
}))(InputBase)

const useStyles = makeStyles(theme => ({
  margin: {
    margin: '10px'
  },
}))

var langTipNoNeedShow = false

export default function LangSelect({ use_lang, setLocale, langFont, setLangFont}) {
  const selectClasses = useStyles();

  var default_lang = 'en'
  if (use_lang.includes('zh')) {
    default_lang = 'zh-TW'

  } else if (use_lang.includes('isekai')) {
    default_lang = 'isekai'
  } 

  const [lang, setLang] = useState(default_lang);
  const handleSelectChange = event => {

    langTipNoNeedShow = true

    if (event.target.value === 'zh-TW') {
      setLocale('zh-Hant')
      setLangFont(layoutStyle.defaultFont)
      window.history.pushState("", "", '#zh-TW')

    } else if (event.target.value === 'isekai') {
      setLocale('en')
      setLangFont(layoutStyle.isekaiFont)
      window.history.pushState("", "", '#isekai')

    } else {
      setLocale('en')
      setLangFont(layoutStyle.defaultFont)
      window.history.pushState("", "", '#en')
    }

    setLang(event.target.value)
  }

  const [langTipDisplay, setLangTipDisplay] = useState(true)
  const handleClose = event => {
    langTipNoNeedShow = true
    setLangTipDisplay(false)
  }

  useEffect(() => {
    // componentDidMount is here!
    // componentDidUpdate is here!
    if (window.location.href.indexOf('zh-TW') !== -1 ) {
      setLang('zh-TW')
    } else if (window.location.href.indexOf('isekai') !== -1) {
      setLang('isekai')
    } else if (window.location.href.indexOf('en') !== -1){
      setLang('en')
    }

    if (langTipNoNeedShow){
      setLangTipDisplay(false)
    }

    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  return (
    <>
      <div className={langTipDisplay ? langSelectStyle.langTip : langSelectStyle.hidden}>
        <span className={langFont}>
          <FormattedMessage id="langSelectTips.text1" />
          <br />
          <FormattedMessage id="langSelectTips.text2" />
        </span>
        <div className={langSelectStyle.closeBtn} onClick={handleClose}>x</div>
      </div>
      <FormControl className={selectClasses.margin}>
        <InputLabel htmlFor="lang-select"></InputLabel>
        <NativeSelect
          id="lang-select"
          value={lang}
          onChange={handleSelectChange}
          onClick={handleClose}
          input={<BootstrapInput />}
          className={langFont}
        >
          <option value={'en'} style={{
            fontFamily: [
              '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"',
            ]
          }}>English</option>
          <option value={'zh-TW'}>繁體中文</option>
          <option value={'isekai'} className={layoutStyle.isekaiFont}>Isekai</option>
        </NativeSelect>
      </FormControl>
    </>
  );
}