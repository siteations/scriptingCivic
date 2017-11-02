# landscape svg demo

### Approx schedule  
* 30 min - case reviews  
* 10 min - intro & agenda  
* 5 min - github, clone, & walk thru of build demo  

## 10-15 min - svg editing & optimization  
[http://www.sarasoueidan.com/blog/svg-tips-for-designers/]  
  * layer mgmt      
  * path reduction  
  * visibility/export settings  
  * planning for additions - sorting, raster selections, effects
  * export workflow  
    
## 10-15 min - svg/jquery imports  
[http://tomgermeau.com/2014/02/how-designers-can-create-interactive-prototypes-with-illustrator/]   
[cross-origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)  
[scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types#Variable_scope)  
[asynch](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests)  
[promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)  
   * ajax & python -m SimpleHTTPServer to avoid cross domain issues  
   * defer, ajax, promises - dealing with asynchronicity and scope  
   * other general file features from index, js, or css layers  [fonts, for instance](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face)  
        *note multiple routes for reading/incorporating files*  
        
## 10-15 min - wading into jQuery & function programming (from experience with oop plug-ins)  
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions]  
[https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object-oriented_JS]  
[https://developer.mozilla.org/en-US/docs/Web/API/Document]  
[http://api.jquery.com/]
[http://getbootstrap.com/]  
   * familiar dot notion & call back structure, as seen [at mapbox](https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/) or [in d3](https://bl.ocks.org/mbostock/3885304)  
   * write a function to establish initial visibility of svg layers using basic jQuery selections & events  
   * write a function to fade on/off different layers based on click interactions using more advanced selection, array function expression, and conditional logic  

## 10-15 min - efficiency of functions: refactoring for 'data'   
   * json for layer management and DRY code  
   * establish different visibility for multiple drawing states as data, refactor and test visibility function  
        *further elaborations, using additional jQuery shortcuts*  
    * write a function to switch out background images in the svg and set to work with 2 layers minimum with attribute manipulation   
        *work in a team to psuedo code and then code a solution for below*  
    * write a function to add a hover fill to a sublayer selection (css and/or jQuery) with attribute manipulation and traversal  
    
## 10-15 min - adding interactivity: mask animations, interactive labels, click dom/modal manipulations   
   * we'll do one of the above and then split to solve the others, share and review as time allots  
    
## 10-15 min - other possibilities - d3 group layers, info extraction from svg drawings, api integrations, etc.  
   * extract attributes from one set of objects and apply to another  
