"use strict";(self.webpackChunkescooter=self.webpackChunkescooter||[]).push([[860],{9860:(D,s,n)=>{n.r(s),n.d(s,{DeeplinkModule:()=>h});var r=n(9808),l=n(428),a=n(9621),u=n(5e3),d=n(870),p=n(7423);const c=function(){return["/"]},m=[{path:":brand",component:(()=>{class e{constructor(t,i){this.deviceDetectorService=t,this.route=i}ngOnInit(){var t;this.brand=this.route.snapshot.paramMap.get("brand"),this.platform=(null===(t=this.deviceDetectorService.getDeviceInfo())||void 0===t?void 0:t.os)||"desktop",this.deeplinks=a.B[this.brand],"iOS"==this.platform?(window.location.replace(this.deeplinks.ios),setTimeout(()=>{window.location.replace(this.deeplinks.appstore)},1e4)):"Android"==this.platform&&(window.location.replace(this.deeplinks.android),setTimeout(()=>{window.location.replace(this.deeplinks.playmarket)},1e4))}}return e.\u0275fac=function(t){return new(t||e)(u.Y36(d.x0),u.Y36(l.gz))},e.\u0275cmp=u.Xpm({type:e,selectors:[["app-deeplink"]],decls:15,vars:7,consts:[[1,"content"],[3,"href"],["width","107","height","37","src","/assets/app-store.svg","alt","AppStore","loading","lazy"],["width","107","height","37","src","/assets/google-play.svg","alt","Google Play","loading","lazy"],["mat-stroked-button","","color","primary",3,"routerLink"]],template:function(t,i){1&t&&(u.TgZ(0,"div",0)(1,"h1"),u._uU(2),u.ALo(3,"uppercase"),u.qZA(),u.TgZ(4,"p"),u._uU(5," \u042f\u043a\u0449\u043e \u0432\u0438 \u043d\u0435 \u0431\u0443\u043b\u0438 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0447\u043d\u043e \u043f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0456 \u0434\u043e\u0434\u0430\u0442\u043a\u0443 \u043e\u0440\u0435\u043d\u0434\u0438 \u0441\u0430\u043c\u043e\u043a\u0430\u0442\u0456\u0432, \u0439\u043c\u043e\u0432\u0456\u0440\u043d\u043e, \u043d\u0435\u043e\u0431\u0445\u0456\u0434\u043d\u043e \u0432\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0438 \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u043d\u0438\u0439 \u0434\u043e\u0434\u0430\u0442\u043e\u043a: "),u.qZA(),u.TgZ(6,"ul")(7,"li")(8,"a",1),u._UZ(9,"img",2),u.qZA()(),u.TgZ(10,"li")(11,"a",1),u._UZ(12,"img",3),u.qZA()()(),u.TgZ(13,"button",4),u._uU(14," \u041f\u043e\u0432\u0435\u0440\u043d\u0443\u0442\u0438\u0441\u044c \u0434\u043e \u043a\u0430\u0440\u0442\u0438 "),u.qZA()()),2&t&&(u.xp6(2),u.Oqu(u.lcZ(3,4,i.brand)),u.xp6(6),u.s9C("href",i.deeplinks.appstore,u.LSH),u.xp6(3),u.s9C("href",i.deeplinks.playmarket,u.LSH),u.xp6(2),u.Q6J("routerLink",u.DdM(6,c)))},dependencies:[l.rH,p.lW,r.gd],styles:[".content[_ngcontent-%COMP%]{padding:1.5rem;max-width:40rem}ul[_ngcontent-%COMP%], li[_ngcontent-%COMP%]{list-style:none;padding:0;margin:0}ul[_ngcontent-%COMP%]{display:flex;gap:1rem;margin-bottom:2rem}"]}),e})(),pathMatch:"full"},{path:"**",redirectTo:"/notfound"}];let g=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[l.Bz.forChild(m),l.Bz]}),e})(),h=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=u.oAB({type:e}),e.\u0275inj=u.cJS({imports:[r.ez,g,p.ot]}),e})()}}]);