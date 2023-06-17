import React from 'react'
// import Main from '../components/MAin'
// import Main from '../components/Mains'
import Mains from '../components/Mains'
import Row from '../components/Row'
import requests from '../Request'

const Home = () => {
  return (
    <div>
      <Mains />
      <Row title="UpComing" fetchURL={requests.requestUpcoming}/>
      <Row title="Popular" fetchURL={requests.requestPopular}/>
      <Row title="Trending" fetchURL={requests.requestTrending}/>
      <Row title="Top Rated" fetchURL={requests.requestTopRated}/>
      <Row title="Horror" fetchURL={requests.requestHorror}/>

    </div>
  )
}

export default Home
