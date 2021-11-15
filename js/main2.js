
/********************************************* */
src="https://unpkg.com/vue/dist/vue.js";

let estadisticas={
    cantDemocratas:0,
    cantRepublicanos:0,
    cantIndependientes:0,
    total:0,  
    votes_with_party_D:0.00,
    votes_with_party_R:0.00,
    votes_with_party_I:0.00,
    total_votes:0,
    };
let members="";

var url='https://api.propublica.org/congress/v1/113/senate/members.json';
var key='ppPkgmmqln2R0R35BP54DfFJwox9I0mnRMtOQ49g';
getData(url,key);


function getData(url,key){
  console.log(1);   
  fetch(url, {method:'GET', headers:{'X-API-KEY':key} 
              }).then(function(response){
                      if (response.ok){
                          return response.json()
                      }else{
                        throw new Error()
                      }
                      console.log("respuesta"+response);
              }).then(function(json){
                console.log(json);
                members=json.results[0].members;
                  
                CalculoEstadisticas();
                if(document.getElementById("tabla1")){
                  CargaTabla1();
                }
                cargoArray();  
              }).catch(function(error){
                  console.log(error);
              });
  
}   






function CalculoEstadisticas(){
  
  for(let i=0;i<members.length;i++){
    if(members[i].party=="D"    ){
      estadisticas.cantDemocratas++;
      estadisticas.votes_with_party_D+=members[i].votes_with_party_pct;
    }else if (members[i].party=="R"    ){
      estadisticas.cantRepublicanos++;
      estadisticas.votes_with_party_R+=members[i].votes_with_party_pct;
    }else if (members[i].party=="I"    ){
      estadisticas.cantIndependientes++;
      estadisticas.votes_with_party_I+=members[i].votes_with_party_pct;
    }   
  } 
  estadisticas.total=estadisticas.cantDemocratas+estadisticas.cantRepublicanos+estadisticas.cantIndependientes;
  estadisticas.total_votes= estadisticas.votes_with_party_D+estadisticas.votes_with_party_R+estadisticas.votes_with_party_I;
}
function CargaTabla1(){
  
    let cad=
    `<tr>
        <th>Party</th>  
        <th>No. of Reps</th>  
        <th>% Votes w/Party</th>
    </tr>`;
    cad+=  `
    <tr>
      <td> Democratas </td>
      <td>`+estadisticas.cantDemocratas+`</td>
      <td>`+ Math.round(estadisticas.votes_with_party_D/estadisticas.cantDemocratas*100 )/100+`</td>
    </tr>
    <tr>
      <td> Republicanos </td>
      <td>`+estadisticas.cantRepublicanos+`</td>
      <td>`+ Math.round(estadisticas.votes_with_party_R/estadisticas.cantRepublicanos*100 )/100 +`</td>
    </tr>
    <tr>
      <td> Independientes </td>
      <td>`+estadisticas.cantIndependientes+`</td>
      <td>`+Math.round((estadisticas.cantIndependientes!=0?estadisticas.votes_with_party_I/estadisticas.cantIndependientes:0) *100 )/100+`</td>
    </tr>
    <tr>
        <td>Total</td>
        <td>`+(estadisticas.cantDemocratas+estadisticas.cantRepublicanos+estadisticas.cantIndependientes)+`</td>
        <td>`+Math.round((estadisticas.votes_with_party_D+estadisticas.votes_with_party_R+estadisticas.votes_with_party_I)/(estadisticas.cantDemocratas+estadisticas.cantRepublicanos+estadisticas.cantIndependientes )*100 )/100+`</td>
    </tr>
    `;
    document.getElementById("tabla1").innerHTML = cad;

  }
  
function cargoArray(){
  if(document.getElementById("tabla2")){
    let aux = members.sort((a,b) => b.missed_votes_pct - a.missed_votes_pct); // orden descendente
    let result=[];
    let porcentaje= aux[ parseInt(aux.length*10/100)].missed_votes_pct;
    let i=0;
    while (aux[i].missed_votes_pct >= porcentaje){
        result[result.length]={ name:aux[i].first_name+", "+ aux[i].last_name, 
        url:aux[i].url,
        col1:aux[i].missed_votes, 
        col2: aux[i].missed_votes_pct};
        i++;
    }
    document.getElementById("tabla2").innerHTML = titulosAttendance()+ CargaTabla(result);
  }
  if(document.getElementById("tabla3")){
    aux = members.sort((a,b) => a.missed_votes_pct - b.missed_votes_pct); // orden Ascendente
    result=[];
    porcentaje= aux[ parseInt(aux.length*10/100)].missed_votes_pct;
    i=0;
    while (aux[i].missed_votes_pct <= porcentaje){
        result[result.length]={ name:aux[i].first_name+", "+ aux[i].last_name, 
        url:aux[i].url,
        col1:aux[i].missed_votes, 
        col2: aux[i].missed_votes_pct};
        i++;
    } ;
    document.getElementById("tabla3").innerHTML = titulosAttendance() + CargaTabla(result);
  }
  if(document.getElementById("tabla4")){
    aux = members.sort((a,b) => a.votes_with_party_pct   - b.votes_with_party_pct ); // orden Ascendente
    result=[];
    porcentaje= aux[ parseInt(aux.length*10/100)].votes_with_party_pct ;
    i=0;
    while (aux[i].votes_with_party_pct <= porcentaje){
        result[result.length]={ name:aux[i].first_name+", "+ aux[i].last_name, 
        url:aux[i].url,
        col1:  parseInt(aux[i].total_votes *aux[i].votes_with_party_pct/100), 
        col2: aux[i].votes_with_party_pct};
        i++;
    }  ;
    document.getElementById("tabla4").innerHTML = titulosLoyalty() + CargaTabla(result);
  }
  if(document.getElementById("tabla5")){
    aux = members.sort((a,b) => b.votes_with_party_pct   - a.votes_with_party_pct ); // orden descendente
    result=[];
    porcentaje= aux[ parseInt(aux.length*10/100)].votes_with_party_pct ;
    i=0;
    while (aux[i].votes_with_party_pct >= porcentaje){
        result[result.length]={ name:aux[i].first_name+", "+ aux[i].last_name, 
        url:aux[i].url,
        col1:parseInt(aux[i].total_votes *aux[i].votes_with_party_pct/100), 
        col2: aux[i].votes_with_party_pct};
        i++;
    }  ;
    document.getElementById("tabla5").innerHTML = titulosLoyalty() + CargaTabla(result);
  }
  
}
  function titulosAttendance(){
    return  `<tr> <th>Name</th>
              <th>No. Missed Votes</th>
              <th>% Missed</th>
            </tr>`
  }

  function titulosLoyalty(){
    return `<tr> <th>Name</th> 
              <th>No. Party Votes</th> 
              <th>% Party Votes</th> 
            </tr>`
  }

function CargaTabla(array){
  let cad="";
  for(let i=0; i<array.length;i++){
    cad+=  `
    <tr>
        <td><a href=`+array[i].url+`>`+ array[i].name +`</a></td>
        <td>`+ array[i].col1+`</td>
        <td>`+ array[i].col2+`</td>
    </tr>
    `;
  }
  return cad;  
}

//*************************** nuevo ************************************ */
const app = new Vue({
   
  el: '#app',

  data: {
      members:[],
      parties:""
    },

  methods: {
  toggleMostrar: function () {
      this.mostrar = !this.mostrar
      }
  }

  })