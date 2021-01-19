import axios from 'axios'

// ajax 관련 요청 함수들은 여기다가 모듈화 


export function join(id,name,email,pw) {
  return   axios.post('http://127.0.0.1:8000/rest-auth/registration/', { 
            headers: { // 요청 헤더
                        'Content-type': 'application/json'
                     },
                     
                     username: name,
                     email: email,
                     password1: pw,
                     password2: pw
                  
                    }).then(res=>res);
}

export function login(name,email,pw) {
  return   axios.post('http://127.0.0.1:8000/rest-auth/login/', { 
            headers: { // 요청 헤더
                     'Content-type': 'application/json'
                     },

              
                      username: name,
                      email: email,
                      password: pw
                    
                     
                    }).then(res=>res.data)
                    
                    .then(res=>{
                      const userinfo = {
                        token:res.token,
                        user:res.user
                      }
                      return userinfo
                    });
}

export function recipeRate(name, recipe_name, rate){
  return axios.post('',{
    headers : {
      'Content-type' : 'application/json'
    },

    name : name,
    recipe_name : recipe_name,
    rate : rate
  }).then(res => res.data)
}

export function getRecip() {
  return   axios.get('http://127.0.0.1:8000/recipe/getFive/').then(res=>res.data);
}

export function getRecip2(tags,jaryo) {
  return   axios.post('http://127.0.0.1:8000/recipe/algo/',{
    headers: { // 요청 헤더
      'Content-type': 'application/json'
      },
    "tag" : tags,
    "ingredients":jaryo
 }).then(res=>res.data);
}

//recipe/regScore(recipe_number, score)
export function registerScore(recipe_number, score){
  return axios.post('http://127.0.0.1:8000/recipe/regScore/',{
    headers : {
      'Content-type' : 'application/json'
    },
    "recipe" : recipe_number,
    "score" : score
  }).then(res=>res.data)
}

export function getMap(food, area){
  return axios.post('http://127.0.0.1:8000/recipe/map/', {
    headers : {
      'Content-type' : 'application/json'
    },
    "food" : food,
    "area" : area
  }).then(res=>res.data)
}


export function requestComparison(id1, id2){
  return axios.post('http://127.0.0.1:8000/recipe/compare/',{
    headers : {
      'Content-type' : 'application/json'
    },
    'id1' : id1,
    'id2' : id2,
  }).then(res=>res.data).catch(error => {console.log(error.respose)})
}
