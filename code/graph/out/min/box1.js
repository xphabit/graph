var box;
(function(h){h.$e=function(g,b,a,c){a(ui.Pane,l.a).d.c(function(){return[null,{b:l.a}]});a(ui.Button,l.c).d.c(function(){return[c(l.a),{b:l.c,i:"unfold",c:!0}]});a(ui.Toolist,l.b).d.c(function(){return[c(l.a),l.d,{b:l.b}]});a(l).d.c(function(){return[new g(function(){return c("frame")})]})};var l=function(g){function b(a){var c=g.call(this)||this;c.f=a||"edge";return c}__extends(b,g);b.prototype.e=function(a){var c=this._;b.d.forEach(function(a){return a.w=a.v=a.a});c.g=a(b.b);a(b.c).t({c:function(){return c.f.x.toggleFormatPanel()}});c.g.t({c:c.$(c.i)});
return a(b.a).v};b.prototype.i=function(a,c){a=this._;var k=a.f.x,d=b.d.indexOf(c);console.log("boxEdgebar::onList - "+c.a+"  =  "+c.sd);c.sd||-1==d||d==a.h||(a.j(d,c),a.h=d,1>=d?k.showLayer(!1):5==d?k.showLayer(!0):2<=d&&5>d&&(k.format.switchPanel(d-2),k.showLayer(!1)))};b.prototype.j=function(a,c){var k=sys.Html;c=this.l(k);[].forEach.call(c,function(a){return k.k(1,a,["checked"])});b.d.forEach(function(a){return a.z=!1});b.d[a].z=!0;k.k(0,c[a],["checked"])};b.prototype.k=function(a,c){var k=sys.Html,
d=this._,f=b.d,g=d.l(k);[].forEach.call(g,function(a){return k.k(1,a,5!=d.h?["disabled","checked"]:["disabled"])});for(var e=0;e<f.length;e++)f[e].sd=!1,0<=a.indexOf(f[e].e)&&(k.k(0,g[e],["disabled"]),f[e].sd=!0),5!=d.h&&f[e].e==c&&(k.k(0,g[e],["checked"]),f[e].z=!0,d.h=e,c=-1)};b.prototype.l=function(a){return a.m("li."+ui.List.$1,this.g.v)};b.a="_xedge";b.c="_xekey";b.b="_xelist";b.d=[{e:0,z:!0,a:"digram"},{e:1,a:"string"},{e:2,b:"blank",sd:!0,a:"style"},{e:2,sd:!0,a:"text"},{e:2,sd:!0,a:"arrange"},
{e:3,b:"blank",a:"layer"}];return b}(sys.xObject);h.Edgebar=l;h.$t=function(g,b,a,c){a(ui.Pane,m.a).d.c(function(){return[null,{b:m.a}]});a(ui.Toolist,m.b).d.c(function(){return[c(m.a),m.c,{b:m.b}]});a(m).d.c(function(){return[new g(function(){return c("frame")})]})};var m=function(g){function b(a){var c=g.call(this)||this;c.d=a||"foot";c.i=[c.$(c.m),c.$(c.l)];return c}__extends(b,g);b.prototype.f=function(a){var c=this._,k=b.c[0];k.u=c.k(a);k.v=k.a;b.c[1].y=c.g.bind(c);c.e=a(b.b);return a(b.a).v};
b.prototype.g=function(a,c){alert("boxFootbar::onItem - "+c.a)};b.prototype.k=function(a){var c=this._;return function(){var b=c.d.x.editor.graph,d=new ui.Pane(null,{b:"_xtline",e:!0,f:a(ui.Modal)});c.j=new mxOutline(b,d.v);sys.Html.i(0,d.v,[0,6],c.i);return c.h=d}};b.prototype.l=function(a){var c=this._,b=c.d.x.editor.graph,d=c.j;console.log("boxFootbar::onHidden - "+d);a.detail.q()?(sys.Html.i(1,c.h.v,[0,6],c.i),d.suspended=!0,d.destroy()):(a=d.outline,d.suspended=!1,a.pageScale=b.pageScale,a.pageFormat=
b.pageFormat,a.background=b.background&&"none"!=b.background?b.background:b.defaultPageBackgroundColor,a.gridEnabled=!1,d.refresh())};b.prototype.m=function(a){this.d.x.actions.get(0>a.deltaY?"zoomIn":"zoomOut").funct()};b.a="_xtail";b.b="_xtlist";b.c=[{t:5,a:"outline"},{x:"XXX",a:"X"}];return b}(sys.xObject);h.Footbar=m;var n=function(g){function b(a,c){a=g.call(this,a,c)||this;a.$03=[a.$(a.$04)];return a}__extends(b,g);b.prototype.$5=function(){g.prototype.$5.call(this);var a=this._,c=a.x,b=a.$3("_xdtip");
new ui.Image(new ui.Pane(b,{b:"icon"}),{i:c.i});new ui.Text(b,{g:c.$01});a.$00=new ui.Textbox(a.$3(),{$0:c.$00,b:"_xdtext"});new ui.Button(a.$1,{c:a.$(a.$01),g:c.$2,b:"ok"})};b.prototype.$01=function(a){a=this._;var c=a.x,b=a.$00.v;c.c&&sys.$5(c.c,b.value);a.q(!0)};b.prototype.$02=function(a){var c=this._;c.$00.t({g:a});c.v&&sys.Html.i(0,c.v,[6],c.$03);g.prototype.$4.call(this)};b.prototype.$04=function(a){a.detail.q()||this.$00.v.focus()};b.prototype.r=function(a){var c=this._;a.i(1,c.y,[6],c.$03);
g.prototype.r.call(this,a)};return b}(ui.Dialog);h.Prompt=n;h.$d=function(g,b,a,c){var k={e:!0,g:b.b,$2:b.c,$3:b.a,f:c(ui.Modal),$00:"http://www.xphabit.com",$01:b.d,$0:185,$1:460};k.a=k.i="link";a(h.Prompt,"link").c(function(){return[null,k]})};h.$1=function(){var g=sys.Pod,b=g.y;b(ui.Modal).d;[h.$d,h.$e,h.$t,h.$f].forEach(function(a){return a.call(h,sys.Lazy,h.Lang,b,g.x)})};n=function(g){function b(){var a;(a=g.call(this)||this)||"format";return a}__extends(b,g);b.prototype.a=function(a,c,b){var d=
sys.Pod.x(ui.Modal);for(c=0;c<b.length;c++){var f=b[c],k=new ui.Pane(null,{b:"_xfband"});new ui.Text(k,{g:f.x});var e=f.y;f.d=k;switch(f.b){case 1:new ui.Toggle(k,{d:f.sd,$0:f.z,g:f.w,a:f.a,b:"right",c:e});break;case 3:new ui.DropColor(k,{c:e,b:"right",d:f.sd,a:f.a,$1:f.e,$2:2,$0:function(){return new ui.Color(null,{$3:a.i,f:d})}});break;case 2:new ui.Spinner(k,{$0:f.e,a:f.a,d:f.sd,b:"right"});break;case 4:new ui.Button(k,{b:"right",d:f.sd,c:e})}}};b.prototype.b=function(a){var c=ui.Pane,b=new c(null,
{b:"_xfpane"});new ui.Text(new c(b,{b:"_xfhead"}),{g:a});return b};b.prototype.c=function(a){var c=a.d,b=a.sd;if(c&&1<c.z.length)switch(a.b){case 1:c.z[1].t({$0:a.z,d:b});break;case 3:c.z[1].t({$1:a.e,d:b})}};return b}(sys.xObject);h.Format=n;n=function(g){function b(a,c,b){var d=g.call(this)||this;d.b=[{b:1,a:"connectionArrows"},{b:1,a:"connectionPoints"},{b:1,a:"guides"}];d.i=[{b:1,a:"grid"},{b:3,a:"gridColor"},{b:2,a:"gridSize"},{b:1,a:"pageView"},{b:1,a:"background"},{b:3,a:"backgroundColor"},
{b:4,a:"backgroundImage"}];d.a=a||"diagram";d.h=b;d.d=c;return d}__extends(b,g);b.prototype.c=function(){var a=this._,c=a.d.b(a.h.e),b=new ui.List(c,a.b,{b:"_xflist"}),d=a.a.x,f=d.editor.graph,g=f.isEnabled();f=[f.connectionArrowsEnabled,f.connectionHandler.isEnabled(),f.graphHandler.guidesEnabled];for(var e=[a.h.f,a.h.f,a.h.h],h=0;3>h;h++){var l=a.b[h];l.z=f[h];l.sd=!g;l.y=function(a,c){d.actions.get(a.x.a).funct()};l.x=e[h]}a.d.a(a.h,b,a.b);return c};b.prototype.e=function(){for(var a=this._,c=
a.a.x,b=["connectionArrowsChanged","connectionPointsChanged","guidesEnabledChanged"],d=function(e){c.addListener(b[e],function(){a.g(e)})},f=0;3>f;f++)d(f);var g="gridEnabledChanged gridColorChanged none pageViewChanged backgroundColorChanged backgroundColorChanged".split(" ");d=function(b){c.addListener(g[b],function(){a.k(b)})};for(f=0;5>f;f++)d(f)};b.prototype.f=function(){var a=this._;a.b.concat(a.i).forEach(function(a){delete a.d})};b.prototype.g=function(a){var c=this._,b=c.b[a],d=c.a.x.editor.graph,
f=[d.connectionArrowsEnabled,d.connectionHandler.isEnabled(),d.graphHandler.guidesEnabled];b.sd=!d.isEnabled();b.z=f[a];c.d.c(b)};b.prototype.j=function(){for(var a=this._,c=a.d.b("View"),b=new ui.List(c,a.i,{b:"_xflist"}),d=a.a.x,f=d.editor.graph,g=f.isEnabled(),e="Grid; > color; > size;PageView;Background; > Color; > Image".split(";"),h=0;h<a.i.length;h++)a.i[h].x=e[h];e=a.i[0];h=f.isGridEnabled();e.y=function(a,c){f.setGridEnabled(!f.isGridEnabled());d.fireEvent(new mxEventObject("gridEnabledChanged"))};
e.z=h;e=a.i[1];e.y=function(a,c){d.setGridColor(c)};e.e=f.view.gridColor;e.sd=!h;e=a.i[2];e.e=f.getGridSize();e.sd=!h;e=a.i[3];e.y=function(a,c){d.actions.get("pageView").funct()};e.z=f.pageVisible;e.sd=!g;e=a.i[4];e.y=function(c,b){a.l(d,f,b?"#ffffff":"none")};e.z="none"!=f.background;e.sd=!g;e=a.i[5];e.y=function(c,b){a.l(d,f,b)};e.sd=!g||"none"==f.background;e.e=f.background;e=a.i[6];e.y=function(a){d.showBackgroundImageDialog()};a.d.a(a.h,b,a.i);return c};b.prototype.k=function(a){var c=this._,
b=c.d,d=c.a.x.editor.graph,f=d.isEnabled(),g=d.isGridEnabled(),e=c.i[a];switch(a){case 0:e.z=g;b.c(e);c.k(1);c.k(2);break;case 1:e.e=d.view.gridColor;e.sd=!g;b.c(e);break;case 3:e.z=d.pageVisible;e.sd=!f;b.c(e);break;case 4:e.z="none"!=d.background;e.sd=!f;b.c(e);c.k(5);break;case 5:e.e=d.background,e.sd=!f||"none"==d.background,b.c(e)}};b.prototype.l=function(a,c,b){a=new ChangePageSetup(a,b);a.ignoreImage=!0;c.model.execute(a)};return b}(sys.xObject);h.Diagram=n;h.$f=function(g,b,a,c){a(h.Format).d;
a(h.Diagram).d.c(function(){return[new g(function(){return c("frame")}),c(h.Format),b]})}})(box||(box={}));
