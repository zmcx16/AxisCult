import React from 'react';
import Button from '@material-ui/core/Button';

function SwitchLang({ setLocale }) {

  return (
    <div>{'Hello world!'}
      <Button onClick={() => setLocale('en')}>Switch En</Button>
      <Button onClick={() => setLocale('zh-Hant')}>Switch Zh</Button>
    </div>
  );
}

export default SwitchLang