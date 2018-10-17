import nprogress from "nprogress";
import $m from "../com/util";
import React from "react";

console.log("lunch.js start");

const PAGEROWS = 10;

export let app = {
  view : {},          // 전역에서 관리될 필요가 있는 리액트 뷰들
};





app.state = {
    data: []
}


async function getData() {
    let response = await fetch(
        "/data.do",
        {
            method: "POST",
        }
    );
    let res = await response.json();
    
    app.state.data = res;

    return res;
}

if(app.state.length === 0){
    getData();
}




app.bodyScroll = function () {
  
  // 목록화면이 아니면 리턴  
  if(app.thispage !== "List") return;

  // 현재 목록화면 scrollTop 의 값
  const scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  

  // 현재 스크롤 값을 전역변수에 저장
  app.scrollTop = scrollTop;

  if(app.isScrollLast) return;
  // 아직 모든 글이 로드된 상태가 아니라면 스크롤이 아래까지 내려왔을 때 다음 글 10개 로드

  //현재문서의 높이
  const scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
  //현재 화면 높이 값
  const clientHeight = document.documentElement.clientHeight;

  console.log("scrollTop : " + scrollTop)
  console.log("clientHeight : " + clientHeight)
  console.log("scrollHeight : " + scrollHeight)


  if (
    (scrollTop + clientHeight == scrollHeight)    // 일반적인 경우(데스크탑: 크롬/파폭, 아이폰: 사파리)
    ||
    (app.isMobileChrome() && (scrollTop + clientHeight == scrollHeight - 56))   // 모바일 크롬(55는 위에 statusbar 의 높이 때문인건가)
  ){ //스크롤이 마지막일때
  
  /*
  * 18.09.19 min9nim
  * 아래와 같이 분기 처리하면 데스크탑 크롬에서 스크롤이 마지막에 닿고나서 요청이 여러번 한꺼번에 올라가는 문제 발생
  * //if ((scrollTop + clientHeight) >= scrollHeight-55) { 
  */

    nprogress.start();
    $m("#nprogress .spinner").css("top", "95%");
    app.api.getPosts({
        //idx: app.view.App.state.data.posts.length,
        idx: app.store.getState().data.posts.filter(p => p.origin === undefined).length,
        cnt: PAGEROWS,
        search: app.store.getState().view.search,
        hideProgress: true,
        context: app.context
      })
      .then(res => {
        app.store.dispatch(app.action.scrollEnd(res.posts));
        if(res.posts.length < PAGEROWS){
          console.log("Scroll has touched bottom")
          app.isScrollLast = true;
          return;
        }
      })
  }
};


app.checkStatus = function(res){
  if(res.status === "Success"){
    return res;
  }else{
    // 정상적인 경우가 아니라 간주하고 예외 발생시킴
    app.alert({
      message: res.message, 
      style: "danger",
      width: "200px"
    });
    return new Promise(function(resolve, reject){
      reject(new Error(res.message));
    })
  }
}



app.setCookie = function (cname, cvalue, exdays=1000) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


app.getCookie = function (cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}


app.isDesktop = function(){
  const os = ["win16", "win32", "win64", "mac", "macintel"];
  return os.includes(navigator.platform.toLowerCase());
}

app.isMobileChrome = function(){
  return !app.isDesktop() && navigator.userAgent.includes("Chrome");
}


app.highlight = function(txt, word){
  if(word){
      var reg = new RegExp("(" + word + ")", "gi");
      txt = txt.replace(reg, '<span style="background-color:yellow;">$1</span>');
  }
  return txt;
}


//Ref) https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
app.asyncComponent = function(getComponent, compname) {
  return class AsyncComponent extends React.Component {
    //static Component = null;
    constructor(props){
      super(props);
      this.state = { Component: app.asyncCache[compname] };
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then(m => {
          //console.log("@@@@@ 동적로딩이요~");
          //AsyncComponent.Component = m.default;
          app.asyncCache[compname] = m.default;
          this.setState({ Component : m.default })
        })
      }else{
        console.log(`## app.asyncCache[${compname}] used`);
      }
    }
    render() {
      const { Component } = this.state
      if (Component) {
        return <Component {...this.props} />
      }
      return <div><i className="icon-spin3 animate-spin"></i> Loading.. [{compname}]</div>
    }
  }
}

app.alert = function({message, style, width, onClose}){
  if(typeof arguments[0] === "string"){
    app.view.AlertDismissable.handleShow({message: arguments[0]});  
  }else{
    app.view.AlertDismissable.handleShow({
      message,
      style,
      width,
      onClose
    });
  }
}


app.confirm = function({message, style, width, onYes, onNo}){
  app.view.Confirm.handleShow({
    message,
    style,
    width,
    onYes,
    onNo
  })
}


app.init = function(){
  app.user = app.getUser();
}


app.init();
window.app = app;   // 개발 중 디버깅을 위해 전역공간으로 노출