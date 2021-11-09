import './App.css';
import React, {Component} from 'react';
import Word from './Word';

class App extends Component {
  constructor(props) {
    console.log('constructor')
    super(props)
    this.state = {
      loading: true,
      words: []
    }
  }
  //컴포넌트가 생성되었을때 호출이 됨
  componentDidMount() {
    console.log('mount')
    const BASE_URL = 'https://dictionary-search-words.herokuapp.com/api/words'

    //서버에서 데이터 가져오기
    fetch(BASE_URL)
    .then(res => res.json())
    .then(result => {
      const {words} = result
      console.log(words)
      this.setState({loading:false, words})
    })
  }
  // componentDidUpdate(){
  //   console.log('update')
  // }
  // componentWillUnmount(){
  //   console.log('unmount')
  // }

  render() {
    const {loading, words} = this.state

    const containerStyle = {
      width: '75%',
      columns: '1',
      margin: '30px auto',
      textAlign: 'center',
    }
    
    if(loading) {
      return(
        <div>
          <h1>Loading...</h1>
        </div>
      )
    } else{
      return(
        <div id="container" style={containerStyle}>
        <h1>국어대사전</h1>
            <input id="search" type="text" placeholder="단어를 검색하세요 ..."></input>
            <input id="submit" type="submit" value="찾기"></input> 
            <br></br><br></br>
            <hr></hr>
            <br></br>

          {/* 오픈 API 데이터 순회 => 컴포넌트로 변환 */}
          {words.map(word => {
            return(
              <Word 
                key={word._id}
                r_word={word.r_word}
                r_link={word.r_link}
                r_seq={word.r_seq}
                r_chi={word.r_chi}
                r_pos={word.r_pos}
                r_des={word.r_des}
              ></Word>
            )
          })}
        </div>
      ) 
    }
  }
}

export default App;
