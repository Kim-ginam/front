import React , {useState, useEffect} from 'react';
import {Select,Paper,InputBase,IconButton ,MenuItem ,Box ,makeStyles,Grid  } from '@material-ui/core'
import { connect } from 'react-redux'
import Recipemodalscroll from 'components/recip/recipemodalscroll.js'
import SearchIcon from '@material-ui/icons/Search';
import RecipList from '../components/recip/reciplist.js'
import logo from './main_logo.png'; // with import
import { withRouter  } from 'react-router-dom';
import {getRecip,getRecip2} from 'ajax/ajax'
import {setRecip, delUserInfo } from 'store/actions/index' 
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  img : {

  },
  loading : {

  }
}));

function Result(props){

  const classes = useStyles();
  const [age, setAge] = React.useState('검색타입');
  const [loaded, setloaded] = React.useState(false);
  var input
  useEffect(() => { // didmounthook

    if(props.searchinput.input!==''){
      getRecipList(props.searchinput.input, props.jaryo,0)
     }
    else{getRecipList(JSON.parse(localStorage.getItem('searchinput')),JSON.parse(localStorage.getItem('jaryo')),0)}
    
  });

  
  function getRecipList(tags, jaryo,type) {
    // setloaded(false)
    console.log('씨발너냐')
    return new Promise(function(resolve){
      var res=  getRecip2(tags,jaryo)
      resolve(res)
    }).then(result=>{
      props.SetRecip(result)
    }).then(() =>{
      setloaded(true)
    }).catch(error => {
      console.log(error.response)
      if(error.response.status == 401){
        alert('로그인해주세요')
        localStorage.removeItem("userInfo");
        props.DelUserInfo() 
        props.history.push(`/Login`)
      }else if(error.response.status == 404){
        alert('해당 재료의 조합을 찾을수 없어요.키워드와 재료를 변경해보세요')
        props.history.push(`/Main`)
      }
  })
}

function getRecipList2(tags, jaryo) {
  setloaded(false)
  return new Promise(function(resolve){
    var res=  getRecip2(tags,jaryo)
    resolve(res)
  }).then(result=>{
    props.SetRecip(result)
  }).then(() =>{
    setloaded(true)
  }).catch(error => {
    console.log(error.response)
    if(error.response.status == 401){
      alert('로그인해주세요')
      localStorage.removeItem("userInfo");
      props.DelUserInfo() 
      props.history.push(`/Login`)
    }else if(error.response.status == 404){
      alert('해당 재료의 조합을 찾을수 없어요.키워드와 재료를 변경해보세요')
      props.history.push(`/Main`)
    }
})
}


function handleSearch(e){
  e.preventDefault();
  console.log('!!')
  console.log(input)
  // if(input !== ''){
  //   if(props.searchinput.input!==''){
  //     getRecipList2(input, props.jaryo)
  //    }
  //   else {getRecipList(JSON.parse(localStorage.getItem('searchinput')),JSON.parse(localStorage.getItem('jaryo')))}
  
  //   input = ('')
  // }
  if(input !== ''){getRecipList2(input, props.jaryo)}
  else {getRecipList(JSON.parse(localStorage.getItem('searchinput')),JSON.parse(localStorage.getItem('jaryo')))}
}


function handleChange(e){
  e.preventDefault();
  input =(e.target.value)
}
    console.log(props)
        return (
          <div>
            <Box align="center">
                <Grid item xs = {10} sm ={7} md ={4} lg={4}  >
                <img className={classes.img} src={logo}></img>
                    <Paper>
                    <Grid container justify="center"  alignItems="center">
                        {/* <Grid item xs = {2} sm ={2} md ={2}>
                            <Box >
                            <Select
                                    fullWidth={true} 
                                    value={age}
                                    onChange={handleChange2}
                                    label="검색타입"
                            >
                                    <MenuItem value={10}>맛집</MenuItem>
                                    <MenuItem value={20}>여행지</MenuItem>
                                    <MenuItem value={30}>레시피</MenuItem>
                            </Select>
                            </Box>
                        </Grid> */}
                        <Grid item  xs = {8} sm ={8} md ={8}>
                        <InputBase  
                            value = {input}
                            onChange={handleChange}
                            fullWidth = {true}
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        </Grid>
                        <Grid item  xs = {2} sm ={2} md ={2}>
                        <IconButton  aria-label="search">
                        <SearchIcon margin={10} onClick={handleSearch} />
                        </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Box>
        { loaded ?(<RecipList></RecipList>) :(
         <Box align='center' margin={20}>
           <CircularProgress className={classes.loading} />
        </Box> 
          ) }
          
        </div>
        )
}

const mapStateToProps  = state => {
    return{
      mode : state.mode ,// store 의 mode 를 props로 사용함
      userinfo :state.userinfo,
      searchinput : state.searchinput,
      jaryo : state.jaryo
    }
  }

  
const mapDispatchToProps  = dispatch => { //SetMode 에 엑션 디스패치 연결
  return{
    SetRecip : (data) =>{
      dispatch(setRecip(data))
    },
    DelUserInfo: ( ) => {
      dispatch(delUserInfo( ));
    }
  }
}
  
  export default withRouter (connect(
    mapStateToProps,mapDispatchToProps
  )(Result))