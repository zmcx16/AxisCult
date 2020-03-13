import React, { useState, useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

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
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function LangSelect({ use_lang, setLocale}) {
  const classes = useStyles();

  var default_lang = 'en'
  if (use_lang.includes('zh')) {
    default_lang = 'zh-TW'

  } else if (use_lang.includes('isekai')) {
    default_lang = 'isekai'
  } 

  const [lang, setLang] = useState(default_lang);
  const handleChange = event => {

    if (event.target.value === 'zh-TW') {
      setLocale('zh-Hant')
      window.history.pushState("", "", '#zh-TW')

    } else if (event.target.value === 'isekai') {
      setLocale('en')
      window.history.pushState("", "", '#isekai')

    } else {
      setLocale('en')
      window.history.pushState("", "", '#en')
    }

    console.log(event.target.value)
    setLang(event.target.value)
  };

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
    return () => {
      // componentWillUnmount is here!
    }
  }, [])

  return (
    <FormControl className={classes.margin}>
    <InputLabel htmlFor="demo-customized-select-native"></InputLabel>
    <NativeSelect
        id="demo-customized-select-native"
        value={lang}
        onChange={handleChange}
        input={<BootstrapInput />}
    >
        <option value={'en'}>EN</option>
        <option value={'zh-TW'}>ZH</option>
        <option value={'isekai'}>Isekai</option>
    </NativeSelect>
    </FormControl>
  );
}