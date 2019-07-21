import React from 'react';
import { Link } from 'gatsby';

const IndexPage = (props) => {
  return (
    <div style={style.root}>
      <Link style={style.link} to={'/workshops'}>Check out the workshops!</Link>
    </div>
  )
}

const style = {
  root: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyItems: 'center'
  },
  link: {
    textAlign: 'center',
    width: '100%'
  }
}

export default IndexPage;
