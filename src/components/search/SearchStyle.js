import {  makeStyles  } from '@material-ui/core'

        const styles = makeStyles((theme) => ({
            root:{
            paddingTop:70
            }, 
            
            root2: {
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                '& > *': {
                  margin: theme.spacing(0.5),
                },
              },
            input: {
            marginLeft: theme.spacing(1),
            flex: 1,
            alignContent : 'center'
            },
            img :{
            width: '60%',  
            height: '60%'
            },
            img2 :{
            width: '50%',
            height: '30%'
            }
        }))
  
export default styles