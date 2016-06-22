const http = require('http');
const imgSave = require('./imgSave');
const crawPage = require('./crawPage');


const showData = function(matchData){
    for(let i in matchData){
      console.log(matchData[i]);
    }
};

const saveImgs = function(matchData,url){
    //console.log(matchData);
    let imgDir = decodeURI(url.substr(url.indexOf('.net/')+5)).replace('/','');
    for(let i in matchData){
      let imgUrl = matchData[i];
      let imgName = imgUrl.substr(imgUrl.lastIndexOf('/')+1);
      console.log("save img:" + imgName)
      imgSave(matchData[i], imgDir, imgName);
    }   
};

const crawImgPage = function(matchData) {
    //console.log(matchData);
    let imgRegex = "src=\"(http:\/\/.*?)\" data-recalc-dims";
    for(let i in matchData){
      crawPage(matchData[i],imgRegex,saveImgs);
    }
};

const crawList = function(url){
  //var url = process.argv[2];
  let listRegex = "class=\"post-title entry-title\">\\s+<a href=\"(.*?)\"";
  crawPage(url,listRegex,crawImgPage);
};

const batchCraw = function() {
  let urls = process.argv[2].split(',');
  let tUrls = [];
  urls.forEach((u)=>{
    tUrls.push(encodeURI("http://"+u+"/"));
  });
  //console.log(tUrls);
  crawImgPage(tUrls);  
};
//batchCraw();

 const url = process.argv[2];
 crawList(url);

/*
for(var i=5;i<11;i++){
   var url = process.argv[2];
   crawList(url+"page/"+i+"/");
}
*/

