import React from 'react';
import { FormattedMessage } from "react-intl"

import marqueeStyle from "./marquee.module.scss"

function Marquee({ text_id, langFont }) {

  return (
    <div className={marqueeStyle.marquee}>
      <span className={langFont}><FormattedMessage id={text_id} /></span>
    </div>
  );
}

export default Marquee