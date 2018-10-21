import nprogress from "nprogress";
import $m from "./util";
import React from "react";

console.log("app.js start");

const PAGEROWS = 10;

let app = {
  view : {},          // 전역에서 관리될 필요가 있는 리액트 뷰들
  state : {
    data : [],
    view: {
      selected: ""
    }
  },
};

export default app;


const initData = async () => {
    let response = await fetch(
        //"/data.json",
        "/api/list",
        {
            method: "GET",
        }
    );
    try{
      let res = await response.json();
      app.state.data = res.lunchs;
    }catch{
      app.state.data = [];
    }

    // 상태변화에 따른 UI변화 코딩은 mobX로 제거 가능
    app.view.List && app.view.List.setState({data : app.state.data});
}



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
      while (c.charAt(0) === ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
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
  if(app.state.data.length === 0){
    initData();
  }
}


app.init();
window.app = app;   // 개발 중 디버깅을 위해 전역공간으로 노출