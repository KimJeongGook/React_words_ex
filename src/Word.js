import React from "react";

function Word({r_word, r_link, r_seq, r_chi, r_pos, r_des}) {
    const itemStyle = {
        textAlign: 'left',
        width: '100%',
        marginBottom: '10px',
        marginLeft: '20px',
        background: 'rgb(236, 233, 236)',
        display: 'inline-block', 
    }

    return (
        <div className="item" style={itemStyle}>
            <div className = "word">
                <a href={r_link} target="_blank" rel="noreferrer">
                    {r_word}</a>
                <sup>{r_seq? r_seq:""}</sup>
                {r_chi}
                {r_pos}
            </div>
            <p className="description">{r_des}
                <button type="button" className="btn btn-outline-dark">
                    <a href={r_link} target="_blank" rel="noreferrer">자세히 보기</a>
                </button>
            </p>
        </div>
    )
}

export default Word; 