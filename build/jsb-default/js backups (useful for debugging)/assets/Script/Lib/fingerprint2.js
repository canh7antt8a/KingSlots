(function(e, t, i) {
"use strict";
"function" == typeof define && define.amd ? define(i) : "undefined" != typeof module && module.exports ? module.exports = i() : t.exports ? t.exports = i() : t.Fingerprint2 = i();
})(0, this, function() {
"use strict";
var t = function(e) {
if (!(this instanceof t)) return new t(e);
this.options = this.extend(e, {
swfContainerId: "fingerprintjs2",
swfPath: "flash/compiled/FontList.swf",
detectScreenOrientation: !0,
sortPluginsFor: [ /palemoon/i ],
userDefinedFonts: []
});
this.nativeForEach = Array.prototype.forEach;
this.nativeMap = Array.prototype.map;
};
t.prototype = {
extend: function(e, t) {
if (null == e) return t;
for (var i in e) null != e[i] && t[i] !== e[i] && (t[i] = e[i]);
return t;
},
get: function(a) {
var e = [];
e = this.userAgentKey(e);
e = this.languageKey(e);
e = this.colorDepthKey(e);
e = this.pixelRatioKey(e);
e = this.hardwareConcurrencyKey(e);
e = this.screenResolutionKey(e);
e = this.availableScreenResolutionKey(e);
e = this.timezoneOffsetKey(e);
e = this.sessionStorageKey(e);
e = this.localStorageKey(e);
e = this.indexedDbKey(e);
e = this.addBehaviorKey(e);
e = this.openDatabaseKey(e);
e = this.cpuClassKey(e);
e = this.platformKey(e);
e = this.doNotTrackKey(e);
e = this.pluginsKey(e);
e = this.canvasKey(e);
e = this.webglKey(e);
e = this.adBlockKey(e);
e = this.hasLiedLanguagesKey(e);
e = this.hasLiedResolutionKey(e);
e = this.hasLiedOsKey(e);
e = this.hasLiedBrowserKey(e);
e = this.touchSupportKey(e);
e = this.customEntropyFunction(e);
var r = this;
this.fontsKey(e, function(e) {
var i = [];
r.each(e, function(e) {
var t = e.value;
"undefined" != typeof e.value.join && (t = e.value.join(";"));
i.push(t);
});
var t = r.x64hash128(i.join("~~~"), 31);
return a(t, e);
});
},
customEntropyFunction: function(e) {
"function" == typeof this.options.customFunction && e.push({
key: "custom",
value: this.options.customFunction()
});
return e;
},
userAgentKey: function(e) {
this.options.excludeUserAgent || e.push({
key: "user_agent",
value: this.getUserAgent()
});
return e;
},
getUserAgent: function() {
return navigator.userAgent;
},
languageKey: function(e) {
this.options.excludeLanguage || e.push({
key: "language",
value: navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || ""
});
return e;
},
colorDepthKey: function(e) {
this.options.excludeColorDepth || e.push({
key: "color_depth",
value: screen.colorDepth || -1
});
return e;
},
pixelRatioKey: function(e) {
this.options.excludePixelRatio || e.push({
key: "pixel_ratio",
value: this.getPixelRatio()
});
return e;
},
getPixelRatio: function() {
return window.devicePixelRatio || "";
},
screenResolutionKey: function(e) {
return this.options.excludeScreenResolution ? e : this.getScreenResolution(e);
},
getScreenResolution: function(e) {
var t;
"undefined" != typeof (t = this.options.detectScreenOrientation && screen.height > screen.width ? [ screen.height, screen.width ] : [ screen.width, screen.height ]) && e.push({
key: "resolution",
value: t
});
return e;
},
availableScreenResolutionKey: function(e) {
return this.options.excludeAvailableScreenResolution ? e : this.getAvailableScreenResolution(e);
},
getAvailableScreenResolution: function(e) {
var t;
screen.availWidth && screen.availHeight && (t = this.options.detectScreenOrientation ? screen.availHeight > screen.availWidth ? [ screen.availHeight, screen.availWidth ] : [ screen.availWidth, screen.availHeight ] : [ screen.availHeight, screen.availWidth ]);
"undefined" != typeof t && e.push({
key: "available_resolution",
value: t
});
return e;
},
timezoneOffsetKey: function(e) {
this.options.excludeTimezoneOffset || e.push({
key: "timezone_offset",
value: new Date().getTimezoneOffset()
});
return e;
},
sessionStorageKey: function(e) {
!this.options.excludeSessionStorage && this.hasSessionStorage() && e.push({
key: "session_storage",
value: 1
});
return e;
},
localStorageKey: function(e) {
!this.options.excludeSessionStorage && this.hasLocalStorage() && e.push({
key: "local_storage",
value: 1
});
return e;
},
indexedDbKey: function(e) {
!this.options.excludeIndexedDB && this.hasIndexedDB() && e.push({
key: "indexed_db",
value: 1
});
return e;
},
addBehaviorKey: function(e) {
document.body && !this.options.excludeAddBehavior && document.body.addBehavior && e.push({
key: "add_behavior",
value: 1
});
return e;
},
openDatabaseKey: function(e) {
!this.options.excludeOpenDatabase && window.openDatabase && e.push({
key: "open_database",
value: 1
});
return e;
},
cpuClassKey: function(e) {
this.options.excludeCpuClass || e.push({
key: "cpu_class",
value: this.getNavigatorCpuClass()
});
return e;
},
platformKey: function(e) {
this.options.excludePlatform || e.push({
key: "navigator_platform",
value: this.getNavigatorPlatform()
});
return e;
},
doNotTrackKey: function(e) {
this.options.excludeDoNotTrack || e.push({
key: "do_not_track",
value: this.getDoNotTrack()
});
return e;
},
canvasKey: function(e) {
!this.options.excludeCanvas && this.isCanvasSupported() && e.push({
key: "canvas",
value: this.getCanvasFp()
});
return e;
},
webglKey: function(e) {
if (this.options.excludeWebGL) return e;
if (!this.isWebGlSupported()) return e;
e.push({
key: "webgl",
value: this.getWebglFp()
});
return e;
},
adBlockKey: function(e) {
this.options.excludeAdBlock || e.push({
key: "adblock",
value: this.getAdBlock()
});
return e;
},
hasLiedLanguagesKey: function(e) {
this.options.excludeHasLiedLanguages || e.push({
key: "has_lied_languages",
value: this.getHasLiedLanguages()
});
return e;
},
hasLiedResolutionKey: function(e) {
this.options.excludeHasLiedResolution || e.push({
key: "has_lied_resolution",
value: this.getHasLiedResolution()
});
return e;
},
hasLiedOsKey: function(e) {
this.options.excludeHasLiedOs || e.push({
key: "has_lied_os",
value: this.getHasLiedOs()
});
return e;
},
hasLiedBrowserKey: function(e) {
this.options.excludeHasLiedBrowser || e.push({
key: "has_lied_browser",
value: this.getHasLiedBrowser()
});
return e;
},
fontsKey: function(e, t) {
return this.options.excludeJsFonts ? this.flashFontsKey(e, t) : this.jsFontsKey(e, t);
},
flashFontsKey: function(t, i) {
if (this.options.excludeFlashFonts) return i(t);
if (!this.hasSwfObjectLoaded()) return i(t);
if (!this.hasMinFlashInstalled()) return i(t);
if ("undefined" == typeof this.options.swfPath) return i(t);
this.loadSwfAndDetectFonts(function(e) {
t.push({
key: "swf_fonts",
value: e.join(";")
});
i(t);
});
},
jsFontsKey: function(T, S) {
var x = this;
return setTimeout(function() {
var s = [ "monospace", "sans-serif", "serif" ], l = [ "Andale Mono", "Arial", "Arial Black", "Arial Hebrew", "Arial MT", "Arial Narrow", "Arial Rounded MT Bold", "Arial Unicode MS", "Bitstream Vera Sans Mono", "Book Antiqua", "Bookman Old Style", "Calibri", "Cambria", "Cambria Math", "Century", "Century Gothic", "Century Schoolbook", "Comic Sans", "Comic Sans MS", "Consolas", "Courier", "Courier New", "Garamond", "Geneva", "Georgia", "Helvetica", "Helvetica Neue", "Impact", "Lucida Bright", "Lucida Calligraphy", "Lucida Console", "Lucida Fax", "LUCIDA GRANDE", "Lucida Handwriting", "Lucida Sans", "Lucida Sans Typewriter", "Lucida Sans Unicode", "Microsoft Sans Serif", "Monaco", "Monotype Corsiva", "MS Gothic", "MS Outlook", "MS PGothic", "MS Reference Sans Serif", "MS Sans Serif", "MS Serif", "MYRIAD", "MYRIAD PRO", "Palatino", "Palatino Linotype", "Segoe Print", "Segoe Script", "Segoe UI", "Segoe UI Light", "Segoe UI Semibold", "Segoe UI Symbol", "Tahoma", "Times", "Times New Roman", "Times New Roman PS", "Trebuchet MS", "Verdana", "Wingdings", "Wingdings 2", "Wingdings 3" ];
x.options.extendedJsFonts && (l = l.concat([ "Abadi MT Condensed Light", "Academy Engraved LET", "ADOBE CASLON PRO", "Adobe Garamond", "ADOBE GARAMOND PRO", "Agency FB", "Aharoni", "Albertus Extra Bold", "Albertus Medium", "Algerian", "Amazone BT", "American Typewriter", "American Typewriter Condensed", "AmerType Md BT", "Andalus", "Angsana New", "AngsanaUPC", "Antique Olive", "Aparajita", "Apple Chancery", "Apple Color Emoji", "Apple SD Gothic Neo", "Arabic Typesetting", "ARCHER", "ARNO PRO", "Arrus BT", "Aurora Cn BT", "AvantGarde Bk BT", "AvantGarde Md BT", "AVENIR", "Ayuthaya", "Bandy", "Bangla Sangam MN", "Bank Gothic", "BankGothic Md BT", "Baskerville", "Baskerville Old Face", "Batang", "BatangChe", "Bauer Bodoni", "Bauhaus 93", "Bazooka", "Bell MT", "Bembo", "Benguiat Bk BT", "Berlin Sans FB", "Berlin Sans FB Demi", "Bernard MT Condensed", "BernhardFashion BT", "BernhardMod BT", "Big Caslon", "BinnerD", "Blackadder ITC", "BlairMdITC TT", "Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72 Smallcaps", "Bodoni MT", "Bodoni MT Black", "Bodoni MT Condensed", "Bodoni MT Poster Compressed", "Bookshelf Symbol 7", "Boulder", "Bradley Hand", "Bradley Hand ITC", "Bremen Bd BT", "Britannic Bold", "Broadway", "Browallia New", "BrowalliaUPC", "Brush Script MT", "Californian FB", "Calisto MT", "Calligrapher", "Candara", "CaslonOpnface BT", "Castellar", "Centaur", "Cezanne", "CG Omega", "CG Times", "Chalkboard", "Chalkboard SE", "Chalkduster", "Charlesworth", "Charter Bd BT", "Charter BT", "Chaucer", "ChelthmITC Bk BT", "Chiller", "Clarendon", "Clarendon Condensed", "CloisterBlack BT", "Cochin", "Colonna MT", "Constantia", "Cooper Black", "Copperplate", "Copperplate Gothic", "Copperplate Gothic Bold", "Copperplate Gothic Light", "CopperplGoth Bd BT", "Corbel", "Cordia New", "CordiaUPC", "Cornerstone", "Coronet", "Cuckoo", "Curlz MT", "DaunPenh", "Dauphin", "David", "DB LCD Temp", "DELICIOUS", "Denmark", "DFKai-SB", "Didot", "DilleniaUPC", "DIN", "DokChampa", "Dotum", "DotumChe", "Ebrima", "Edwardian Script ITC", "Elephant", "English 111 Vivace BT", "Engravers MT", "EngraversGothic BT", "Eras Bold ITC", "Eras Demi ITC", "Eras Light ITC", "Eras Medium ITC", "EucrosiaUPC", "Euphemia", "Euphemia UCAS", "EUROSTILE", "Exotc350 Bd BT", "FangSong", "Felix Titling", "Fixedsys", "FONTIN", "Footlight MT Light", "Forte", "FrankRuehl", "Fransiscan", "Freefrm721 Blk BT", "FreesiaUPC", "Freestyle Script", "French Script MT", "FrnkGothITC Bk BT", "Fruitger", "FRUTIGER", "Futura", "Futura Bk BT", "Futura Lt BT", "Futura Md BT", "Futura ZBlk BT", "FuturaBlack BT", "Gabriola", "Galliard BT", "Gautami", "Geeza Pro", "Geometr231 BT", "Geometr231 Hv BT", "Geometr231 Lt BT", "GeoSlab 703 Lt BT", "GeoSlab 703 XBd BT", "Gigi", "Gill Sans", "Gill Sans MT", "Gill Sans MT Condensed", "Gill Sans MT Ext Condensed Bold", "Gill Sans Ultra Bold", "Gill Sans Ultra Bold Condensed", "Gisha", "Gloucester MT Extra Condensed", "GOTHAM", "GOTHAM BOLD", "Goudy Old Style", "Goudy Stout", "GoudyHandtooled BT", "GoudyOLSt BT", "Gujarati Sangam MN", "Gulim", "GulimChe", "Gungsuh", "GungsuhChe", "Gurmukhi MN", "Haettenschweiler", "Harlow Solid Italic", "Harrington", "Heather", "Heiti SC", "Heiti TC", "HELV", "Herald", "High Tower Text", "Hiragino Kaku Gothic ProN", "Hiragino Mincho ProN", "Hoefler Text", "Humanst 521 Cn BT", "Humanst521 BT", "Humanst521 Lt BT", "Imprint MT Shadow", "Incised901 Bd BT", "Incised901 BT", "Incised901 Lt BT", "INCONSOLATA", "Informal Roman", "Informal011 BT", "INTERSTATE", "IrisUPC", "Iskoola Pota", "JasmineUPC", "Jazz LET", "Jenson", "Jester", "Jokerman", "Juice ITC", "Kabel Bk BT", "Kabel Ult BT", "Kailasa", "KaiTi", "Kalinga", "Kannada Sangam MN", "Kartika", "Kaufmann Bd BT", "Kaufmann BT", "Khmer UI", "KodchiangUPC", "Kokila", "Korinna BT", "Kristen ITC", "Krungthep", "Kunstler Script", "Lao UI", "Latha", "Leelawadee", "Letter Gothic", "Levenim MT", "LilyUPC", "Lithograph", "Lithograph Light", "Long Island", "Lydian BT", "Magneto", "Maiandra GD", "Malayalam Sangam MN", "Malgun Gothic", "Mangal", "Marigold", "Marion", "Marker Felt", "Market", "Marlett", "Matisse ITC", "Matura MT Script Capitals", "Meiryo", "Meiryo UI", "Microsoft Himalaya", "Microsoft JhengHei", "Microsoft New Tai Lue", "Microsoft PhagsPa", "Microsoft Tai Le", "Microsoft Uighur", "Microsoft YaHei", "Microsoft Yi Baiti", "MingLiU", "MingLiU_HKSCS", "MingLiU_HKSCS-ExtB", "MingLiU-ExtB", "Minion", "Minion Pro", "Miriam", "Miriam Fixed", "Mistral", "Modern", "Modern No. 20", "Mona Lisa Solid ITC TT", "Mongolian Baiti", "MONO", "MoolBoran", "Mrs Eaves", "MS LineDraw", "MS Mincho", "MS PMincho", "MS Reference Specialty", "MS UI Gothic", "MT Extra", "MUSEO", "MV Boli", "Nadeem", "Narkisim", "NEVIS", "News Gothic", "News GothicMT", "NewsGoth BT", "Niagara Engraved", "Niagara Solid", "Noteworthy", "NSimSun", "Nyala", "OCR A Extended", "Old Century", "Old English Text MT", "Onyx", "Onyx BT", "OPTIMA", "Oriya Sangam MN", "OSAKA", "OzHandicraft BT", "Palace Script MT", "Papyrus", "Parchment", "Party LET", "Pegasus", "Perpetua", "Perpetua Titling MT", "PetitaBold", "Pickwick", "Plantagenet Cherokee", "Playbill", "PMingLiU", "PMingLiU-ExtB", "Poor Richard", "Poster", "PosterBodoni BT", "PRINCETOWN LET", "Pristina", "PTBarnum BT", "Pythagoras", "Raavi", "Rage Italic", "Ravie", "Ribbon131 Bd BT", "Rockwell", "Rockwell Condensed", "Rockwell Extra Bold", "Rod", "Roman", "Sakkal Majalla", "Santa Fe LET", "Savoye LET", "Sceptre", "Script", "Script MT Bold", "SCRIPTINA", "Serifa", "Serifa BT", "Serifa Th BT", "ShelleyVolante BT", "Sherwood", "Shonar Bangla", "Showcard Gothic", "Shruti", "Signboard", "SILKSCREEN", "SimHei", "Simplified Arabic", "Simplified Arabic Fixed", "SimSun", "SimSun-ExtB", "Sinhala Sangam MN", "Sketch Rockwell", "Skia", "Small Fonts", "Snap ITC", "Snell Roundhand", "Socket", "Souvenir Lt BT", "Staccato222 BT", "Steamer", "Stencil", "Storybook", "Styllo", "Subway", "Swis721 BlkEx BT", "Swiss911 XCm BT", "Sylfaen", "Synchro LET", "System", "Tamil Sangam MN", "Technical", "Teletype", "Telugu Sangam MN", "Tempus Sans ITC", "Terminal", "Thonburi", "Traditional Arabic", "Trajan", "TRAJAN PRO", "Tristan", "Tubular", "Tunga", "Tw Cen MT", "Tw Cen MT Condensed", "Tw Cen MT Condensed Extra Bold", "TypoUpright BT", "Unicorn", "Univers", "Univers CE 55 Medium", "Univers Condensed", "Utsaah", "Vagabond", "Vani", "Vijaya", "Viner Hand ITC", "VisualUI", "Vivaldi", "Vladimir Script", "Vrinda", "Westminster", "WHITNEY", "Wide Latin", "ZapfEllipt BT", "ZapfHumnst BT", "ZapfHumnst Dm BT", "Zapfino", "Zurich BlkEx BT", "Zurich Ex BT", "ZWAdobeF" ]));
l = l.concat(x.options.userDefinedFonts);
var e = document.getElementsByTagName("body")[0], r = document.createElement("div"), h = document.createElement("div"), a = {}, n = {}, o = function() {
var e = document.createElement("span");
e.style.position = "absolute";
e.style.left = "-9999px";
e.style.fontSize = "72px";
e.style.lineHeight = "normal";
e.innerHTML = "mmmmmmmmmmlli";
return e;
}, u = function(e, t) {
var i = o();
i.style.fontFamily = "'" + e + "'," + t;
return i;
}, t = function(e) {
for (var t = !1, i = 0; i < s.length; i++) if (t = e[i].offsetWidth !== a[s[i]] || e[i].offsetHeight !== n[s[i]]) return t;
return t;
}, i = function() {
for (var e = [], t = 0, i = s.length; t < i; t++) {
var a = o();
a.style.fontFamily = s[t];
r.appendChild(a);
e.push(a);
}
return e;
}();
e.appendChild(r);
for (var c = 0, d = s.length; c < d; c++) {
a[s[c]] = i[c].offsetWidth;
n[s[c]] = i[c].offsetHeight;
}
var g = function() {
for (var e = {}, t = 0, i = l.length; t < i; t++) {
for (var a = [], r = 0, n = s.length; r < n; r++) {
var o = u(l[t], s[r]);
h.appendChild(o);
a.push(o);
}
e[l[t]] = a;
}
return e;
}();
e.appendChild(h);
for (var p = [], f = 0, m = l.length; f < m; f++) t(g[l[f]]) && p.push(l[f]);
e.removeChild(h);
e.removeChild(r);
T.push({
key: "js_fonts",
value: p
});
S(T);
}, 1);
},
pluginsKey: function(e) {
this.options.excludePlugins || (this.isIE() ? this.options.excludeIEPlugins || e.push({
key: "ie_plugins",
value: this.getIEPlugins()
}) : e.push({
key: "regular_plugins",
value: this.getRegularPlugins()
}));
return e;
},
getRegularPlugins: function() {
for (var e = [], t = 0, i = navigator.plugins.length; t < i; t++) e.push(navigator.plugins[t]);
this.pluginsShouldBeSorted() && (e = e.sort(function(e, t) {
return e.name > t.name ? 1 : e.name < t.name ? -1 : 0;
}));
return this.map(e, function(e) {
var t = this.map(e, function(e) {
return [ e.type, e.suffixes ].join("~");
}).join(",");
return [ e.name, e.description, t ].join("::");
}, this);
},
getIEPlugins: function() {
var e = [];
if (Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject") || "ActiveXObject" in window) {
e = this.map([ "AcroPDF.PDF", "Adodb.Stream", "AgControl.AgControl", "DevalVRXCtrl.DevalVRXCtrl.1", "MacromediaFlashPaper.MacromediaFlashPaper", "Msxml2.DOMDocument", "Msxml2.XMLHTTP", "PDF.PdfCtrl", "QuickTime.QuickTime", "QuickTimeCheckObject.QuickTimeCheck.1", "RealPlayer", "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)", "RealVideo.RealVideo(tm) ActiveX Control (32-bit)", "Scripting.Dictionary", "SWCtl.SWCtl", "Shell.UIHelper", "ShockwaveFlash.ShockwaveFlash", "Skype.Detection", "TDCCtl.TDCCtl", "WMPlayer.OCX", "rmocx.RealPlayer G2 Control", "rmocx.RealPlayer G2 Control.1" ], function(e) {
try {
new ActiveXObject(e);
return e;
} catch (e) {
return null;
}
});
}
navigator.plugins && (e = e.concat(this.getRegularPlugins()));
return e;
},
pluginsShouldBeSorted: function() {
for (var e = !1, t = 0, i = this.options.sortPluginsFor.length; t < i; t++) {
var a = this.options.sortPluginsFor[t];
if (navigator.userAgent.match(a)) {
e = !0;
break;
}
}
return e;
},
touchSupportKey: function(e) {
this.options.excludeTouchSupport || e.push({
key: "touch_support",
value: this.getTouchSupport()
});
return e;
},
hardwareConcurrencyKey: function(e) {
this.options.excludeHardwareConcurrency || e.push({
key: "hardware_concurrency",
value: this.getHardwareConcurrency()
});
return e;
},
hasSessionStorage: function() {
try {
return !!window.sessionStorage;
} catch (e) {
return !0;
}
},
hasLocalStorage: function() {
try {
return !!window.localStorage;
} catch (e) {
return !0;
}
},
hasIndexedDB: function() {
try {
return !!window.indexedDB;
} catch (e) {
return !0;
}
},
getHardwareConcurrency: function() {
return navigator.hardwareConcurrency ? navigator.hardwareConcurrency : "unknown";
},
getNavigatorCpuClass: function() {
return navigator.cpuClass ? navigator.cpuClass : "unknown";
},
getNavigatorPlatform: function() {
return navigator.platform ? navigator.platform : "unknown";
},
getDoNotTrack: function() {
return navigator.doNotTrack ? navigator.doNotTrack : navigator.msDoNotTrack ? navigator.msDoNotTrack : window.doNotTrack ? window.doNotTrack : "unknown";
},
getTouchSupport: function() {
var e = 0, t = !1;
"undefined" != typeof navigator.maxTouchPoints ? e = navigator.maxTouchPoints : "undefined" != typeof navigator.msMaxTouchPoints && (e = navigator.msMaxTouchPoints);
try {
document.createEvent("TouchEvent");
t = !0;
} catch (e) {}
return [ e, t, "ontouchstart" in window ];
},
getCanvasFp: function() {
var e = [], t = document.createElement("canvas");
t.width = 2e3;
t.height = 200;
t.style.display = "inline";
var i = t.getContext("2d");
i.rect(0, 0, 10, 10);
i.rect(2, 2, 6, 6);
e.push("canvas winding:" + (!1 === i.isPointInPath(5, 5, "evenodd") ? "yes" : "no"));
i.textBaseline = "alphabetic";
i.fillStyle = "#f60";
i.fillRect(125, 1, 62, 20);
i.fillStyle = "#069";
this.options.dontUseFakeFontInCanvas ? i.font = "11pt Arial" : i.font = "11pt no-real-font-123";
i.fillText("Cwm fjordbank glyphs vext quiz, 😃", 2, 15);
i.fillStyle = "rgba(102, 204, 0, 0.2)";
i.font = "18pt Arial";
i.fillText("Cwm fjordbank glyphs vext quiz, 😃", 4, 45);
i.globalCompositeOperation = "multiply";
i.fillStyle = "rgb(255,0,255)";
i.beginPath();
i.arc(50, 50, 50, 0, 2 * Math.PI, !0);
i.closePath();
i.fill();
i.fillStyle = "rgb(0,255,255)";
i.beginPath();
i.arc(100, 50, 50, 0, 2 * Math.PI, !0);
i.closePath();
i.fill();
i.fillStyle = "rgb(255,255,0)";
i.beginPath();
i.arc(75, 100, 50, 0, 2 * Math.PI, !0);
i.closePath();
i.fill();
i.fillStyle = "rgb(255,0,255)";
i.arc(75, 75, 75, 0, 2 * Math.PI, !0);
i.arc(75, 75, 25, 0, 2 * Math.PI, !0);
i.fill("evenodd");
e.push("canvas fp:" + t.toDataURL());
return e.join("~");
},
getWebglFp: function() {
var t, e = function(e) {
t.clearColor(0, 0, 0, 1);
t.enable(t.DEPTH_TEST);
t.depthFunc(t.LEQUAL);
t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT);
return "[" + e[0] + ", " + e[1] + "]";
};
if (!(t = this.getWebglCanvas())) return null;
var i = [], a = t.createBuffer();
t.bindBuffer(t.ARRAY_BUFFER, a);
var r = new Float32Array([ -.2, -.9, 0, .4, -.26, 0, 0, .732134444, 0 ]);
t.bufferData(t.ARRAY_BUFFER, r, t.STATIC_DRAW);
a.itemSize = 3;
a.numItems = 3;
var n = t.createProgram(), o = t.createShader(t.VERTEX_SHADER);
t.shaderSource(o, "attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}");
t.compileShader(o);
var s, l, h, u = t.createShader(t.FRAGMENT_SHADER);
t.shaderSource(u, "precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}");
t.compileShader(u);
t.attachShader(n, o);
t.attachShader(n, u);
t.linkProgram(n);
t.useProgram(n);
n.vertexPosAttrib = t.getAttribLocation(n, "attrVertex");
n.offsetUniform = t.getUniformLocation(n, "uniformOffset");
t.enableVertexAttribArray(n.vertexPosArray);
t.vertexAttribPointer(n.vertexPosAttrib, a.itemSize, t.FLOAT, !1, 0, 0);
t.uniform2f(n.offsetUniform, 1, 1);
t.drawArrays(t.TRIANGLE_STRIP, 0, a.numItems);
null != t.canvas && i.push(t.canvas.toDataURL());
i.push("extensions:" + t.getSupportedExtensions().join(";"));
i.push("webgl aliased line width range:" + e(t.getParameter(t.ALIASED_LINE_WIDTH_RANGE)));
i.push("webgl aliased point size range:" + e(t.getParameter(t.ALIASED_POINT_SIZE_RANGE)));
i.push("webgl alpha bits:" + t.getParameter(t.ALPHA_BITS));
i.push("webgl antialiasing:" + (t.getContextAttributes().antialias ? "yes" : "no"));
i.push("webgl blue bits:" + t.getParameter(t.BLUE_BITS));
i.push("webgl depth bits:" + t.getParameter(t.DEPTH_BITS));
i.push("webgl green bits:" + t.getParameter(t.GREEN_BITS));
i.push("webgl max anisotropy:" + ((h = (s = t).getExtension("EXT_texture_filter_anisotropic") || s.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || s.getExtension("MOZ_EXT_texture_filter_anisotropic")) ? (0 === (l = s.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)) && (l = 2), 
l) : null));
i.push("webgl max combined texture image units:" + t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS));
i.push("webgl max cube map texture size:" + t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE));
i.push("webgl max fragment uniform vectors:" + t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS));
i.push("webgl max render buffer size:" + t.getParameter(t.MAX_RENDERBUFFER_SIZE));
i.push("webgl max texture image units:" + t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS));
i.push("webgl max texture size:" + t.getParameter(t.MAX_TEXTURE_SIZE));
i.push("webgl max varying vectors:" + t.getParameter(t.MAX_VARYING_VECTORS));
i.push("webgl max vertex attribs:" + t.getParameter(t.MAX_VERTEX_ATTRIBS));
i.push("webgl max vertex texture image units:" + t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS));
i.push("webgl max vertex uniform vectors:" + t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS));
i.push("webgl max viewport dims:" + e(t.getParameter(t.MAX_VIEWPORT_DIMS)));
i.push("webgl red bits:" + t.getParameter(t.RED_BITS));
i.push("webgl renderer:" + t.getParameter(t.RENDERER));
i.push("webgl shading language version:" + t.getParameter(t.SHADING_LANGUAGE_VERSION));
i.push("webgl stencil bits:" + t.getParameter(t.STENCIL_BITS));
i.push("webgl vendor:" + t.getParameter(t.VENDOR));
i.push("webgl version:" + t.getParameter(t.VERSION));
try {
var c = t.getExtension("WEBGL_debug_renderer_info");
if (c) {
i.push("webgl unmasked vendor:" + t.getParameter(c.UNMASKED_VENDOR_WEBGL));
i.push("webgl unmasked renderer:" + t.getParameter(c.UNMASKED_RENDERER_WEBGL));
}
} catch (e) {}
if (!t.getShaderPrecisionFormat) return i.join("~");
i.push("webgl vertex shader high float precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).precision);
i.push("webgl vertex shader high float precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).rangeMin);
i.push("webgl vertex shader high float precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_FLOAT).rangeMax);
i.push("webgl vertex shader medium float precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).precision);
i.push("webgl vertex shader medium float precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).rangeMin);
i.push("webgl vertex shader medium float precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_FLOAT).rangeMax);
i.push("webgl vertex shader low float precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_FLOAT).precision);
i.push("webgl vertex shader low float precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_FLOAT).rangeMin);
i.push("webgl vertex shader low float precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_FLOAT).rangeMax);
i.push("webgl fragment shader high float precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).precision);
i.push("webgl fragment shader high float precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).rangeMin);
i.push("webgl fragment shader high float precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_FLOAT).rangeMax);
i.push("webgl fragment shader medium float precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).precision);
i.push("webgl fragment shader medium float precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).rangeMin);
i.push("webgl fragment shader medium float precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_FLOAT).rangeMax);
i.push("webgl fragment shader low float precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_FLOAT).precision);
i.push("webgl fragment shader low float precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_FLOAT).rangeMin);
i.push("webgl fragment shader low float precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_FLOAT).rangeMax);
i.push("webgl vertex shader high int precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_INT).precision);
i.push("webgl vertex shader high int precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_INT).rangeMin);
i.push("webgl vertex shader high int precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.HIGH_INT).rangeMax);
i.push("webgl vertex shader medium int precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_INT).precision);
i.push("webgl vertex shader medium int precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_INT).rangeMin);
i.push("webgl vertex shader medium int precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.MEDIUM_INT).rangeMax);
i.push("webgl vertex shader low int precision:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_INT).precision);
i.push("webgl vertex shader low int precision rangeMin:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_INT).rangeMin);
i.push("webgl vertex shader low int precision rangeMax:" + t.getShaderPrecisionFormat(t.VERTEX_SHADER, t.LOW_INT).rangeMax);
i.push("webgl fragment shader high int precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_INT).precision);
i.push("webgl fragment shader high int precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_INT).rangeMin);
i.push("webgl fragment shader high int precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.HIGH_INT).rangeMax);
i.push("webgl fragment shader medium int precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_INT).precision);
i.push("webgl fragment shader medium int precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_INT).rangeMin);
i.push("webgl fragment shader medium int precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.MEDIUM_INT).rangeMax);
i.push("webgl fragment shader low int precision:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_INT).precision);
i.push("webgl fragment shader low int precision rangeMin:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_INT).rangeMin);
i.push("webgl fragment shader low int precision rangeMax:" + t.getShaderPrecisionFormat(t.FRAGMENT_SHADER, t.LOW_INT).rangeMax);
return i.join("~");
},
getAdBlock: function() {
var e = document.createElement("div");
e.innerHTML = "&nbsp;";
e.className = "adsbox";
var t = !1;
try {
document.body.appendChild(e);
t = 0 === document.getElementsByClassName("adsbox")[0].offsetHeight;
document.body.removeChild(e);
} catch (e) {
t = !1;
}
return t;
},
getHasLiedLanguages: function() {
if ("undefined" != typeof navigator.languages) try {
if (navigator.languages[0].substr(0, 2) !== navigator.language.substr(0, 2)) return !0;
} catch (e) {
return !0;
}
return !1;
},
getHasLiedResolution: function() {
return screen.width < screen.availWidth || screen.height < screen.availHeight;
},
getHasLiedOs: function() {
var e, t = navigator.userAgent.toLowerCase(), i = navigator.oscpu, a = navigator.platform.toLowerCase();
e = 0 <= t.indexOf("windows phone") ? "Windows Phone" : 0 <= t.indexOf("win") ? "Windows" : 0 <= t.indexOf("android") ? "Android" : 0 <= t.indexOf("linux") ? "Linux" : 0 <= t.indexOf("iphone") || 0 <= t.indexOf("ipad") ? "iOS" : 0 <= t.indexOf("mac") ? "Mac" : "Other";
if (("ontouchstart" in window || 0 < navigator.maxTouchPoints || 0 < navigator.msMaxTouchPoints) && "Windows Phone" !== e && "Android" !== e && "iOS" !== e && "Other" !== e) return !0;
if ("undefined" != typeof i) {
if (0 <= (i = i.toLowerCase()).indexOf("win") && "Windows" !== e && "Windows Phone" !== e) return !0;
if (0 <= i.indexOf("linux") && "Linux" !== e && "Android" !== e) return !0;
if (0 <= i.indexOf("mac") && "Mac" !== e && "iOS" !== e) return !0;
if (0 === i.indexOf("win") && 0 === i.indexOf("linux") && 0 <= i.indexOf("mac") && "other" !== e) return !0;
}
return 0 <= a.indexOf("win") && "Windows" !== e && "Windows Phone" !== e || ((0 <= a.indexOf("linux") || 0 <= a.indexOf("android") || 0 <= a.indexOf("pike")) && "Linux" !== e && "Android" !== e || ((0 <= a.indexOf("mac") || 0 <= a.indexOf("ipad") || 0 <= a.indexOf("ipod") || 0 <= a.indexOf("iphone")) && "Mac" !== e && "iOS" !== e || (0 === a.indexOf("win") && 0 === a.indexOf("linux") && 0 <= a.indexOf("mac") && "other" !== e || "undefined" == typeof navigator.plugins && "Windows" !== e && "Windows Phone" !== e)));
},
getHasLiedBrowser: function() {
var e, t = navigator.userAgent.toLowerCase(), i = navigator.productSub;
if (("Chrome" === (e = 0 <= t.indexOf("firefox") ? "Firefox" : 0 <= t.indexOf("opera") || 0 <= t.indexOf("opr") ? "Opera" : 0 <= t.indexOf("chrome") ? "Chrome" : 0 <= t.indexOf("safari") ? "Safari" : 0 <= t.indexOf("trident") ? "Internet Explorer" : "Other") || "Safari" === e || "Opera" === e) && "20030107" !== i) return !0;
var a, r = eval.toString().length;
if (37 === r && "Safari" !== e && "Firefox" !== e && "Other" !== e) return !0;
if (39 === r && "Internet Explorer" !== e && "Other" !== e) return !0;
if (33 === r && "Chrome" !== e && "Opera" !== e && "Other" !== e) return !0;
try {
throw "a";
} catch (e) {
try {
e.toSource();
a = !0;
} catch (e) {
a = !1;
}
}
return !(!a || "Firefox" === e || "Other" === e);
},
isCanvasSupported: function() {
var e = document.createElement("canvas");
return !(!e.getContext || !e.getContext("2d"));
},
isWebGlSupported: function() {
if (!this.isCanvasSupported()) return !1;
var t, e = document.createElement("canvas");
try {
t = e.getContext && (e.getContext("webgl") || e.getContext("experimental-webgl"));
} catch (e) {
t = !1;
}
return !!window.WebGLRenderingContext && !!t;
},
isIE: function() {
return "Microsoft Internet Explorer" === navigator.appName || !("Netscape" !== navigator.appName || !/Trident/.test(navigator.userAgent));
},
hasSwfObjectLoaded: function() {
return "undefined" != typeof window.swfobject;
},
hasMinFlashInstalled: function() {
return swfobject.hasFlashPlayerVersion("9.0.0");
},
addFlashDivNode: function() {
var e = document.createElement("div");
e.setAttribute("id", this.options.swfContainerId);
document.body.appendChild(e);
},
loadSwfAndDetectFonts: function(t) {
var e = "___fp_swf_loaded";
window[e] = function(e) {
t(e);
};
var i = this.options.swfContainerId;
this.addFlashDivNode();
var a = {
onReady: e
};
swfobject.embedSWF(this.options.swfPath, i, "1", "1", "9.0.0", !1, a, {
allowScriptAccess: "always",
menu: "false"
}, {});
},
getWebglCanvas: function() {
var e = document.createElement("canvas"), t = null;
try {
t = e.getContext("webgl") || e.getContext("experimental-webgl");
} catch (e) {}
t || (t = null);
return t;
},
each: function(e, t, i) {
if (null !== e) if (this.nativeForEach && e.forEach === this.nativeForEach) e.forEach(t, i); else if (e.length === +e.length) {
for (var a = 0, r = e.length; a < r; a++) if (t.call(i, e[a], a, e) === {}) return;
} else for (var n in e) if (e.hasOwnProperty(n) && t.call(i, e[n], n, e) === {}) return;
},
map: function(e, a, r) {
var n = [];
if (null == e) return n;
if (this.nativeMap && e.map === this.nativeMap) return e.map(a, r);
this.each(e, function(e, t, i) {
n[n.length] = a.call(r, e, t, i);
});
return n;
},
x64Add: function(e, t) {
e = [ e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1] ];
t = [ t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1] ];
var i = [ 0, 0, 0, 0 ];
i[3] += e[3] + t[3];
i[2] += i[3] >>> 16;
i[3] &= 65535;
i[2] += e[2] + t[2];
i[1] += i[2] >>> 16;
i[2] &= 65535;
i[1] += e[1] + t[1];
i[0] += i[1] >>> 16;
i[1] &= 65535;
i[0] += e[0] + t[0];
i[0] &= 65535;
return [ i[0] << 16 | i[1], i[2] << 16 | i[3] ];
},
x64Multiply: function(e, t) {
e = [ e[0] >>> 16, 65535 & e[0], e[1] >>> 16, 65535 & e[1] ];
t = [ t[0] >>> 16, 65535 & t[0], t[1] >>> 16, 65535 & t[1] ];
var i = [ 0, 0, 0, 0 ];
i[3] += e[3] * t[3];
i[2] += i[3] >>> 16;
i[3] &= 65535;
i[2] += e[2] * t[3];
i[1] += i[2] >>> 16;
i[2] &= 65535;
i[2] += e[3] * t[2];
i[1] += i[2] >>> 16;
i[2] &= 65535;
i[1] += e[1] * t[3];
i[0] += i[1] >>> 16;
i[1] &= 65535;
i[1] += e[2] * t[2];
i[0] += i[1] >>> 16;
i[1] &= 65535;
i[1] += e[3] * t[1];
i[0] += i[1] >>> 16;
i[1] &= 65535;
i[0] += e[0] * t[3] + e[1] * t[2] + e[2] * t[1] + e[3] * t[0];
i[0] &= 65535;
return [ i[0] << 16 | i[1], i[2] << 16 | i[3] ];
},
x64Rotl: function(e, t) {
if (32 === (t %= 64)) return [ e[1], e[0] ];
if (t < 32) return [ e[0] << t | e[1] >>> 32 - t, e[1] << t | e[0] >>> 32 - t ];
t -= 32;
return [ e[1] << t | e[0] >>> 32 - t, e[0] << t | e[1] >>> 32 - t ];
},
x64LeftShift: function(e, t) {
return 0 === (t %= 64) ? e : t < 32 ? [ e[0] << t | e[1] >>> 32 - t, e[1] << t ] : [ e[1] << t - 32, 0 ];
},
x64Xor: function(e, t) {
return [ e[0] ^ t[0], e[1] ^ t[1] ];
},
x64Fmix: function(e) {
e = this.x64Xor(e, [ 0, e[0] >>> 1 ]);
e = this.x64Multiply(e, [ 4283543511, 3981806797 ]);
e = this.x64Xor(e, [ 0, e[0] >>> 1 ]);
e = this.x64Multiply(e, [ 3301882366, 444984403 ]);
return e = this.x64Xor(e, [ 0, e[0] >>> 1 ]);
},
x64hash128: function(e, t) {
t = t || 0;
for (var i = (e = e || "").length % 16, a = e.length - i, r = [ 0, t ], n = [ 0, t ], o = [ 0, 0 ], s = [ 0, 0 ], l = [ 2277735313, 289559509 ], h = [ 1291169091, 658871167 ], u = 0; u < a; u += 16) {
o = [ 255 & e.charCodeAt(u + 4) | (255 & e.charCodeAt(u + 5)) << 8 | (255 & e.charCodeAt(u + 6)) << 16 | (255 & e.charCodeAt(u + 7)) << 24, 255 & e.charCodeAt(u) | (255 & e.charCodeAt(u + 1)) << 8 | (255 & e.charCodeAt(u + 2)) << 16 | (255 & e.charCodeAt(u + 3)) << 24 ];
s = [ 255 & e.charCodeAt(u + 12) | (255 & e.charCodeAt(u + 13)) << 8 | (255 & e.charCodeAt(u + 14)) << 16 | (255 & e.charCodeAt(u + 15)) << 24, 255 & e.charCodeAt(u + 8) | (255 & e.charCodeAt(u + 9)) << 8 | (255 & e.charCodeAt(u + 10)) << 16 | (255 & e.charCodeAt(u + 11)) << 24 ];
o = this.x64Multiply(o, l);
o = this.x64Rotl(o, 31);
o = this.x64Multiply(o, h);
r = this.x64Xor(r, o);
r = this.x64Rotl(r, 27);
r = this.x64Add(r, n);
r = this.x64Add(this.x64Multiply(r, [ 0, 5 ]), [ 0, 1390208809 ]);
s = this.x64Multiply(s, h);
s = this.x64Rotl(s, 33);
s = this.x64Multiply(s, l);
n = this.x64Xor(n, s);
n = this.x64Rotl(n, 31);
n = this.x64Add(n, r);
n = this.x64Add(this.x64Multiply(n, [ 0, 5 ]), [ 0, 944331445 ]);
}
o = [ 0, 0 ];
s = [ 0, 0 ];
switch (i) {
case 15:
s = this.x64Xor(s, this.x64LeftShift([ 0, e.charCodeAt(u + 14) ], 48));

case 14:
s = this.x64Xor(s, this.x64LeftShift([ 0, e.charCodeAt(u + 13) ], 40));

case 13:
s = this.x64Xor(s, this.x64LeftShift([ 0, e.charCodeAt(u + 12) ], 32));

case 12:
s = this.x64Xor(s, this.x64LeftShift([ 0, e.charCodeAt(u + 11) ], 24));

case 11:
s = this.x64Xor(s, this.x64LeftShift([ 0, e.charCodeAt(u + 10) ], 16));

case 10:
s = this.x64Xor(s, this.x64LeftShift([ 0, e.charCodeAt(u + 9) ], 8));

case 9:
s = this.x64Xor(s, [ 0, e.charCodeAt(u + 8) ]);
s = this.x64Multiply(s, h);
s = this.x64Rotl(s, 33);
s = this.x64Multiply(s, l);
n = this.x64Xor(n, s);

case 8:
o = this.x64Xor(o, this.x64LeftShift([ 0, e.charCodeAt(u + 7) ], 56));

case 7:
o = this.x64Xor(o, this.x64LeftShift([ 0, e.charCodeAt(u + 6) ], 48));

case 6:
o = this.x64Xor(o, this.x64LeftShift([ 0, e.charCodeAt(u + 5) ], 40));

case 5:
o = this.x64Xor(o, this.x64LeftShift([ 0, e.charCodeAt(u + 4) ], 32));

case 4:
o = this.x64Xor(o, this.x64LeftShift([ 0, e.charCodeAt(u + 3) ], 24));

case 3:
o = this.x64Xor(o, this.x64LeftShift([ 0, e.charCodeAt(u + 2) ], 16));

case 2:
o = this.x64Xor(o, this.x64LeftShift([ 0, e.charCodeAt(u + 1) ], 8));

case 1:
o = this.x64Xor(o, [ 0, e.charCodeAt(u) ]);
o = this.x64Multiply(o, l);
o = this.x64Rotl(o, 31);
o = this.x64Multiply(o, h);
r = this.x64Xor(r, o);
}
r = this.x64Xor(r, [ 0, e.length ]);
n = this.x64Xor(n, [ 0, e.length ]);
r = this.x64Add(r, n);
n = this.x64Add(n, r);
r = this.x64Fmix(r);
n = this.x64Fmix(n);
r = this.x64Add(r, n);
n = this.x64Add(n, r);
return ("00000000" + (r[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (r[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (n[1] >>> 0).toString(16)).slice(-8);
}
};
t.VERSION = "1.5.1";
return t;
});