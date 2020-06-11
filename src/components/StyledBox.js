import React from 'react'

const StyledBox = ({newFilter,result}) => {
    if(newFilter.length===0){
        return null
    }
    else{
        return(
            <div>
                {(result.filter(res => res.toLowerCase().includes(newFilter.toLowerCase()))).map(res => <span><button>{res}</button><br /></span>)}
            </div>
        )
    }
}

export default StyledBox