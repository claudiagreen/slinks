angular
  .module('slinksApp')
  .service('SlinksService', ['$http', 'SlinkFactory', function($http, SlinkFactory) {

    var self = this;

    var KEY_ARRAY = ["previous", "previous_2", "next", "next_2"];

    self.getSlinks = function() {  //rename Slinks at this level?
      return $http.get('/slinks')
        .then(_getArrayOfSlinkObjects);
    };
    //
    function _getArrayOfSlinkObjects(allMessageData){
      return allMessageData.data.messages.matches.map(extractMessagesFromMatches)
        // .map(flattenArrays)
          .map(filterForLinks);
        //     .map(linkToSlinkObject);
    }

    function extractMessagesFromMatches(matchesObject) {
      var nestedArray = [matchesObject.text];
      KEY_ARRAY.forEach(function getText(key){
        if(matchesObject[key] !== undefined) {
          nestedArray.push(matchesObject[key].text);
        }
      });
      return nestedArray;
    }

    function filterForLinks(theArray) {
      var justLinks = [];
      theArray.forEach(function(link) {
        var regexedLink = link.match(/<.+>/)[0].slice(1,-1);
        justLinks.push(regexedLink);
      });
      return justLinks;
    }


    //   function lookAtNestedObjects(message){
    //     var arrayOfAllLinks = [];
    //     KEY_ARRAY.forEach(checkNeighbourMessageForHttp);
    //     return arrayOfAllLinks;
    //
    //     function checkNeighbourMessageForHttp(text, index){
    //       if(!!message[text]){
    //         isALink(text);
    //       }
    //       return arrayOfAllLinks;
    //     }
    //
    //     function isALink(item){
    //       var slink = isNotNested(item) || isNestedHashALink(item);
    //       if(!!slink){
    //         arrayOfAllLinks.push(slink);
    //       }
    //     }
    //
    //     function isNestedHashALink(linkObject){
    //       if(message[linkObject].text.includes("http")){
    //         var link = saveOnlyLinkAddress(message[linkObject].text);
    //         return (new SlinkFactory(link));
    //       }
    //     }
    //
    //     function isNotNested(linkObject){
    //       if(linkObject === "text"){
    //         var link = saveOnlyLinkAddress(message[linkObject]);
    //         return (new SlinkFactory(link));
    //       }
    //     }
    //
    //
    //   }
    //
    //
    //
    // }
    // function saveOnlyLinkAddress(linkText){
    //       return linkText.match(/<.+>/)[0].slice(1,-1);


  }]);
