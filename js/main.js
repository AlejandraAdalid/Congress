const app=new Vue({
    el:'#app',
    data:{ // va lo que quiero ver de mi pagina web
        //mensajeh3: "Congressmen",
        mensajetextInfo: " Lorem psum dolor sit amet, consectetur adipiscing elit. Integer aliquet semper dapibus. Vestibulum faucibus, ipsum eu laoreet facilisis, ante orci iaculis lectus, a hendrerit nisi diam nec ante. In risus mi, blandit ut viverra semper, auctor eu nulla. Duis aliquet, massa nec fringilla rhoncus, metus lectus tincidunt lacus, vitae scelerisque felis nulla quis ipsum. Nullam auctor a ex at tempor. Curabitur ut ultrices nisi, et placerat sem. Sed neque sem, ornare et turpis varius, blandit elementum ante. Fusce eros nisi, tincidunt et dui sit amet, ullamcorper faucibus dolor. Phasellus erat orci, ultrices non lacus in, posuere mattis erat. Ut magna erat, luctus consectetur tempus sed, interdum rutrum leo. Vivamus lacinia, lorem ac dictum posuere, nulla est tincidunt lectus, sed rutrum risus sapien vel dolor. Integer ac arcu arcu. Nam lobortis hendrerit urna, vitae posuere elit aliquam vitae. Sed tempus felis arcu, vel ultrices erat efficitur sit amet. Nulla ut massa eros. Ut eget sem a dolor fringilla feugiat et sit amet tellus.",
        members:[],
        parties: ["R","D","I"],
        states:"all",
        imagen:"images/Capitol_at_Dusk_2.jpg",
        mail:"mailto:info@tgif.net?Subject=Hello%20again",
        footerP: "@2016 TGIF || All right reserved"     
    },
    computed:{
        filterMembers(){
            let aux=this.members.filter(e => app.parties.includes(e.party) && (app.states == e.state || app.states == "all") ? e : null)
            console.log(aux);
            return aux;
        },
        statesArray(){
            let aux = []
            this.members.forEach(e => !aux.includes(e.state) ? aux.push(e.state) : null)
            console.log(aux);    
            return aux.sort()
        }   
    }  
})



function getData(url,key){
    fetch(url,{
      method: 'GET',
      headers: {
          'X-API-Key': key
      }
    }).then(function(response){
      if(response.ok){
          return response.json()
      }else{
          throw new Error()
      }
    }).then(function(json){
      app.members = json.results[0].members
    //  console.log(app.members )
    }).catch(function(error){
      console.log(error)
    })
}

let url ="https://api.propublica.org/congress/v1/113/"+ (document.getElementById("senate") ? "senate":"house") + "/members.json"
getData(url,"1pS4P2QU0p0J3PlmSeM9PmZeMG4tj1Z5DdQKktG4")
      

$(function() {
  $('#readMore').click(function() { 
   $(this).text(function(i,def) {
      return def=='Read More' ?  'Show Less' : 'Read More';
   });
  })
});