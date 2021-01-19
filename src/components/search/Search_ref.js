import React, {useState} from 'react';
import {FormLabel,Box ,InputBase ,makeStyles,Paper,Grid,IconButton ,Chip } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import Refrigerator from 'components/refrigerator/Refrigerator'
import styles from 'components/search/SearchStyle'
import { connect } from 'react-redux'
import { withRouter  } from 'react-router-dom';
import {addJaryo,delJaryo} from 'store/actions/index' 
import './Search_ref.css'


function  Search(props) {
  const classes = styles();

  const [jaryoinput, setjaryoinput] =  useState('');

  function handleClick(e) {
    e.preventDefault();

    if(jaryoinput !== ''){
      props.AddJaryo(jaryoinput)
      setjaryoinput('')
    }

  }
  

  function handleChange(e) {
    e.preventDefault();
    setjaryoinput(e.target.value)
  }

  function handleDelete(e) {
    props.DelJaryo(e)

  }

    return( 
      <div>
        <Box>
        
        <div>
        <Box className="refrigerator">
        <Grid item  xs = {12} sm ={12} md ={12}>
         <Refrigerator ></Refrigerator>
        </Grid>
       </Box>
       </div>
        <Paper>
         <Grid container justify="center"  alignItems="center">
            <Grid item  xs = {10} sm ={10} md ={10}>
            <InputBase 
                value = {props.value}
                onChange={props.onChange}
                fullWidth = {true}
                className={classes.input}
                placeholder={"키워드를 #으로 구분해 입력하세요."}
                inputProps={{ 'aria-label': 'search google maps' }}
              />
            </Grid>
            <Grid item  xs = {2} sm ={2} md ={2}>
            <IconButton className={classes.iconButton} aria-label="search">
              <SearchIcon onClick={props.onClick} />
            </IconButton>
            </Grid>
        
         </Grid>
      </Paper>
      <Box className={classes.root2}>
      {props.jaryo.map((row) => (
       <Chip
        spacing={2}
        label={row.name}
        onDelete={()=>{handleDelete(row.name)}}
        color='default'
      />
          ))}
      </Box>
   </Box>
   </div>
    )
}

const mapStateToProps = state => {
  return{
    test : state.test,
    jaryo : state.jaryo
  }
}

const mapDispatchToProps  = dispatch => { //SetMode 에 엑션 디스패치 연결
  return{
    AddJaryo : (name) =>{
      dispatch(addJaryo(name))
    },
    DelJaryo : (name) =>{
      dispatch(delJaryo(name))
    }
  }
}


export default  withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
)(Search))
