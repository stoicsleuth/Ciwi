import React from 'react'
import styled from 'styled-components'

const Ul = styled.ul`
    background-color: black;
    list-style-type: none;
    float: right;
    margin: 0;
    padding: 0;
    width: 500px;
`


const A = styled.a`
    border: 1px solid #ddd;
    margin-top: -1px;
    text-decoration: none;
    font-size: 18px;
    display: block;
    color: white;
`
const Li = styled.li`
    ${A}:hover & {
        fill: gray;
    }
`


const StyledBox = ({newFilter,result}) => {
    if(newFilter.length===0){
        return null
    }
    else{
        return(
            <Ul>
                {(result.filter(res => res.toLowerCase().includes(newFilter.toLowerCase()))).map(res => <Li><A href="#" >{res}</A></Li>)}
            </Ul>
        )
    }
}

export default StyledBox