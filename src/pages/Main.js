import React, {useState} from 'react';
import Search from 'components/search/SearchContainer'
import {setType} from 'store/actions/index' 
import { connect } from 'react-redux'
import { withRouter  } from 'react-router-dom';

function main (props) {
  
  const onChange = (e) => { 
    props.SetMode("레시피") //dispatch에 연결된 메서드
  }
  console.log(props.mode)
 
    return(   
      <div style={{backgroundColor: '#599216'}}> 
        <Search type={props.mode.mode} onChange={onChange}></Search>
      </div>
    )
  
}

const mapStateToProps  = state => {
  return{
    mode : state.mode // store 의 mode 를 props로 사용함
  }
}
const mapDispatchToProps  = dispatch => { //SetMode 에 엑션 디스패치 연결
  return{
    SetMode : (mode) =>{
      dispatch(setType(mode))
    }
  }
}

const Main = withRouter(
  connect(
  mapStateToProps,
  mapDispatchToProps
)(main))

export default Main