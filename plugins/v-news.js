function _0x4faf(){const _0x438c06=['📰\x20Latest\x20News\x20on\x20\x22','data','4512316PJsITm','🚫\x20An\x20error\x20occurred:\x20','\x22\x20📰\x0a\x0a','sendMessage','Get\x20the\x20latest\x20news\x20on\x20a\x20specific\x20topic.','forEach','https://newsapi.org/v2/everything?q=','\x22.\x20Try\x20a\x20different\x20topic.','9104557wApMMi','../command','slice','4321764AfhMUt','3028488kLUnVY','title','&sortBy=publishedAt&language=en&apiKey=','2591208SXfnOt','932714hmwdSQ','No\x20recent\x20news\x20found\x20for\x20\x22','get','toLocaleString','0f2c43ab11324578a7b1709651736382','axios','log','_Published:\x20','articles','_Read\x20more:\x20','_\x0a\x0a','2682210jVqqIo'];_0x4faf=function(){return _0x438c06;};return _0x4faf();}const _0x23befd=_0x522c;(function(_0x43760d,_0x59e7a9){const _0x7a70a6=_0x522c,_0x53336a=_0x43760d();while(!![]){try{const _0x12fd12=parseInt(_0x7a70a6(0x1a5))/0x1+-parseInt(_0x7a70a6(0x1a4))/0x2+parseInt(_0x7a70a6(0x1a0))/0x3+parseInt(_0x7a70a6(0x1b3))/0x4+-parseInt(_0x7a70a6(0x1b0))/0x5+parseInt(_0x7a70a6(0x1a1))/0x6+-parseInt(_0x7a70a6(0x1bb))/0x7;if(_0x12fd12===_0x59e7a9)break;else _0x53336a['push'](_0x53336a['shift']());}catch(_0x18e6ac){_0x53336a['push'](_0x53336a['shift']());}}}(_0x4faf,0xd53d8));function _0x522c(_0x167c1e,_0x5d83c0){const _0x4faf31=_0x4faf();return _0x522c=function(_0x522c05,_0x5d56f6){_0x522c05=_0x522c05-0x19e;let _0x5ba36b=_0x4faf31[_0x522c05];return _0x5ba36b;},_0x522c(_0x167c1e,_0x5d83c0);}const config=require('../config'),{cmd,commands}=require(_0x23befd(0x19e)),axios=require(_0x23befd(0x1aa));cmd({'pattern':'news','desc':_0x23befd(0x1b7),'react':'📰','category':'information','filename':__filename},async(_0x40cffb,_0x1250c5,_0x1bc64e,{from:_0x386a36,quoted:_0x29c113,body:_0x55fd19,isCmd:_0xacc961,command:_0x4dd52f,args:_0x508c85,q:_0x5e3d92,isGroup:_0x5622c0,sender:_0x5c7726,senderNumber:_0x2e1111,botNumber2:_0x4359f7,botNumber:_0x198085,pushname:_0xa68929,isMe:_0x273b52,isOwner:_0x48f5a9,groupMetadata:_0x5a8141,groupName:_0x17ba7d,participants:_0x3bedcd,groupAdmins:_0x6418d4,isBotAdmins:_0x436cb2,isAdmins:_0x3970a6,reply:_0x55e383})=>{const _0x2ad65a=_0x23befd;try{if(!_0x5e3d92)return _0x55e383('🚨\x20Please\x20provide\x20a\x20topic\x20to\x20search\x20news\x20for.\x20Usage:\x20.news\x20[topic]');const _0x5001a9=_0x2ad65a(0x1a9),_0x5ea441=encodeURIComponent(_0x5e3d92),_0x4c5181=_0x2ad65a(0x1b9)+_0x5ea441+_0x2ad65a(0x1a3)+_0x5001a9,_0x22ea2a=await axios[_0x2ad65a(0x1a7)](_0x4c5181),_0xe4b2f8=_0x22ea2a[_0x2ad65a(0x1b2)][_0x2ad65a(0x1ad)][_0x2ad65a(0x19f)](0x0,0x5);if(_0xe4b2f8['length']===0x0)return _0x55e383(_0x2ad65a(0x1a6)+_0x5e3d92+_0x2ad65a(0x1ba));let _0x305b03=_0x2ad65a(0x1b1)+_0x5e3d92+_0x2ad65a(0x1b5);_0xe4b2f8[_0x2ad65a(0x1b8)]((_0x1e70af,_0x56a495)=>{const _0x2ccfa2=_0x2ad65a;_0x305b03+=_0x56a495+0x1+'.\x20'+_0x1e70af[_0x2ccfa2(0x1a2)]+'\x0a',_0x305b03+='_'+_0x1e70af['description']+'\x0a_',_0x305b03+=_0x2ccfa2(0x1ae)+_0x1e70af['url']+'_\x0a',_0x305b03+=_0x2ccfa2(0x1ac)+new Date(_0x1e70af['publishedAt'])[_0x2ccfa2(0x1a8)]()+_0x2ccfa2(0x1af);}),_0x305b03+='>\x20Powered\x20by\x20NewsAPI.org\x0a>\x20BHASHI-MD',await _0x40cffb[_0x2ad65a(0x1b6)](_0x386a36,{'text':_0x305b03},{'quoted':_0x1250c5});}catch(_0x4f1ebe){console[_0x2ad65a(0x1ab)](_0x4f1ebe),_0x55e383(_0x2ad65a(0x1b4)+_0x4f1ebe['message']);}});
