(this["webpackJsonpmachi-koro"]=this["webpackJsonpmachi-koro"]||[]).push([[0],{46:function(e,t,n){e.exports=n(87)},51:function(e,t,n){},80:function(e,t){},87:function(e,t,n){"use strict";n.r(t);var a,r,o=n(0),c=n.n(o),l=n(43),i=n.n(l),u=(n(51),n(2)),s=n(25),m=n(1),d=function(e){var t=e.title,n=e.color,a=e.industry,r=e.activationNum,o=e.cost,l=e.description,i="establishment".concat(n);return c.a.createElement("div",{className:i},c.a.createElement("div",null,c.a.createElement("b",null,t)),c.a.createElement("div",null,"Industry: ",a),c.a.createElement("div",null,r.length>1?"Activation numbers: "+r[0]+"-"+r[1]:"Activation number: "+r[0]),c.a.createElement("div",null,"Cost: ",o),c.a.createElement("div",null,l))},h="!!!NULL!!!",y="Wheat",f="Cow",p="Bread",v="Cup",b="Gear",E="Tower",g="Factory",C="Fruit",O="Red",k="Blue",P="Green",j="Purple",S="Wheat Field",T="Ranch",w="Bakery",N="Cafe",F="Convenience Store",I="Forest",B="Stadium",R="TV Station",D="Business Center",M="Cheese Factory",G="Furniture Factory",x="Mine",A="Family Restaurant",V="Apple Orchard",W="Farmers Market",Y=1,H=1,L=1,J=2,K=2,U=3,$=6,q=7,z=8,Q=5,X=3,Z=6,_=3,ee=3,te=2,ne={wheatField:[1],ranch:[2],bakery:[2,3],cafe:[3],convenienceStore:[4],forest:[5],stadium:[6],tvStation:[6],businessCenter:[6],cheeseFactory:[7],furnitureFactory:[8],mine:[9],familyRestaurant:[9,10],appleOrchard:[10],farmersMarket:[11,12]},ae=function(e,t){switch(t.color){case k:return re(e,t);case P:return oe(e,t);case O:return ce(e,t);case j:return le(e,t);default:return e}},re=function(e,t){return e.playerCoins[e.owner]+=de(t,e.shoppingMallComplete),e},oe=function(e,t){return e.activePlayer===e.owner&&(e.playerCoins[e.owner]+=de(t,e.shoppingMallComplete,e)),e},ce=function(e,t){return e.activePlayer!==e.owner&&me(e,t,e.activePlayer),e},le=function(e,t){if(e.activePlayer===e.owner)switch(t){case ye.stadium:return ie(e,t);case ye.tvStation:return ue(e);case ye.businessCenter:return se(e);default:return null}return e},ie=function(e,t){return Object.entries(e.playerCoins).forEach((function(n){var a=n[0];a!==e.owner&&(e=me(e,t,a))})),e},ue=function(e){return e.turnPhase=Re.choosePlayerToStealCoinsFrom,e},se=function(e){return e.turnPhase=Re.chooseEstablishmentToSteal,e},me=function(e,t,n){var a=Math.min(de(t,e.shoppingMallComplete),e.playerCoins[n]);return e.playerCoins[n]-=a,e.playerCoins[e.owner]+=a,e},de=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return e.revenue*he(e,n)+(e.industry!==p&&e.industry!==v||!t?0:1)},he=function(e,t){return t!=={}&&e.dependingIndustry!==h?t.playerEstablishments[t.owner].filter((function(t){return t.industry===e.dependingIndustry})).length:1},ye={wheatField:{name:S,activationNum:ne.wheatField,cost:Y,industry:y,color:k,revenue:1,dependingIndustry:h,sortOrder:0,render:c.a.createElement(d,{title:S,activationNum:ne.wheatField,color:k,industry:y,cost:Y,description:"Get 1 coin from the bank. (anyone's turn)"})},ranch:{name:T,activationNum:ne.ranch,cost:H,industry:f,color:k,revenue:1,dependingIndustry:h,sortOrder:1,render:c.a.createElement(d,{title:T,activationNum:ne.ranch,color:k,industry:f,cost:H,description:"Get 1 coin from the bank. (anyone's turn)"})},bakery:{name:w,activationNum:ne.bakery,cost:L,industry:p,color:P,revenue:1,dependingIndustry:h,sortOrder:2,render:c.a.createElement(d,{title:w,activationNum:ne.bakery,color:P,industry:p,cost:L,description:"Get 1 coin from the bank. (your turn only)"})},cafe:{name:N,activationNum:ne.cafe,cost:J,industry:v,color:O,revenue:1,dependingIndustry:h,sortOrder:3,render:c.a.createElement(d,{activationNum:ne.cafe,title:N,color:O,industry:v,cost:J,description:"Take 1 coin from the active player. (opponent's turn)"})},convenienceStore:{name:F,activationNum:ne.convenienceStore,cost:K,industry:p,color:P,revenue:3,dependingIndustry:h,sortOrder:4,render:c.a.createElement(d,{activationNum:ne.convenienceStore,title:F,color:P,industry:p,cost:K,description:"Get 3 coins from the bank. (your turn only)"})},forest:{name:I,activationNum:ne.forest,cost:U,industry:b,color:k,revenue:3,dependingIndustry:h,sortOrder:5,render:c.a.createElement(d,{activationNum:ne.forest,title:I,color:k,industry:b,cost:U,description:"Get 1 coin from the bank. (anyone's turn)"})},stadium:{name:B,activationNum:ne.stadium,cost:$,industry:E,color:j,revenue:2,dependingIndustry:h,sortOrder:6,render:c.a.createElement(d,{activationNum:ne.stadium,title:B,color:j,industry:E,cost:$,description:"Get 2 coins from all players. (your turn only)"})},tvStation:{name:R,activationNum:ne.tvStation,cost:q,industry:E,color:j,revenue:5,dependingIndustry:h,sortOrder:7,render:c.a.createElement(d,{activationNum:ne.tvStation,title:R,color:j,industry:E,cost:q,description:"Take 5 coins from any one player. (your turn only)"})},businessCenter:{name:D,activationNum:ne.businessCenter,cost:z,industry:E,color:j,revenue:0,dependingIndustry:h,sortOrder:8,render:c.a.createElement(d,{activationNum:ne.businessCenter,title:D,color:j,industry:E,cost:z,description:"Trade one non-".concat(E," establishment with another player. (your turn only)")})},cheeseFactory:{name:M,activationNum:ne.cheeseFactory,cost:Q,industry:g,color:P,revenue:3,dependingIndustry:f,sortOrder:9,render:c.a.createElement(d,{activationNum:ne.cheeseFactory,title:M,color:P,industry:g,cost:Q,description:"Get 3 coins from the bank for each ".concat(f," establishment that you own. (your turn only)")})},furnitureFactory:{name:G,activationNum:ne.furnitureFactory,cost:X,industry:g,color:P,revenue:3,dependingIndustry:b,sortOrder:10,render:c.a.createElement(d,{activationNum:ne.furnitureFactory,title:G,color:P,industry:g,cost:X,description:"Get 3 coins from the bank for each ".concat(b," establishment that you own. (your turn only)")})},mine:{name:x,activationNum:ne.mine,cost:Z,industry:b,color:k,revenue:5,dependingIndustry:h,sortOrder:11,render:c.a.createElement(d,{activationNum:ne.mine,title:x,color:k,industry:b,cost:Z,description:"Get 5 coins from the bank. (anyone's turn)"})},familyRestaurant:{name:A,activationNum:ne.familyRestaurant,cost:_,industry:v,color:O,revenue:2,dependingIndustry:h,sortOrder:12,render:c.a.createElement(d,{activationNum:ne.familyRestaurant,title:A,color:O,industry:v,cost:_,description:"Take 2 coins from the active player. (opponent's turn)"})},appleOrchard:{name:V,activationNum:ne.appleOrchard,cost:ee,industry:y,color:k,revenue:3,dependingIndustry:h,sortOrder:13,render:c.a.createElement(d,{activationNum:ne.appleOrchard,title:V,color:k,industry:y,cost:ee,description:"Get 3 coins from the bank. (anyone's turn)"})},farmersMarket:{name:W,activationNum:ne.farmersMarket,cost:te,industry:C,color:P,revenue:2,dependingIndustry:y,sortOrder:14,render:c.a.createElement(d,{activationNum:ne.farmersMarket,title:W,color:P,industry:C,cost:te,description:"Get 2 coins from the bank for each ".concat(y," establishment that you own. (your turn only)")})}},fe=(a={},Object(m.a)(a,ye.wheatField.name,ye.wheatField),Object(m.a)(a,ye.ranch.name,ye.ranch),Object(m.a)(a,ye.bakery.name,ye.bakery),Object(m.a)(a,ye.cafe.name,ye.cafe),Object(m.a)(a,ye.convenienceStore.name,ye.convenienceStore),Object(m.a)(a,ye.forest.name,ye.forest),Object(m.a)(a,ye.stadium.name,ye.stadium),Object(m.a)(a,ye.tvStation.name,ye.tvStation),Object(m.a)(a,ye.businessCenter.name,ye.businessCenter),Object(m.a)(a,ye.cheeseFactory.name,ye.cheeseFactory),Object(m.a)(a,ye.furnitureFactory.name,ye.furnitureFactory),Object(m.a)(a,ye.mine.name,ye.mine),Object(m.a)(a,ye.familyRestaurant.name,ye.familyRestaurant),Object(m.a)(a,ye.appleOrchard.name,ye.appleOrchard),Object(m.a)(a,ye.farmersMarket.name,ye.farmersMarket),a),pe=[ye.wheatField,ye.ranch,ye.bakery,ye.cafe,ye.convenienceStore,ye.forest,ye.stadium,ye.tvStation,ye.businessCenter,ye.cheeseFactory,ye.furnitureFactory,ye.mine,ye.familyRestaurant,ye.appleOrchard,ye.farmersMarket],ve=(r={},Object(m.a)(r,ye.wheatField.name,10),Object(m.a)(r,ye.ranch.name,6),Object(m.a)(r,ye.bakery.name,9),Object(m.a)(r,ye.cafe.name,5),Object(m.a)(r,ye.convenienceStore.name,6),Object(m.a)(r,ye.forest.name,6),Object(m.a)(r,ye.stadium.name,4),Object(m.a)(r,ye.tvStation.name,4),Object(m.a)(r,ye.businessCenter.name,4),Object(m.a)(r,ye.cheeseFactory.name,6),Object(m.a)(r,ye.furnitureFactory.name,6),Object(m.a)(r,ye.mine.name,6),Object(m.a)(r,ye.familyRestaurant.name,6),Object(m.a)(r,ye.appleOrchard.name,6),Object(m.a)(r,ye.farmersMarket.name,6),r),be=function(e){return parseInt(e)+1},Ee=function(e,t){return Array.from(Array(Math.ceil(e.length/t)),(function(n,a){return e.slice(a*t,a*t+t)}))},ge=function(e){var t=e.thisPlayersTurn,n=e.activePlayerCoinCount,a=e.playerEstablishments,r=e.turnPhase,o=e.onBuyButtonClick,l={};return Object.keys(ve).forEach((function(e){return l[e]=ve[e]})),a.forEach((function(e){e.forEach((function(e){l[e.name]--}))})),c.a.createElement(c.a.Fragment,null,Ee(pe,5).map((function(e,a){return c.a.createElement("div",{key:a,className:"row"},e.map((function(e,a){return c.a.createElement("div",{key:a,className:"column"},e.render,c.a.createElement("div",null,"Count: ",l[e.name]),c.a.createElement("button",{disabled:r!==Re.construction||n<e.cost||l[e.name]<=0||!t,onClick:function(){return o(e)}},"Buy ",e.name))})))})))},Ce=function(e){var t=e.thisPlayersTurn,n=e.diceCount,a=e.setDiceCount,r=e.onDiceRoll,o=e.trainStationActivated,l=e.firstDieValue,i=e.secondDieValue,s=e.currentPhase,m=function(){return 1+Math.floor(6*Math.random())};return c.a.createElement(c.a.Fragment,null,c.a.createElement("h3",null,"Dice"),c.a.createElement("input",{id:"dice1",type:"radio",value:1,checked:1===n,disabled:s!==Re.rollDice||!t,onChange:function(){return a(1)}}),"1",c.a.createElement("input",{id:"dice2",type:"radio",value:2,checked:1!==n,disabled:s!==Re.rollDice||!o||!t,onChange:function(){return a(2)}}),"2",c.a.createElement("div",null,"You rolled:"," ",0===i?l:"".concat(l," + ").concat(i," = ").concat(l+i)),c.a.createElement("button",{disabled:s!==Re.rollDice||!t,onClick:function(){var e=function(e){var t=m();return e?[t,m()]:[t,0]}(2===n),t=Object(u.a)(e,2),a=t[0],o=t[1];r(a,o)}},"Roll"))},Oe=function(e){var t=e.thisPlayersTurn,n=e.allPlayerCoins,a=e.allPlayerEstablishments,r=e.activePlayer,l=e.currentTurnPhase,i=e.endTurn,s=e.repeatingTurn,m=e.onAcceptReroll,d=e.onDeclineReroll,h=e.onStealeeChosen,y=e.onEstablishmentsToTradeChosen,f=Object(o.useState)([-1,ye.wheatField]),p=Object(u.a)(f,2),v=p[0],b=p[1],g=Object(o.useState)([-1,ye.wheatField]),C=Object(u.a)(g,2),O=C[0],k=C[1],P={};P[Re.rollDice]="Roll, ya slowpoke!",P[Re.decideToReroll]="Since you've completed the radio tower, you may re-roll the dice once this turn.",P[Re.earnIncome]="Dispersing income...",P[Re.choosePlayerToStealCoinsFrom]="TV Station activated! Choose a poor soul to steal ".concat(ye.tvStation.revenue," coins from:"),P[Re.chooseEstablishmentToSteal]="Business Center activated! Choose an establishment you own to swap with another player:",P[Re.construction]="Purchase an establishment or landmark (if you want).";var j=l===Re.decideToReroll,S=l===Re.construction&&t,T=l===Re.construction&&s,w=l===Re.choosePlayerToStealCoinsFrom&&t,N=l===Re.chooseEstablishmentToSteal&&t,F=P[l],I={};a.forEach((function(e,t){I[t]={},e.forEach((function(e){return I[t][e.name]=0})),e.forEach((function(e){return I[t][e.name]++}))}));var B=function(e){var t=e.target.value.split(":"),n=parseInt(t[0]),a=t[1];k([n,fe[a]])},R=function(e){var t=e.target.value.split(":")[1];b([r,fe[t]])},D=function(e){return Ee(Object.entries(I[e]),4).map((function(t,n){return c.a.createElement("div",{key:n},t.map((function(t){var n=t[0],a=t[1],o=fe[n],l=e===r?o===v[1]:e===O[0]&&o===O[1];return a>0&&o.industry!==E?c.a.createElement("div",{key:n,className:"row"},c.a.createElement("input",{id:n,type:"radio",value:e+":"+n,checked:l,onChange:r===e?R:B}),n,c.a.createElement("div",{className:"row"},"Count: ",a)):null})))}))};return c.a.createElement(c.a.Fragment,null,c.a.createElement("h2",null,"Player ",be(r),"'s turn"),c.a.createElement("h3",null,F),w&&c.a.createElement("div",{className:"row"},n.map((function(e,t){return t!==r?c.a.createElement("div",{className:"column",key:t},"Player ",be(t),c.a.createElement("button",{onClick:function(){return h(t)}},"Steal")):null}))),N&&c.a.createElement(c.a.Fragment,null,c.a.createElement("h3",null,"Your establishments"),D(r),n.map((function(e,t){return t!==r?c.a.createElement("div",{key:t},c.a.createElement("h3",null,"Player ",be(t),"'s establishments"),D(t)):null})),c.a.createElement("button",{onClick:function(){return y(v[1],O[1],O[0])},disabled:O[0]<0},"Trade")),j&&c.a.createElement(c.a.Fragment,null,c.a.createElement("h3",null,"Would you like to re-roll the dice?"),c.a.createElement("button",{onClick:m},"Yes"),c.a.createElement("button",{onClick:d},"No")),T&&c.a.createElement("h3",null,"Well done! You rolled doubles, so you get to take another turn after this one!"),S&&c.a.createElement("button",{onClick:function(){return i()}},"Skip"))},ke=function(e){var t=e.thisPlayersTurn,n=e.landmarksCompleted,a=e.playerIndex,r=e.landmark,o=e.onBuyButtonClick,l=e.activePlayer,i=e.currentPhase,u=e.coins,s=n[a].includes(r);return c.a.createElement(c.a.Fragment,null,r.render,c.a.createElement("div",null,"Completed: ",s?"yes":"no"),c.a.createElement("button",{onClick:function(){return o(r)},disabled:a!==l||s||i!==Re.construction||u<r.cost||!t},"Buy ",r.name))},Pe=function(e){var t=e.title,n=e.cost,a=e.description;return c.a.createElement("div",{className:"landmark"},c.a.createElement("div",null,c.a.createElement("b",null,t)),c.a.createElement("div",null,"Cost: ",n),c.a.createElement("div",null,a))},je={trainStation:{name:"Train Station",cost:4,render:c.a.createElement(Pe,{title:"Train Station",cost:4,description:"You may roll 1 or 2 dice."})},shoppingMall:{name:"Shopping Mall",cost:10,render:c.a.createElement(Pe,{title:"Shopping Mall",cost:10,description:"Each of your bread and cup establishments earn +1 coin."})},amusementPark:{name:"Amusement Park",cost:16,render:c.a.createElement(Pe,{title:"Amusement Park",cost:16,description:"If you roll doubles, take another turn after this one."})},radioTower:{name:"Radio Tower",cost:22,render:c.a.createElement(Pe,{title:"Radio Tower",cost:22,description:"Once every turn, you can choose to re-roll your dice."})}},Se=function(e){var t=e.thisPlayersTurn,n=e.playerIndex,a=e.activePlayer,r=e.landmarksCompleted,o=e.currentPhase,l=e.coins,i=e.onBuyButtonClick;return c.a.createElement(c.a.Fragment,null,c.a.createElement("h3",null,"Your Landmarks"),c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"column"},c.a.createElement(ke,{playerIndex:n,activePlayer:a,landmark:je.trainStation,landmarksCompleted:r,currentPhase:o,coins:l,onBuyButtonClick:i,thisPlayersTurn:t})),c.a.createElement("div",{className:"column"},c.a.createElement(ke,{playerIndex:n,activePlayer:a,landmark:je.shoppingMall,landmarksCompleted:r,currentPhase:o,coins:l,onBuyButtonClick:i,thisPlayersTurn:t})),c.a.createElement("div",{className:"column"},c.a.createElement(ke,{playerIndex:n,activePlayer:a,landmark:je.amusementPark,landmarksCompleted:r,currentPhase:o,coins:l,onBuyButtonClick:i,thisPlayersTurn:t})),c.a.createElement("div",{className:"column"},c.a.createElement(ke,{playerIndex:n,activePlayer:a,landmark:je.radioTower,landmarksCompleted:r,currentPhase:o,coins:l,onBuyButtonClick:i,thisPlayersTurn:t}))))},Te=function(e){var t=e.thisPlayersTurn,n=e.playerIndex,a=e.establishments,r=e.allPlayerCoins,o=e.activePlayer,l=e.landmarksCompleted,i=e.currentPhase,u=e.coins,s=e.onBuyButtonClick;a.sort((function(e,t){return e.sortOrder-t.sortOrder}));var m={};return a.forEach((function(e){return m[e.name]=0})),a.forEach((function(e){return m[e.name]++})),c.a.createElement(c.a.Fragment,null,c.a.createElement("h2",null,"Player ",be(n)),c.a.createElement("div",null,"Coins: ",r[n]),c.a.createElement(Se,{playerIndex:n,activePlayer:o,landmarksCompleted:l,currentPhase:i,coins:u,onBuyButtonClick:s,thisPlayersTurn:t}),c.a.createElement("h3",null,"Your Establishments"),Ee(Object.entries(m),3).map((function(e,t){return c.a.createElement("div",{key:t,className:"row"},e.map((function(e){var t=e[0],n=e[1];return console.log("establishment name = ".concat(t,", count = ").concat(n)),void 0===fe[t]&&console.log("".concat(t," lookup is undefined! Crash incoming, hit the deck!")),n>0?c.a.createElement("div",{key:t,className:"column"},fe[t].render,c.a.createElement("div",null,"Count: ",n)):null})))})))},we=n(44),Ne=n.n(we)()("http://localhost:".concat(2e3)),Fe=function(e){Ne.emit("game state changed",e)},Ie=function(){Ne.off("game room launched")},Be=function(){Ne.off("game state changed")},Re={rollDice:0,decideToReroll:1,earnIncome:2,construction:3,choosePlayerToStealCoinsFrom:4,chooseEstablishmentToSteal:5},De=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];Object.entries(e).forEach((function(e){var n=e[0],a=e[1];console.log("changing ".concat(n," to ").concat(a));var r=t[n];void 0!==r&&(r(a),console.log("".concat(n," changed")))})),n&&Fe(e)},Me=function(e){var t=e.thisPlayerIndex,n=e.playerCount,a=e.endGame,r=Object(o.useState)(0),l=Object(u.a)(r,2),i=l[0],m=l[1],d=Object(o.useState)(1),h=Object(u.a)(d,2),y=h[0],f=h[1],p=Object(o.useState)(0),v=Object(u.a)(p,2),b=v[0],E=v[1],g=Object(o.useState)(Re.rollDice),C=Object(u.a)(g,2),S=C[0],T=C[1],w=Object(o.useState)(Array(n).fill(3)),N=Object(u.a)(w,2),F=N[0],I=N[1],B=Object(o.useState)(1),R=Object(u.a)(B,2),D=R[0],M=R[1],G=Object(o.useState)(!1),x=Object(u.a)(G,2),A=x[0],V=x[1],W=Object(o.useState)(!0),Y=Object(u.a)(W,2),H=Y[0],L=Y[1],J=Object(o.useState)(Array(n).fill([ye.wheatField,ye.bakery])),K=Object(u.a)(J,2),U=K[0],$=K[1],q=Object(o.useState)(Array(n).fill([])),z=Object(u.a)(q,2),Q=z[0],X=z[1],Z=Object(o.useState)([]),_=Object(u.a)(Z,2),ee=_[0],te=_[1];Object(o.useEffect)((function(){var e;return e=function(e){De(e,ne,!1)},Ne.on("game state changed",(function(t){return e(t)})),Be}));var ne={};ne.activePlayer=m,ne.firstDieValue=f,ne.secondDieValue=E,ne.turnPhase=T,ne.playerCoins=I,ne.diceCount=M,ne.repeatingTurn=V,ne.activePlayerHasNotRerolledThisTurn=L,ne.playerEstablishments=$,ne.landmarksCompleted=X,ne.activatedEstablishments=te;var re=282-F.reduce((function(e,t){return e+t})),oe=Q[i].includes(je.radioTower),ce=Q[i].includes(je.shoppingMall),le=t===i,ie=function(e){var t=ue(e);return se({playerCoins:F,playerEstablishments:U,turnPhase:Re.construction},t)},ue=function(e){var t=[],n={};return n[O]=[],n[k]=[],n[P]=[],n[j]=[],U.forEach((function(t,a){return t.filter((function(t){return t.activationNum.includes(e)})).forEach((function(e){n[e.color].push({establishment:e,owner:a})}))})),t=(t=(t=(t=t.concat(n[j])).concat(n[P])).concat(n[k])).concat(n[O])},se=function(e,t){for(;t.length>0&&e.turnPhase===Re.construction;){var n=t.pop();e=ae({activePlayer:i,owner:n.owner,playerEstablishments:e.playerEstablishments,playerCoins:e.playerCoins,shoppingMallComplete:ce,turnPhase:Re.construction,activatedEstablishments:t},n.establishment)}return e},de=function(){var e=i+1===F.length?0:i+1;A&&(e=i),De({diceCount:1,activePlayer:e,repeatingTurn:!1,activePlayerHasNotRerolledThisTurn:!0,turnPhase:Re.rollDice},ne)},he=function(e,t,n,a){e[a].push(n);var r=e[a].findIndex((function(e){return e.name===t.name}));return e[a].splice(r,1),e};return c.a.createElement("div",null,c.a.createElement("h1",null,"You are player ",be(t)),c.a.createElement("h2",null,"Bank"),c.a.createElement("div",null,"Coins: ",re),c.a.createElement(ge,{thisPlayersTurn:le,activePlayerCoinCount:F[i],playerEstablishments:U,turnPhase:S,onBuyButtonClick:function(e){!function(e){U[i]=[].concat(Object(s.a)(U[i]),[e]),F[i]-=e.cost,De({playerEstablishments:U,playerCoins:F},ne)}(e),de()}}),c.a.createElement(Oe,{thisPlayersTurn:le,allPlayerCoins:F,allPlayerEstablishments:U,activePlayer:i,currentTurnPhase:S,endTurn:de,repeatingTurn:A,onAcceptReroll:function(){De({turnPhase:Re.rollDice,repeatingTurn:!1,activePlayerHasNotRerolledThisTurn:!1},ne)},onDeclineReroll:function(){ie(y+b)},onStealeeChosen:function(e){var t=me({shoppingMallComplete:ce,playerEstablishments:U,playerCoins:F,owner:i,turnPhase:Re.construction},ye.tvStation,e);se(t,ee)},onEstablishmentsToTradeChosen:function(e,t,n){var a={shoppingMallComplete:ce,playerCoins:F,owner:i,turnPhase:Re.construction};a.playerEstablishments=he(U,e,t,i),a.playerEstablishments=he(a.playerEstablishments,t,e,n),se(a,ee)}}),c.a.createElement(Ce,{thisPlayersTurn:le,diceCount:D,setDiceCount:M,firstDieValue:y,secondDieValue:b,onDiceRoll:function(e,t){var n=!1;if(Q[i].includes(je.amusementPark)&&e===t&&(n=!0),oe&&H)De({turnPhase:Re.decideToReroll,repeatingTurn:n,firstDieValue:e,secondDieValue:t},ne);else{var a=ie(e+t);De({turnPhase:a.turnPhase,repeatingTurn:n,firstDieValue:e,secondDieValue:t,playerEstablishments:a.playerEstablishments,activatedEstablishments:a.activatedEstablishments,playerCoins:a.playerCoins},ne)}},trainStationActivated:Q[i].includes(je.trainStation),currentPhase:S}),c.a.createElement("div",{className:"row"},F.map((function(e,t){return c.a.createElement("div",{key:t,className:"playerColumn"},c.a.createElement(Te,{thisPlayersTurn:le,playerIndex:t,activePlayer:i,coins:e,allPlayerCoins:F,establishments:U[t],landmarksCompleted:Q,currentPhase:S,onBuyButtonClick:function(e){!function(e){Q[i]=[].concat(Object(s.a)(Q[i]),[e]),Q[i].length>=4?a(i):(F[i]-=e.cost,De({landmarksCompleted:Q,playerCoins:F},ne))}(e),de()},activePlayerHasNotRerolledThisTurn:H}))}))))},Ge=n(3),xe=n(7),Ae=function(){var e=Object(Ge.h)().roomId,t=Object(o.useState)(-1),n=Object(u.a)(t,2),a=n[0],r=n[1],l=Object(o.useState)(0),i=Object(u.a)(l,2),s=i[0],m=i[1],d=Object(o.useState)(!1),h=Object(u.a)(d,2),y=h[0],f=h[1],p=Object(o.useState)(!1),v=Object(u.a)(p,2),b=v[0],E=v[1],g=Object(o.useState)(!1),C=Object(u.a)(g,2),O=C[0],k=C[1],P=Object(o.useState)(0),j=Object(u.a)(P,2),S=j[0],T=j[1];Object(o.useEffect)((function(){var t;return t=function(e,t){k(!0),T(e),E(t),console.log("game room join success: playerCount === ",e)},Ne.on("game room join success",(function(e,n){return t(e,n)})),function(e){Ne.on("game room join failed",e)}((function(){f(!0),console.log("game room join failed")})),function(e){Ne.on("change in game room players",(function(t){return e(t)}))}((function(e){T(e),console.log("change in game room player count: playerCount === ",e)})),function(e){Ne.on("game started",(function(t){var n=t.findIndex((function(e){return e===Ne.id}));e(n)}))}((function(e){E(!0),m(e)})),O||(console.log("joining game room"),function(e){Ne.emit("join game room",e)}(e)),function(){Ne.off("game room join success"),Ne.off("game room join failed"),Ne.off("change in game room players"),Ne.off("game started")}}));var w=a>=0;return y?c.a.createElement(Ge.a,{to:"/not-found"}):b?c.a.createElement(Me,{thisPlayerIndex:s,playerCount:S,endGame:function(e){E(!1),r(e)}}):c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",null,w?"Player ".concat(be(a)," wins"):"Welcome to your game room!"),c.a.createElement("h2",null,"Share your game room ID with your friends: ",e),c.a.createElement("div",null,"Player count: ",S),S<2?c.a.createElement("h3",null,"Waiting for more players..."):c.a.createElement("div",null,c.a.createElement("h3",null,"Ready to start!",S<4?" Or you can keep waiting for more players (max 4)":""),c.a.createElement("button",{onClick:function(){console.log("currentPlayerCount: ",S),function(e){Ne.emit("start game",e)}(e)}},"Start Game")),c.a.createElement(xe.b,{to:"/home"},c.a.createElement("button",{className:"homeButton",onClick:function(){Ne.emit("leave game room")}},"Go to Home")))},Ve=function(){var e=Object(o.useState)(""),t=Object(u.a)(e,2),n=t[0],a=t[1];Object(o.useEffect)((function(){var e;return e=function(e){l(e)},Ne.on("game room launched",(function(t){return e(t)})),Ie}));var r=Object(Ge.g)(),l=function(e){console.log("launchGameRoom called"),console.log("joining room ".concat(e)),r.push("/game/".concat(e))};return c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",null,"Welcome to Machi Koro!"),c.a.createElement("h2",null,"Join Game"),c.a.createElement("input",{type:"text",value:n,onChange:function(e){console.log("onRoomIdChange called"),a(e.target.value)},placeholder:"Enter game ID..."}),c.a.createElement(xe.b,{to:"/game/".concat(n)},c.a.createElement("button",null,"Submit")),c.a.createElement("h2",null,"Create New Game"),c.a.createElement("button",{onClick:function(){Ne.emit("launch game room")}},"Launch Game Room"))},We=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement("h1",null,"Game not found"),c.a.createElement("h3",null,"Whoopsie doodle! Looks like that game doesn't exist."),c.a.createElement(xe.b,{to:"/"},"Back to Home"))},Ye=function(){return c.a.createElement(c.a.Fragment,null,c.a.createElement(xe.a,null,c.a.createElement("div",null,c.a.createElement(Ge.d,null,c.a.createElement(Ge.b,{path:"/not-found"},c.a.createElement(We,null)),c.a.createElement(Ge.b,{path:"/game/:roomId"},c.a.createElement(Ae,null)),c.a.createElement(Ge.b,{path:"/home"},c.a.createElement(Ve,null)),c.a.createElement(Ge.a,{to:"/home"})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(Ye,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[46,1,2]]]);
//# sourceMappingURL=main.1c301936.chunk.js.map