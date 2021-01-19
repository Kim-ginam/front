import React , {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'components/search/SearchStyle';
import Paper from '@material-ui/core/Paper';
import { IconButton ,InputBase ,Grid,Chip,Box } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux'
import {addJaryo,delJaryo} from 'store/actions/index' 




function SimpleTable(props) {
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
  console.log(props)
  return (
    <div>
    <Paper> 
      <Grid container justify="center"  alignItems="center">
        <Grid item  xs = {10} sm ={10} md ={10} >
          <InputBase 
            value={jaryoinput}
            onChange={handleChange}
            fullWidth = {true}
            className={classes.input}
            placeholder="냉장고 재료를 추가하세요."
          />
        </Grid>
        <Grid item  xs = {2} sm ={2} md ={2}>
         <IconButton type="submit" className={classes.iconButton} aria-label="search">
          <AddIcon onClick ={handleClick}/>
         </IconButton>
        </Grid>
      </Grid>
     </Paper>
      {/* <Box className={classes.root}>
      {props.jaryo.map((row) => (
       <Chip
        spacing={2}
        label={row.name}
        onDelete={()=>{handleDelete(row.name)}}
        color='default'
      />
          ))}
      </Box> */}
    </div>
  );
}


const mapStateToProps  = state => {
  return{
    jaryo : state.jaryo // store 의 mode 를 props로 사용함
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimpleTable)