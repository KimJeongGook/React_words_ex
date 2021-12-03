import React from 'react'
import { useParams, NavLink, useSearchParams, useLocation } from "react-router-dom";
import words from '../wordData'
import './Word.css'

function Word() {
    const params = useParams();
    // const word = words[params.wordId]
    let [searchParams, setSearchParams] = useSearchParams()
    // const applyActiveColor = ({ isActive }) => (isActive ? {color: 'orangered'} : {})


    // const componentDidMount() {
    //     console.log('mount')
    //     const BASE_URL = 'https://dictionary-search-words.herokuapp.com/api/words'
     
    //     //서버에서 데이터 가져오기
    //     fetch(BASE_URL)
    //     .then( res => res.json())
    //     .then( result => {
    //       console.log(result)
    //       const {words}=result
    //       this.setState({loading: false, words})
    //     })
    //   }
   

    const changeQueryString = (e) => {
        const filter = e.target.value
        if(filter){
            setSearchParams({ filter })
        }else{
            setSearchParams({})
        }
    }
    const QueryNavLink = ({ to, children, ...words }) => {
        const location = useLocation();
        return <NavLink to={to + location.search} {...words}>{children}</NavLink>
    }
    // 필터링된 목록으로 렌더링하기
    const wordsFiltered = words
    .filter( word => {
        const filter = searchParams.get('filter')
        if(!filter) return true;
        const title = word.r_word.toLowerCase()
        return title.includes(filter.toLowerCase())
    })
    const word = wordsFiltered[params.wordId]
    return (
        <>
            {/* 쿼리스트링을 이용한 검색 */}
            <br/><input className="filter-word" value={searchParams.get('filter') || ""} 
                onChange={changeQueryString} placeholder="Search word ..."/>
            {/* 특정 블로그 포스트 */}
            {word ?
                <div className="word-container">
                    <h1><a href = {word.r_link} target="_blank" rel="noreferrer">
                        {word.r_word}</a>
                    <sup>{word.r_seq? word.r_seq:""}</sup></h1>
                    <p>{word.r_chi}
                        {word.r_pos}</p>
                    <span>{word.r_des}</span>

                </div> :
                <h1>Word PAGE</h1>}

                {/* 블로그 포스트 전체목록  */}
                {words
                    .filter( word => {
                        const filter = searchParams.get('filter')
                        if(!filter) return true;
                        const title = word.r_word.toLowerCase()
                        return title.includes(filter.toLowerCase())
                    })
                    .map( (word, id) => {
                        return (
                            <QueryNavLink key={id} to={`/words/${id}`} className="word-item">
                                {word.r_word}
                            </QueryNavLink>
                        )
                })}
        </>
    )
}
export default Word;