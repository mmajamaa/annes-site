function _defineProperty(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _toConsumableArray(e){return _arrayWithoutHoles(e)||_iterableToArray(e)||_unsupportedIterableToArray(e)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function _iterableToArray(e){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}function _arrayWithoutHoles(e){if(Array.isArray(e))return _arrayLikeToArray(e)}function _createForOfIteratorHelper(e,t){var n;if("undefined"==typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(n=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var a=0,r=function(){};return{s:r,n:function(){return a>=e.length?{done:!0}:{done:!1,value:e[a++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,c=!1;return{s:function(){n=e[Symbol.iterator]()},n:function(){var e=n.next();return i=e.done,e},e:function(e){c=!0,o=e},f:function(){try{i||null==n.return||n.return()}finally{if(c)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,a=new Array(t);n<t;n++)a[n]=e[n];return a}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&_setPrototypeOf(e,t)}function _setPrototypeOf(e,t){return(_setPrototypeOf=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function _createSuper(e){var t=_isNativeReflectConstruct();return function(){var n,a=_getPrototypeOf(e);if(t){var r=_getPrototypeOf(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return _possibleConstructorReturn(this,n)}}function _possibleConstructorReturn(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?_assertThisInitialized(e):t}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"2ddU":function(e,t,n){"use strict";n.r(t);var a,r,o,i,c,l=n("ofXK"),s=n("tyNb"),u=n("3Pt+"),d=n("fXoL"),m=function(){var e={Up:1,Down:3,Right:6,Left:8,UpMirrored:2,DownMirrored:4,LeftMirrored:5,RightMirrored:7,NotJpeg:-1,NotDefined:-2};return e[e.Up]="Up",e[e.Down]="Down",e[e.Right]="Right",e[e.Left]="Left",e[e.UpMirrored]="UpMirrored",e[e.DownMirrored]="DownMirrored",e[e.LeftMirrored]="LeftMirrored",e[e.RightMirrored]="RightMirrored",e[e.NotJpeg]="NotJpeg",e[e.NotDefined]="NotDefined",e}(),f=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"getOrientation",value:function(e,t){var n=new FileReader;try{n.onload=function(e){var a=new DataView(n.result);if(65496!==a.getUint16(0,!1))return t(-2);for(var r=a.byteLength,o=2;o<r;){var i=a.getUint16(o,!1);if(o+=2,65505===i){if(1165519206!==a.getUint32(o+=2,!1))return t(-1);var c=18761===a.getUint16(o+=6,!1);o+=a.getUint32(o+4,c);var l=a.getUint16(o,c);o+=2;for(var s=0;s<l;s++)if(274===a.getUint16(o+12*s,c))return t(a.getUint16(o+12*s+8,c))}else{if(65280!=(65280&i))break;o+=a.getUint16(o,!1)}}return t(-1)},n.readAsArrayBuffer(e)}catch(a){return t(0)}}},{key:"uploadFile",value:function(t){return new Promise((function(n,a){var r=t.createElement("input");t.setStyle(r,"display","none"),t.setProperty(r,"type","file"),t.setProperty(r,"accept","image/*"),t.listen(r,"click",(function(e){e.target.value=null})),t.listen(r,"change",(function(t){var r=t.target.files[0],o=new FileReader;o.onloadend=function(t){try{e.getOrientation(r,(function(e){n({image:o.result,orientation:e})}))}catch(t){a(t)}};try{o.readAsDataURL(r)}catch(i){console.warn("ngx-image-compress - probably no file have been selected: ".concat(i)),a("No file selected")}})),r.click()}))}},{key:"compress",value:function(e,t,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:50,r=arguments.length>4&&void 0!==arguments[4]?arguments[4]:50;return new Promise((function(o,i){r/=100,a/=100;var c=new Image;c.onload=function(){var i,l,s=n.createElement("canvas"),u=s.getContext("2d");if(i=c.naturalWidth,l=c.naturalHeight,t===m.Right||t===m.Left){var d=i;i=l,l=d}s.width=i*a,s.height=l*a;var f=Math.PI/180;t===m.Up?u.drawImage(c,0,0,s.width,s.height):t===m.Right?(u.save(),u.rotate(90*f),u.translate(0,-s.width),u.drawImage(c,0,0,s.height,s.width),u.restore()):t===m.Left?(u.save(),u.rotate(-90*f),u.translate(-s.width,0),u.drawImage(c,0,0,s.height,s.width),u.restore()):t===m.Down?(u.save(),u.rotate(180*f),u.translate(-s.width,-s.height),u.drawImage(c,0,0,s.width,s.height),u.restore()):u.drawImage(c,0,0,s.width,s.height);var p=e.substr(5,e.split(";")[0].length-5),b=s.toDataURL(p,r);o(b)},c.src=e}))}},{key:"byteCount",value:function(e){return encodeURI(e).split(/%..|./).length-1}}]),e}(),p=((a=function(){function e(t){_classCallCheck(this,e),this.DOC_ORIENTATION=m,this.render=t.createRenderer(null,null)}return _createClass(e,[{key:"byteCount",value:function(e){return f.byteCount(e)}},{key:"uploadFile",value:function(){return f.uploadFile(this.render)}},{key:"compressFile",value:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:50,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:50;return f.compress(e,t,this.render,n,a)}}]),e}()).\u0275fac=function(e){return new(e||a)(d.Zb(d.G))},a.\u0275prov=d.Lb({token:a,factory:a.\u0275fac}),a),b=n("0IaG"),g=n("AytR"),h=n("1G5W"),y=n("0MNC"),v=((r=function(){function e(t,n){_classCallCheck(this,e),this.dialogRef=t,this.breakpointObserver=n}return _createClass(e,[{key:"onNoClick",value:function(){this.dialogRef.close()}},{key:"ngOnInit",value:function(){var e=this;this.breakpointObserver.observe(["(min-width: 600px)"]).subscribe((function(t){e.dialogRef.updateSize(t.matches?"50%":"80%")}))}}]),e}()).\u0275fac=function(e){return new(e||r)(d.Pb(b.h),d.Pb(y.a))},r.\u0275cmp=d.Jb({type:r,selectors:[["app-image-dialog"]],decls:1,vars:1,consts:[[3,"galleryId"]],template:function(e,t){1&e&&d.Qb(0,"app-upload-component",0),2&e&&d.mc("galleryId",t.galleryId)},styles:[""]}),r),x=n("y+nO"),w=((o=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"openImage",value:function(e){var t=document.getElementById("myModal"),n=document.getElementById("img01"),a=document.getElementById("caption");t.style.display="block",n.src=e.src,a.innerHTML=e.alt}},{key:"closeModal",value:function(){document.getElementById("myModal").style.display="none"}}]),e}()).\u0275fac=function(e){return new(e||o)},o.\u0275cmp=d.Jb({type:o,selectors:[["app-image-modal"]],decls:5,vars:0,consts:[["id","myModal",1,"modal"],[1,"close",3,"click"],["id","img01",1,"modal-content"],["id","caption"]],template:function(e,t){1&e&&(d.Vb(0,"div",0),d.Vb(1,"span",1),d.dc("click",(function(){return t.closeModal()})),d.Dc(2,"\xd7"),d.Ub(),d.Qb(3,"img",2),d.Qb(4,"div",3),d.Ub())},styles:[".modal[_ngcontent-%COMP%]{display:none;position:fixed;z-index:1;padding-top:100px;left:0;top:0;width:100%;overflow:auto;background-color:#000}.modal-content[_ngcontent-%COMP%]{position:relative;background-color:#fefefe;margin:auto;padding:0;height:80vh;max-width:1200px;width:auto}.close[_ngcontent-%COMP%]{color:#fff;position:absolute;top:10px;right:25px;font-size:35px;font-weight:700}.close[_ngcontent-%COMP%]:focus, .close[_ngcontent-%COMP%]:hover{color:#999;text-decoration:none;cursor:pointer}"]}),o),_=n("bGI5"),C=n("jhN1"),k=n("XiUz"),O=n("bTqV"),M=((i=function(){function e(t){_classCallCheck(this,e),this.facade=t}return _createClass(e,[{key:"logout",value:function(){this.facade.logoutRequested()}},{key:"onPublishChanges",value:function(){this.facade.subGalleriesPublishRequested()}}]),e}()).\u0275fac=function(e){return new(e||i)(d.Pb(_.a))},i.\u0275cmp=d.Jb({type:i,selectors:[["app-user-bar"]],decls:6,vars:0,consts:[["fxLayout","row",1,"user-bar-container"],["mat-button","",1,"ok-button",3,"click"],["fxFlex",""],["mat-button","",1,"warn-button",3,"click"]],template:function(e,t){1&e&&(d.Vb(0,"div",0),d.Vb(1,"button",1),d.dc("click",(function(){return t.onPublishChanges()})),d.Dc(2," Julkaise muutokset "),d.Ub(),d.Qb(3,"span",2),d.Vb(4,"button",3),d.dc("click",(function(){return t.logout()})),d.Dc(5," Kirjaudu ulos "),d.Ub(),d.Ub())},directives:[k.f,O.b,k.b],styles:[".user-bar-container[_ngcontent-%COMP%]{background-color:grey;padding:8px}"]}),i),I=n("5+WD"),P=["newSubGalleryForm"],U=((c=function(e){_inherits(n,e);var t=_createSuper(n);function n(e){var a;return _classCallCheck(this,n),(a=t.call(this)).facade=e,a.flagIcons=[{src:"./assets/fi.png",alt:"fi"},{src:"./assets/uk.png",alt:"uk"}],a}return _createClass(n,[{key:"ngOnInit",value:function(){var e=this;this.facade.getIsSubGalleryCreated().pipe(Object(h.a)(this.ngUnsubscribe)).subscribe((function(t){t&&e.newSubGalleryForm.reset()}))}},{key:"onAddSubGallery",value:function(e){confirm("Haluatko varmasti luoda gallerian nimelt\xe4 '".concat(e.value.galleryFi,"'?"))&&this.facade.createSubGalleryRequested(e.value.galleryFi,e.value.galleryEn)}}]),n}(x.a)).\u0275fac=function(e){return new(e||c)(d.Pb(_.a))},c.\u0275cmp=d.Jb({type:c,selectors:[["app-new-sub-gallery-form"]],viewQuery:function(e,t){var n;1&e&&d.Hc(P,!0),2&e&&d.sc(n=d.ec())&&(t.newSubGalleryForm=n.first)},features:[d.zb],decls:12,vars:3,consts:[["fxLayout","column","fxLayoutAlign","start center",1,"new-sub-gallery-main-container"],["fxLayout","row","fxLayoutAlign","center center",1,"new-sub-gallery-container"],["fxFlex","nogrow","fxLayout","column","fxLayoutAlign","none center","ngNativeValidate",""],["newSubGalleryForm","ngForm"],["fxFlex","nogrow","fxLayout","row","fxLayoutAlign","none center"],["fxFlex","nogrow","alt","flagIcons[0].src",1,"flag-icon",3,"src"],["type","text","name","galleryFi","placeholder","Uuden gallerian nimi","ngModel","","required","",1,"card-input"],["fxFlex","nogrow","alt","flagIcons[1].src",1,"flag-icon",3,"src"],["type","text","name","galleryEn","placeholder","Uuden gallerian nimi","ngModel","","required","",1,"card-input"],["fxFlex","nogrow",3,"disabled","click"]],template:function(e,t){if(1&e){var n=d.Wb();d.Vb(0,"div",0),d.Vb(1,"div",1),d.Vb(2,"form",2,3),d.Vb(4,"span",4),d.Qb(5,"img",5),d.Qb(6,"input",6),d.Ub(),d.Vb(7,"span",4),d.Qb(8,"img",7),d.Qb(9,"input",8),d.Ub(),d.Ub(),d.Vb(10,"button",9),d.dc("click",(function(){d.vc(n);var e=d.tc(3);return t.onAddSubGallery(e)})),d.Dc(11," + "),d.Ub(),d.Ub(),d.Ub()}if(2&e){var a=d.tc(3);d.Cb(5),d.mc("src",t.flagIcons[0].src,d.wc),d.Cb(3),d.mc("src",t.flagIcons[1].src,d.wc),d.Cb(2),d.mc("disabled",!a.valid)}},directives:[k.f,k.e,u.m,u.n,k.b,u.c,u.l,u.o,u.v],styles:[".new-sub-gallery-container[_ngcontent-%COMP%]{background-color:#faebd7;margin:16px;border-radius:8px;width:250px}@media screen and (max-width:600px){.new-sub-gallery-container[_ngcontent-%COMP%]{width:70vw;scroll-snap-align:center}}.card-input[_ngcontent-%COMP%]{width:calc(100% - 30px);margin:8px;border:none;background-color:inherit;font-weight:bolder;height:20px}.card-input[_ngcontent-%COMP%]:hover{cursor:pointer}.flag-icon[_ngcontent-%COMP%]{height:10px;width:auto;margin:8px 0}"]}),c),F=n("Wp6s"),L=["subGalleryForm"];function G(e,t){if(1&e){var n=d.Wb();d.Vb(0,"mat-card",22),d.Vb(1,"mat-card-content"),d.Vb(2,"div",23),d.Vb(3,"div",8),d.Vb(4,"span",9),d.dc("click",(function(){d.vc(n);var e=t.$implicit,a=d.hc().$implicit;return d.hc().deleteImage(e._id,a._id)})),d.Qb(5,"i",10),d.Ub(),d.Qb(6,"span",11),d.Vb(7,"span",12),d.Qb(8,"i",13),d.Ub(),d.Ub(),d.Vb(9,"img",24),d.dc("click",(function(e){return d.vc(n),d.hc(2).openImage(e.target)})),d.Ub(),d.Vb(10,"span",14),d.Qb(11,"img",25),d.Vb(12,"input",26),d.dc("focusout",(function(){d.vc(n);var e=t.$implicit,a=d.hc().$implicit;return d.hc().onFocusOutImg(a._id,"alt_fi",e._id)})),d.Ub(),d.Ub(),d.Vb(13,"span",14),d.Qb(14,"img",27),d.Vb(15,"input",26),d.dc("focusout",(function(){d.vc(n);var e=t.$implicit,a=d.hc().$implicit;return d.hc().onFocusOutImg(a._id,"alt_en",e._id)})),d.Ub(),d.Ub(),d.Ub(),d.Ub(),d.Ub()}if(2&e){var a=t.$implicit,r=d.hc().$implicit,o=d.hc();d.Cb(9),d.nc("alt",a.alt_fi),d.mc("src",o.domSanitizer.bypassSecurityTrustUrl(a.url),d.wc),d.Cb(2),d.mc("src",o.flagIcons[0].src,d.wc),d.Cb(1),d.nc("name","subGalleryId:"+r._id+" imgId:"+a._id+" alt_fi"),d.mc("ngModel",a.alt_fi),d.Cb(2),d.mc("src",o.flagIcons[1].src,d.wc),d.Cb(1),d.nc("name","subGalleryId:"+r._id+" imgId:"+a._id+" alt_en"),d.mc("ngModel",a.alt_en)}}function S(e,t){if(1&e){var n=d.Wb();d.Vb(0,"div",4),d.Vb(1,"div",5),d.Vb(2,"div",6),d.Vb(3,"div",7),d.Vb(4,"div",8),d.Vb(5,"span",9),d.dc("click",(function(){d.vc(n);var e=t.$implicit;return d.hc().onDeleteSubGallery(e)})),d.Qb(6,"i",10),d.Ub(),d.Qb(7,"span",11),d.Vb(8,"span",12),d.Qb(9,"i",13),d.Ub(),d.Ub(),d.Vb(10,"span",14),d.Qb(11,"img",15),d.Vb(12,"input",16),d.dc("focusout",(function(){d.vc(n);var e=t.$implicit;return d.hc().onFocusOutSubGallery(e._id,"fi")})),d.Ub(),d.Ub(),d.Vb(13,"span",14),d.Qb(14,"img",17),d.Vb(15,"input",16),d.dc("focusout",(function(){d.vc(n);var e=t.$implicit;return d.hc().onFocusOutSubGallery(e._id,"en")})),d.Ub(),d.Ub(),d.Ub(),d.Vb(16,"div",18),d.dc("cdkDropListDropped",(function(e){d.vc(n);var a=t.$implicit;return d.hc().drop(e,a)})),d.Cc(17,G,16,8,"mat-card",19),d.Ub(),d.Vb(18,"span",20),d.Vb(19,"button",21),d.dc("click",(function(){d.vc(n);var e=t.$implicit;return d.hc().onAddImage(e)})),d.Dc(20," + "),d.Ub(),d.Ub(),d.Ub(),d.Ub(),d.Ub()}if(2&e){var a=t.$implicit,r=d.hc();d.Cb(11),d.mc("src",r.flagIcons[0].src,d.wc),d.Cb(1),d.nc("name","subGalleryId:"+a._id+" fi"),d.mc("ngModel",a.fi),d.Cb(2),d.mc("src",r.flagIcons[1].src,d.wc),d.Cb(1),d.nc("name","subGalleryId:"+a._id+" en"),d.mc("ngModel",a.en),d.Cb(1),d.mc("cdkDropListConnectedTo",r.imagesDropList)("id",a._id),d.Cb(1),d.mc("ngForOf",a.images)}}var D,V,A,R=((A=function(e){_inherits(n,e);var t=_createSuper(n);function n(e,a,r){var o;return _classCallCheck(this,n),(o=t.call(this)).dialog=e,o.facade=a,o.domSanitizer=r,o.flagIcons=[{src:"./assets/fi.png",alt:"fi"},{src:"./assets/uk.png",alt:"uk"}],o.subGalleries=[],o.imagesDropList=[],o.subGalleries$=o.facade.selectSubGalleries(),o}return _createClass(n,[{key:"ngOnInit",value:function(){var e=this;this.facade.subGalleriesRequested("".concat(g.a.baseUrl,"/api/galleries")),this.subGalleries$.pipe(Object(h.a)(this.ngUnsubscribe)).subscribe((function(t){e.subGalleries=t,e.updateDropList(),console.log(t)})),this.facade.autoLogin()}},{key:"updateDropList",value:function(){this.imagesDropList=[];var e,t=_createForOfIteratorHelper(this.subGalleries);try{for(t.s();!(e=t.n()).done;){var n=e.value;this.imagesDropList.push(n._id)}}catch(a){t.e(a)}finally{t.f()}}},{key:"deleteImage",value:function(e,t){confirm("Haluatko varmasti poistaa kuvan?")&&this.facade.deleteImgRequested(e,t)}},{key:"imgMovedBetweenSubGalleries",value:function(e,t,n,a){var r,o=this,i=[],c=this.subGalleries.findIndex((function(t){return t._id===e}));(r=_toConsumableArray(this.subGalleries[t].images.map((function(e,t){return{id:e._id,changes:{so:t<n?e.so:e.so+1}}})))).push({id:this.subGalleries[c].images[a]._id,changes:{gallery:this.subGalleries[t]._id,so:n}});var l=this.subGalleries[t].images.map((function(e){return e._id}));l.push(this.subGalleries[c].images[a]._id);var s={id:this.subGalleries[t]._id,changes:{images:l}};r=[].concat(_toConsumableArray(r),_toConsumableArray(this.subGalleries[c].images.filter((function(e,t){return t!==a})).map((function(e,t){return{id:e._id,changes:{so:t<a?e.so:e.so-1}}}))));var u={id:this.subGalleries[c]._id,changes:{images:this.subGalleries[c].images.map((function(e){return e._id})).filter((function(e){return e!==o.subGalleries[c].images[a]._id}))}};return i.push(s),i.push(u),[r,i]}},{key:"imgMovedInsideSubGallery",value:function(e,t,n,a){var r=[];if(e<0)for(var o=t;o<this.subGalleries[a].images.length;o++)r.push({id:this.subGalleries[a].images[o===t?n:o-1]._id,changes:{so:o}});else if(e>0)for(var i=t;i>=0;i--)r.push({id:this.subGalleries[a].images[i===t?n:i+1]._id,changes:{so:i}});return r}},{key:"drop",value:function(e,t){var n=this.subGalleries.indexOf(t),a=[],r=[];if(e.previousContainer!==e.container||e.previousIndex!==e.currentIndex){var o=[];e.previousContainer===e.container?o=this.imgMovedInsideSubGallery(e.currentIndex-e.previousIndex,e.currentIndex,e.previousIndex,n):(o=(r=this.imgMovedBetweenSubGalleries(e.previousContainer.id,n,e.currentIndex,e.previousIndex))[0],a=r[1]),this.facade.imagesUpdateToStoreRequested(o),this.facade.subGalleriesUpdateToStoreRequested(a)}}},{key:"dropSubGallery",value:function(e){if(e.previousIndex!==e.currentIndex){var t=[],n=e.currentIndex-e.previousIndex;if(n<0)for(var a=e.currentIndex;a<=e.currentIndex-n;a++)t.push({id:this.subGalleries[a===e.currentIndex?e.previousIndex:a-1]._id,changes:{so:a}});else if(n>0)for(var r=e.currentIndex;r>=e.currentIndex-n;r--)t.push({id:this.subGalleries[r===e.currentIndex?e.previousIndex:r+1]._id,changes:{so:r}});this.facade.subGalleriesUpdateToStoreRequested(t)}}},{key:"onDeleteSubGallery",value:function(e){confirm("Haluatko varmasti poistaa gallerian '".concat(e.fi,"' ja kaikki sen sis\xe4lt\xe4m\xe4t kuvat?"))&&this.facade.subGalleryDeleteRequested(e._id)}},{key:"onAddImage",value:function(e){var t=new b.d;t.panelClass="custom-dialog-container",this.dialog.open(v,t).componentInstance.galleryId=e._id}},{key:"openImage",value:function(e){this.imageModal.openImage(e)}},{key:"onFocusOutSubGallery",value:function(e,t){for(var n=[],a=0,r=Object.keys(this.subGalleryForm.form.controls);a<r.length;a++){var o=r[a],i=this.subGalleryForm.form.controls[o].value,c=o.split(" "),l=void 0;c[0].split(":")[1]===e&&(l=c[1])===t&&(n.push({id:e,changes:_defineProperty({},l,i)}),this.facade.subGalleriesUpdateToStoreRequested(n))}}},{key:"onFocusOutImg",value:function(e,t,n){for(var a=[],r=0,o=Object.keys(this.subGalleryForm.form.controls);r<o.length;r++){var i,c,l=o[r],s=this.subGalleryForm.form.controls[l].value,u=l.split(" "),d=void 0;i=u[0].split(":")[1],c=u[1].split(":")[1],i===e&&c===n&&(d=u[2])===t&&(a.push({id:n,changes:_defineProperty({},d,s)}),this.facade.imagesUpdateToStoreRequested(a))}}}]),n}(x.a)).\u0275fac=function(e){return new(e||A)(d.Pb(b.a),d.Pb(_.a),d.Pb(C.b))},A.\u0275cmp=d.Jb({type:A,selectors:[["app-admin"]],viewQuery:function(e,t){var n;1&e&&(d.Hc(L,!0),d.Hc(w,!0)),2&e&&(d.sc(n=d.ec())&&(t.subGalleryForm=n.first),d.sc(n=d.ec())&&(t.imageModal=n.first))},features:[d.zb],decls:8,vars:1,consts:[["fxFill","","fxLayout","column",1,"page-container"],["subGalleryForm","ngForm"],["fxFlex","","fxLayout","row","cdkDropListOrientation","horizontal","cdkDropList","",1,"sub-galleries-container",3,"cdkDropListDropped"],["cdkDrag","",4,"ngFor","ngForOf"],["cdkDrag",""],[1,"sub-gallery-container"],["fxLayout","column"],["fxFlex","nogrow","fxLayout","row wrap","fxLayoutAlign","center center",1,"sub-gallery-top-container"],["fxFlex","nogrow","fxLayout","row",1,"max-width"],[1,"delete-container",3,"click"],[1,"fa","fa-trash"],["fxFlex",""],["cdkDragHandle","",1,"drag-container"],[1,"fa","fa-arrows-alt"],["fxFlex","nogrow","fxLayout","row","fxLayoutAlign","none center"],["alt","flagIcons[0].src",1,"flag-icon",3,"src"],["fxFlex","nogrow","type","text",1,"card-input",3,"name","ngModel","focusout"],["alt","flagIcons[1].src",1,"flag-icon",3,"src"],["cdkDropList","","fxLayout","column","fxLayoutAlign","none center",1,"example-list",3,"cdkDropListConnectedTo","id","cdkDropListDropped"],["class","image-card","cdkDrag","",4,"ngFor","ngForOf"],["fxFlex","nogrow","fxLayout","row","fxLayoutAlign","center"],["type","button","fxFlex","nogrow",3,"click"],["cdkDrag","",1,"image-card"],["fxLayout","column","fxLayoutAlign","none center",1,"top-container"],["fxFlex","nogrow","id","myImg",1,"image",3,"src","alt","click"],["fxFlex","nogrow","alt","flagIcons[0].src",1,"flag-icon",3,"src"],["type","text","fxFlex","nogrow",1,"card-input",3,"name","ngModel","focusout"],["fxFlex","nogrow","alt","flagIcons[1].src",1,"flag-icon",3,"src"]],template:function(e,t){1&e&&(d.Vb(0,"div",0),d.Qb(1,"app-user-bar"),d.Qb(2,"app-image-modal"),d.Vb(3,"form",null,1),d.Vb(5,"div",2),d.dc("cdkDropListDropped",(function(e){return t.dropSubGallery(e)})),d.Cc(6,S,21,9,"div",3),d.Qb(7,"app-new-sub-gallery-form"),d.Ub(),d.Ub(),d.Ub()),2&e&&(d.Cb(6),d.mc("ngForOf",t.subGalleries))},directives:[k.h,k.f,M,w,u.A,u.m,u.n,k.b,I.e,l.s,U,I.a,k.e,I.b,u.c,u.l,u.o,F.a,F.d],styles:['.sub-gallery-container[_ngcontent-%COMP%]{background-color:#fff}.sub-gallery-top-container[_ngcontent-%COMP%]{background-color:#faebd7;margin:16px;border-radius:8px;width:250px}.sub-galleries-container[_ngcontent-%COMP%]{overflow:auto}.image[_ngcontent-%COMP%]{max-width:100px;max-height:120px}.delete-container[_ngcontent-%COMP%]{color:#bf0000;padding:12px 16px;font-size:16px;cursor:pointer}.drag-container[_ngcontent-%COMP%]{padding:12px 16px;font-size:16px;cursor:move;color:grey}.delete-container[_ngcontent-%COMP%]:hover{color:#df8080}input[type=submit][_ngcontent-%COMP%]{background-color:#4caf50;color:#fff;padding:14px 20px;margin:8px 0;border:none;cursor:pointer;width:25%}input[type=submit][_ngcontent-%COMP%]:hover{opacity:.8}.container[_ngcontent-%COMP%]{padding:16px;text-align:center}#myImg[_ngcontent-%COMP%]{border-radius:5px;cursor:pointer;transition:.3s}#myImg[_ngcontent-%COMP%]:hover{opacity:.7}.row[_ngcontent-%COMP%] > .column[_ngcontent-%COMP%]{padding:0 8px}.row[_ngcontent-%COMP%]:after{content:"";display:table;clear:both}img.demo[_ngcontent-%COMP%]{opacity:.6}.active[_ngcontent-%COMP%], .demo[_ngcontent-%COMP%]:hover{opacity:1}img.hover-shadow[_ngcontent-%COMP%]{transition:.3s}.hover-shadow[_ngcontent-%COMP%]:hover{box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19)}table[_ngcontent-%COMP%]{text-align:left!important;width:100%;border-collapse:collapse}td[_ngcontent-%COMP%]{border:none;width:33%;padding:10px}tr[_ngcontent-%COMP%]:hover{background-color:#f5f5f5}.page-container[_ngcontent-%COMP%], select[_ngcontent-%COMP%]{text-align:center}select[_ngcontent-%COMP%]{width:calc(20% - 20px);margin-left:20px;height:45px}.example-list[_ngcontent-%COMP%]{max-width:100%;min-height:60px;display:block;border-radius:4px;overflow:hidden}.example-box[_ngcontent-%COMP%]{padding:20px 10px;color:rgba(0,0,0,.87);box-sizing:border-box;cursor:move;background:#fff;font-size:14px}.cdk-drag-preview[_ngcontent-%COMP%]{box-sizing:border-box;border-radius:4px;box-shadow:0 5px 5px -3px rgba(0,0,0,.2),0 8px 10px 1px rgba(0,0,0,.14),0 3px 14px 2px rgba(0,0,0,.12)}.cdk-drag-placeholder[_ngcontent-%COMP%]{opacity:0}.cdk-drag-animating[_ngcontent-%COMP%]{transition:transform .25s cubic-bezier(0,0,.2,1)}.example-box[_ngcontent-%COMP%]:last-child{border:none}.example-list.cdk-drop-list-dragging[_ngcontent-%COMP%]   .example-box[_ngcontent-%COMP%]:not(.cdk-drag-placeholder){transition:transform .25s cubic-bezier(0,0,.2,1)}.image-card[_ngcontent-%COMP%]{width:250px;margin-bottom:16px;background-color:#fefefe;border:3px solid #f1f1f1;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);padding:0}@media screen and (max-width:600px){.image-card[_ngcontent-%COMP%], .sub-gallery-top-container[_ngcontent-%COMP%]{width:70vw}.sub-galleries-container[_ngcontent-%COMP%]{-ms-scroll-snap-type:x mandatory;scroll-snap-type:x mandatory}.sub-gallery-container[_ngcontent-%COMP%]{scroll-snap-align:center}}.image-card[_ngcontent-%COMP%]:first-child{margin-top:16px}.card-input[_ngcontent-%COMP%]{width:calc(100% - 30px);margin:8px;border:none;background-color:inherit;font-weight:bolder;height:20px}.card-input[_ngcontent-%COMP%]:hover{cursor:pointer}.flag-icon[_ngcontent-%COMP%]{height:10px;width:auto;margin:8px 0}.card-input[_ngcontent-%COMP%]:first-child{margin-top:16px!important}.title-label[_ngcontent-%COMP%]{padding-left:30px;width:100%;text-align:left}.save[_ngcontent-%COMP%]{margin-bottom:16px}']}),A),j=((V=function(){function e(t){_classCallCheck(this,e),this.facade=t,this.facade.autoLogin()}return _createClass(e,[{key:"loginUser",value:function(e){this.facade.loginStart(e.value.username,e.value.password)}}]),e}()).\u0275fac=function(e){return new(e||V)(d.Pb(_.a))},V.\u0275cmp=d.Jb({type:V,selectors:[["app-login"]],decls:8,vars:0,consts:[["id","login-form",3,"ngSubmit"],["loginForm","ngForm"],["type","text","name","username","id","username","placeholder","K\xe4ytt\xe4j\xe4nimi","ngModel",""],["type","password","name","password","id","password","placeholder","Salasana","ngModel",""],["mat-button","","form","login-form",1,"ok-button"],["routerLink","/home"]],template:function(e,t){if(1&e){var n=d.Wb();d.Vb(0,"form",0,1),d.dc("ngSubmit",(function(){d.vc(n);var e=d.tc(1);return t.loginUser(e)})),d.Qb(2,"input",2),d.Qb(3,"input",3),d.Vb(4,"button",4),d.Dc(5,"Kirjaudu sis\xe4\xe4n"),d.Ub(),d.Vb(6,"a",5),d.Dc(7,"Etusivulle"),d.Ub(),d.Ub()}},directives:[u.A,u.m,u.n,u.c,u.l,u.o,O.b,s.f],styles:["form[_ngcontent-%COMP%]{border:3px solid #f1f1f1;padding:20px;box-shadow:0 4px 8px 0 rgba(0,0,0,.2),0 6px 20px 0 rgba(0,0,0,.19);transform:translate(-50%,-50%);left:50%;top:50%;position:absolute;width:50%}input[type=password][_ngcontent-%COMP%], input[type=text][_ngcontent-%COMP%]{width:100%;padding:12px 20px;margin:8px 0;display:inline-block;border:1px solid #ccc;box-sizing:border-box}@media screen and (max-width:600px){form[_ngcontent-%COMP%]{width:80%}}.ok-button[_ngcontent-%COMP%]{margin-top:8px;width:100%;margin-bottom:8px}"]}),V),Q=((D=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||D)},D.\u0275cmp=d.Jb({type:D,selectors:[["app-spinner-overlay"]],decls:1,vars:0,consts:[[1,"loader"]],template:function(e,t){1&e&&d.Qb(0,"div",0)},styles:[".loader[_ngcontent-%COMP%]{margin:100px auto;font-size:25px;width:1em;height:1em;border-radius:50%;position:relative;text-indent:-9999em;-webkit-animation:load5 1.1s ease infinite;animation:load5 1.1s ease infinite;transform:translateZ(0)}@-webkit-keyframes load5{0%,to{box-shadow:0 -2.6em 0 0 grey,1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.5),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.7)}12.5%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.7),1.8em -1.8em 0 0 grey,2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.5)}25%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.5),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.7),2.5em 0 0 0 grey,1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}37.5%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.5),2.5em 0 0 0 hsla(0,0%,50.2%,.7),1.75em 1.75em 0 0 grey,0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}50%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.5),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.7),0 2.5em 0 0 grey,-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}62.5%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.5),0 2.5em 0 0 hsla(0,0%,50.2%,.7),-1.8em 1.8em 0 0 grey,-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}75%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.5),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.7),-2.6em 0 0 0 grey,-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}87.5%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.5),-2.6em 0 0 0 hsla(0,0%,50.2%,.7),-1.8em -1.8em 0 0 grey}}@keyframes load5{0%,to{box-shadow:0 -2.6em 0 0 grey,1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.5),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.7)}12.5%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.7),1.8em -1.8em 0 0 grey,2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.5)}25%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.5),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.7),2.5em 0 0 0 grey,1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}37.5%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.5),2.5em 0 0 0 hsla(0,0%,50.2%,.7),1.75em 1.75em 0 0 grey,0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}50%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.5),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.7),0 2.5em 0 0 grey,-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.2),-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}62.5%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.5),0 2.5em 0 0 hsla(0,0%,50.2%,.7),-1.8em 1.8em 0 0 grey,-2.6em 0 0 0 hsla(0,0%,50.2%,.2),-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}75%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.5),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.7),-2.6em 0 0 0 grey,-1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2)}87.5%{box-shadow:0 -2.6em 0 0 hsla(0,0%,50.2%,.2),1.8em -1.8em 0 0 hsla(0,0%,50.2%,.2),2.5em 0 0 0 hsla(0,0%,50.2%,.2),1.75em 1.75em 0 0 hsla(0,0%,50.2%,.2),0 2.5em 0 0 hsla(0,0%,50.2%,.2),-1.8em 1.8em 0 0 hsla(0,0%,50.2%,.5),-2.6em 0 0 0 hsla(0,0%,50.2%,.7),-1.8em -1.8em 0 0 grey}}"]}),D),T=["uploadForm"];function z(e,t){if(1&e&&d.Qb(0,"img",15),2&e){var n=d.hc();d.mc("src",n.imgUrl,d.wc)}}function q(e,t){1&e&&(d.Vb(0,"div",16),d.Qb(1,"app-spinner-overlay"),d.Ub())}var N,H,E,J,$=((N=function(e){_inherits(n,e);var t=_createSuper(n);function n(e,a,r){var o;return _classCallCheck(this,n),(o=t.call(this)).dialogRef=e,o.imageCompress=a,o.facade=r,o.file=null,o.disabled=!0,o.loading=!1,o}return _createClass(n,[{key:"ngOnInit",value:function(){var e=this;this.facade.getIsUploadingImg().pipe(Object(h.a)(this.ngUnsubscribe)).subscribe((function(t){"completed"===t?(e.uploadForm.reset(),e.file=null,e.imgUrl=null,e.dialogRef.close()):"cancelled"===t&&(e.loading=!1)}))}},{key:"uploadFile",value:function(e){confirm("Haluatko varmasti ladata kuvan?")&&(this.loading=!0,this.facade.imgUploadRequested({alt_fi:e.value.alt_fi,alt_en:e.value.alt_en,image:this.imgUrl},this.galleryId))}},{key:"cancelUpload",value:function(){this.dialogRef.close()}},{key:"compressFile",value:function(){var e=this;this.imageCompress.uploadFile().then((function(t){var n=t.image,a=t.orientation;e.loading=!0;var r=e.imageCompress.byteCount(n)>15e5?15e5/e.imageCompress.byteCount(n)*100:100;e.imageCompress.compressFile(n,a,100,r).then((function(t){e.imgUrl=t,e.disabled=!1,e.loading=!1}))}))}}]),n}(x.a)).\u0275fac=function(e){return new(e||N)(d.Pb(b.h),d.Pb(p),d.Pb(_.a))},N.\u0275cmp=d.Jb({type:N,selectors:[["app-upload-component"]],viewQuery:function(e,t){var n;1&e&&d.Hc(T,!0),2&e&&d.sc(n=d.ec())&&(t.uploadForm=n.first)},inputs:{galleryId:"galleryId"},features:[d.zb],decls:21,vars:3,consts:[[1,"upload-card"],["id","upload-form","ngNativeValidate","",1,"upload-form",3,"ngSubmit"],["uploadForm","ngForm"],[1,"imgcontainer"],["class","preview",3,"src",4,"ngIf"],["fxLayout","column","fxLayoutAlign","center center",1,"container"],["for","file-upload","fxFlex","nogrow",1,"custom-file-upload","max-width",3,"click"],[1,"fa","fa-cloud-upload"],["type","text","name","alt_fi","placeholder","Kuvateksti","required","","ngModel","","fxFlex","nogrow",1,"img-insert-input","max-width"],["type","text","name","alt_en","placeholder","Kuvateksti (englanninkielinen)","ngModel","","fxFlex","nogrow",1,"img-insert-input","max-width"],["fxFlex","nogrow","fxLayout","row",1,"button-container","max-width"],["mat-button","","type","button","fxFlex","",1,"warn-button","cancel-button",3,"click"],["fxFlex","16px"],["mat-button","","form","upload-form","fxFlex","",1,"ok-button","upload-button",3,"disabled"],["class","spinner-wrapper",4,"ngIf"],[1,"preview",3,"src"],[1,"spinner-wrapper"]],template:function(e,t){if(1&e){var n=d.Wb();d.Vb(0,"mat-card",0),d.Vb(1,"mat-card-content"),d.Vb(2,"form",1,2),d.dc("ngSubmit",(function(){d.vc(n);var e=d.tc(3);return t.uploadFile(e)})),d.Vb(4,"h1"),d.Dc(5,"Lis\xe4\xe4 kuva"),d.Ub(),d.Vb(6,"div",3),d.Cc(7,z,1,1,"img",4),d.Ub(),d.Vb(8,"div",5),d.Vb(9,"label",6),d.dc("click",(function(){return t.compressFile()})),d.Qb(10,"i",7),d.Dc(11," Valitse tiedosto "),d.Ub(),d.Qb(12,"input",8),d.Qb(13,"input",9),d.Vb(14,"div",10),d.Vb(15,"button",11),d.dc("click",(function(){return t.cancelUpload()})),d.Dc(16," Peruuta "),d.Ub(),d.Qb(17,"span",12),d.Vb(18,"button",13),d.Dc(19," Lataa "),d.Ub(),d.Ub(),d.Ub(),d.Ub(),d.Ub(),d.Ub(),d.Cc(20,q,2,0,"div",14)}2&e&&(d.Cb(7),d.mc("ngIf",t.imgUrl),d.Cb(11),d.mc("disabled",t.disabled),d.Cb(2),d.mc("ngIf",t.loading))},directives:[F.a,F.d,u.m,u.n,l.t,k.f,k.e,k.b,u.c,u.v,u.l,u.o,O.b,Q],styles:[".upload-card[_ngcontent-%COMP%]{border:none;margin:none}input[type=file][_ngcontent-%COMP%]{display:none}.custom-file-upload[_ngcontent-%COMP%]{border:1px solid #ccc;display:block;padding:6px 12px;cursor:pointer;margin-bottom:8px}.img-insert-input[_ngcontent-%COMP%]{padding:12px 20px;margin-top:8px;display:inline-block;border:1px solid #ccc;box-sizing:border-box;height:45px}.imgcontainer[_ngcontent-%COMP%]{text-align:center;margin:24px 0 12px;min-height:132px}img.preview[_ngcontent-%COMP%]{max-width:100px;max-height:120px;margin:0 auto;display:block;padding:6px 12px}.cancel-button[_ngcontent-%COMP%], .upload-button[_ngcontent-%COMP%]{margin-top:16px}"]}),N),W=n("brn1"),Z=((H=function(){function e(t,n,a){_classCallCheck(this,e),this.authenticationService=t,this.router=n,this.facade=a}return _createClass(e,[{key:"resolve",value:function(e,t){var n=this;if("false"!==e.queryParams.resolve)return this.authenticationService.authStatus().subscribe((function(e){return n.router.navigate(["/auth/admin"]),e}),(function(e){n.facade.logoutRequested(),n.router.navigate(["/auth/login"])}))}}]),e}()).\u0275fac=function(e){return new(e||H)(d.Zb(W.a),d.Zb(s.c),d.Zb(_.a))},H.\u0275prov=d.Lb({token:H,factory:H.\u0275fac,providedIn:"root"}),H),B=n("lJxs"),K=((E=function(e){_inherits(n,e);var t=_createSuper(n);function n(e){var a;return _classCallCheck(this,n),(a=t.call(this)).facade=e,a}return _createClass(n,[{key:"canDeactivate",value:function(e,t,n){return this.facade.isLoggedIn().pipe(Object(h.a)(this.ngUnsubscribe),Object(B.a)((function(e){return!e})))}}]),n}(x.a)).\u0275fac=function(e){return new(e||E)(d.Zb(_.a))},E.\u0275prov=d.Lb({token:E,factory:E.\u0275fac,providedIn:"root"}),E),X=n("LRne"),Y=n("JIr8"),ee=((J=function(){function e(t,n,a){_classCallCheck(this,e),this.authenticationService=t,this.router=n,this.route=a}return _createClass(e,[{key:"canActivate",value:function(e,t){var n=this;return this.authenticationService.authStatus().pipe(Object(B.a)((function(e){return!0})),Object(Y.a)((function(){return n.router.navigate(["/auth/login"]),Object(X.a)(!1)})))}}]),e}()).\u0275fac=function(e){return new(e||J)(d.Zb(W.a),d.Zb(s.c),d.Zb(s.a))},J.\u0275prov=d.Lb({token:J,factory:J.\u0275fac,providedIn:"root"}),J),te=n("Kude"),ne=n("u47x"),ae=n("UXJo"),re=n("B/XX"),oe=n("f6nW"),ie=n("FvrZ"),ce=n("vxfF"),le=n("/1cH"),se=n("FKr1"),ue=n("cH1L"),de=n("TU8p"),me=n("2ChS"),fe=n("jaxi"),pe=n("bSwM"),be=n("A5z7"),ge=n("xHqg"),he=n("iadO"),ye=n("f0Cb"),ve=n("7EHt"),xe=n("zkoq"),we=n("NFeN"),_e=n("ihCf"),Ce=n("kmnG"),ke=n("qFsG"),Oe=n("MutI"),Me=n("STbY"),Ie=n("M9IT"),Pe=n("bv9b"),Ue=n("Xa2L"),Fe=n("QibW"),Le=n("d3UM"),Ge=n("XhcP"),Se=n("5RNC"),De=n("1jcm"),Ve=n("dNgK"),Ae=n("Dh3D"),Re=n("+0xr"),je=n("wZkO"),Qe=n("/t3+"),Te=n("Qu3c"),ze=n("8yBR"),qe=n("+rOU"),Ne=n("znSr"),He=n("zpSk");n.d(t,"AuthModule",(function(){return Je}));var Ee,Je=((Ee=function e(){_classCallCheck(this,e)}).\u0275mod=d.Nb({type:Ee}),Ee.\u0275inj=d.Mb({factory:function(e){return new(e||Ee)},providers:[p],imports:[[s.g.forChild([{path:"",redirectTo:"admin",pathMatch:"full"},{path:"admin",component:R,canActivate:[ee],canDeactivate:[K]},{path:"login",component:j,resolve:{authResolver:Z}}]),u.f,te.a,l.c]]}),Ee);d.xc(v,[s.h,s.d,s.f,s.e,s.i,u.A,u.q,u.z,u.c,u.r,u.u,u.a,u.w,u.x,u.t,u.l,u.m,u.v,u.h,u.g,u.s,u.b,u.d,u.o,u.p,u.n,ne.d,ne.f,ne.e,ae.a,re.a,re.d,re.b,re.c,re.f,re.g,oe.p,oe.o,oe.c,oe.d,oe.k,oe.g,oe.e,oe.b,oe.n,oe.j,oe.f,oe.l,oe.m,oe.h,oe.i,oe.s,oe.u,oe.t,oe.r,ie.b,ie.f,ie.h,ie.i,ie.c,ie.e,ie.g,ce.b,I.e,I.f,I.a,I.b,I.d,I.c,le.a,se.n,se.m,le.d,le.c,ue.b,de.a,me.a,O.b,O.a,fe.b,fe.a,F.a,F.f,F.n,F.d,F.m,F.l,F.b,F.e,F.k,F.i,F.h,F.g,F.o,F.c,pe.a,pe.c,be.d,be.a,be.c,be.e,be.b,be.f,ge.a,ge.j,ge.b,ge.d,ge.e,ge.h,ge.i,ge.c,ge.f,he.a,he.b,he.d,he.e,he.f,he.h,he.i,he.j,he.l,he.k,he.c,b.e,b.c,b.i,b.f,b.b,ye.a,ve.a,ve.c,ve.d,ve.g,ve.h,ve.f,ve.e,xe.b,xe.d,xe.g,se.j,xe.f,xe.e,xe.a,we.a,_e.b,_e.c,Ce.b,Ce.c,Ce.f,Ce.g,Ce.h,Ce.i,Ce.j,ke.b,ke.d,Oe.a,Oe.h,Oe.d,Oe.b,Oe.c,Oe.g,se.q,Oe.i,Oe.f,Me.e,Me.b,Me.d,Me.a,Ie.a,Pe.a,Ue.a,Ue.c,Fe.b,Fe.a,se.s,Le.a,Le.c,Ge.a,Ge.b,Ge.c,Ge.d,Ge.e,Ge.f,Se.a,De.c,De.a,Ve.d,Ae.a,Ae.b,Re.n,Re.i,Re.k,Re.c,Re.b,Re.m,Re.e,Re.g,Re.h,Re.a,Re.d,Re.j,Re.l,Re.f,Re.p,je.c,je.d,je.a,je.f,je.e,je.b,Qe.a,Qe.c,Te.a,Te.c,ze.a,ze.e,ze.g,ze.h,ze.b,ze.d,ze.f,qe.b,qe.c,qe.j,qe.f,ce.a,ce.d,ce.e,k.f,k.g,k.e,k.d,k.c,k.h,k.a,k.b,Ne.c,Ne.a,Ne.d,Ne.b,He.e,He.f,He.g,He.h,He.i,He.j,He.k,He.l,He.b,He.c,He.d,l.q,l.r,l.s,l.t,l.A,l.w,l.x,l.y,l.z,l.u,l.v,R,j,M,$,v,Q,w,U],[l.b,l.G,l.p,l.k,l.E,l.g,l.C,l.F,l.d,l.f,l.i,l.j,l.l])}}]);