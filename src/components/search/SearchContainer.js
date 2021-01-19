import React , {useState, Fragment} from 'react';
import { FormControlLabel ,FormControl ,FormLabel ,RadioGroup , Radio ,Box ,Grid  } from '@material-ui/core'
import Searchref from 'components/search/Search_ref'
import Searchfood from 'components/search/Search_food'
import { connect } from 'react-redux'
import styles from 'components/search/SearchStyle'
import { withRouter  } from 'react-router-dom';
import {getRecip2} from 'ajax/ajax'
import {setRecip} from 'store/actions/index' 
import { setSerchInput } from '../../store/actions';
import RecipList from 'components/recip/reciplist.js'
import CircularProgress from '@material-ui/core/CircularProgress';
import logo from './main_logo.png'; // with import
import {delUserInfo } from 'store/actions/index' 

function  Search(props) {
  const classes = styles();
  const [searchinpunt, setsearchinpunt] =  useState('');
  const [loaded, setloaded] = React.useState(false);
  const [searched, setsearched] = React.useState(false);


  function getRecipList(tags, jaryo) {
    setloaded(false)
    console.log('씨발너냐')
    return new Promise(function(resolve){
      var res=  getRecip2(tags,jaryo)
      // resolve(res)
      res.then(result=>{
        props.SetRecip(result)
      })
      .then(() =>{
        setloaded(true)
      }).catch(error => {
        console.log(error.response)
        if(error.response.status == 401){
          alert('로그인해주세요')
          localStorage.removeItem("userInfo");
          props.DelUserInfo() 
          props.history.push(`/Login`)
        }else if(error.response.status == 404){
          alert('해당 재료의 조합을 찾을수 없어요.키워드와 재료를 변경하거나 오타를 확인하세요')
          setsearched(false)
        }else{getRecipList(tags, jaryo)}
    })
      resolve(res)
    })
}



  function handleSearch(e){
    e.preventDefault();
    if(searchinpunt !== ''){
    props.SetInput(searchinpunt)
    setsearchinpunt('')
    setsearched(true)
    // props.history.push(`/Result/${props.mode.mode}/`)
    getRecipList(props.searchinput.input , props.jaryo)
    }
  }

  function handleChange(e){
    e.preventDefault();
    setsearchinpunt(e.target.value)
  }
    return(

        <Fragment>
        <Box className={classes.root} align="center">  
        <Grid container
              
              direction="column"
              alignItems="center"
              justify="center">

            <Grid item  xs = {12} sm ={6} md ={6}>
              {/* eslint-disable-next-line */}
              {props.type ==='레시피' &&  !searched &&<img className={classes.img2} src='./assets/main_logo.png'></img>}
              {/* eslint-disable-next-line */}
              {props.type ==='레시피' &&  searched &&<img className={classes.img} src={logo}></img>}
              {/* {props.type ==='레시피' && <Refrigerator></Refrigerator>} */}
              {props.type ==='맛집' && <img className={classes.img} src='./assets/main.jpg'></img>}
              {/* eslint-disable-next-line */}
              {props.type ==='여행지' &&<img className={classes.img} src='./assets/여행.png'></img>}
            </Grid>

          </Grid>
          
          <Grid item xs = {10} sm ={6} md ={4} lg={4}  >
          {/* <FormControl component="fieldset">
              <FormLabel component="legend">검색 타입을 선택하세요</FormLabel>
              <br/>
              {
              !searched && (<RadioGroup row aria-label="position" name="position" defaultValue="top">
              <FormControlLabel
                onChange ={props.onChange}
                value="맛집"
                control={<Radio color="primary" />}
                label="맛집"
                labelPlacement="start"
              />
              <FormControlLabel
               onChange ={props.onChange}
                value="여행지"
                control={<Radio color="primary" />}
                label="여행지"
                labelPlacement="start"
              />
              <FormControlLabel 
             onChange ={props.onChange}
               value="레시피" 
               control={<Radio color="primary" />} 
               label="레시피"
               labelPlacement="start"/>
            </RadioGroup> )
              
              }
                
            </FormControl> */}

            {props.type==='레시피' &&  (
                 <Searchref onChange={handleChange} onClick={handleSearch} value ={searchinpunt}></Searchref>
             )
            }
             
            </Grid>
            <br/>
            {/* <Chatbot></Chatbot> */}
        </Box>
        {searched && (
          
          loaded ?(<RecipList></RecipList>) :(
          <Box align='center' margin={10}>
            <CircularProgress  />
            <FormLabel component="legend">재료가 너무 적으면 로딩 시간이 소요될수 있어요..!</FormLabel>
         </Box> 
           ) 
        )
        }
        </Fragment>

    )
}



const mapStateToProps  = state => {
  return{
    mode : state.mode, // store 의 mode 를 props로 사용함
    jaryo : state.jaryo,
    searchinput : state.searchinput
    // recipes : state.recipes
  }
}

const mapDispatchToProps  = dispatch => { //SetMode 에 엑션 디스패치 연결
  return{
    SetRecip : (data) =>{
      dispatch(setRecip(data))
    },
    SetInput : (input) =>{
      dispatch(setSerchInput(input))
    },
    DelUserInfo: ( ) => {
      dispatch(delUserInfo( ));
    }
  }
}

export default  withRouter(
  connect(
  mapStateToProps,mapDispatchToProps
)(Search))