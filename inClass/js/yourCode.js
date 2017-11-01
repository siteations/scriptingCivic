//throw some globals at the top as desired


$(document).ready(()=> {

//----------------LOAD your files with jQuery $.get----------------------

	//add your svg compositions, svg secondary elements, and linked data (csv or json)

		// your carefully executed drawings
		var loadSvg = $.get('./img/plan+sections_cc_01.svg')

		//and work with your favorite data types... we're not using this but you get the idea...
		var loadCSV = $.get('./data/test.csv')


	// set up array order in a way that makes sense for collecting later
	var promiseArray = [loadSvg, loadCSV]

	//this is asynchronous so we use $.when().done() to collect data once all are loaded
	//for more info on sync vs. async/callback strutures and the alternatives of defers (in jQuery) / promises see MDN promises

//----------------ONCE LOADED (defered) grab their data with $.when().done()----------------------

	$.when(...promiseArray).done((svgData, csvData) => {

		//note the data structure from done includes 3 things... we want to work with [0]
			console.log("response structure",  svgData)

		//confirm what's in your files
			console.log("svg",  svgData[0].documentElement)
			console.log("elements-csv",  csvData[0].split('\r').map(line=>line.split(',')) )

		//set up an initial styling
		var svg = svgData[0].documentElement
		svg.setAttribute('class', 'center-block')

		//add svg to the html
		$('#svgHere').append(svg)

		//add functions here

		//starting visibility - basic jQuery animations, basic jQuery selection
		//http://api.jquery.com/category/effects/
		//http://api.jquery.com/category/selectors/

		//consider how to set on visibility for each layer chance through a single function defined below
		//$('#id of buttons').click()
		//$('#id of buttons').click()
		//$('#id of buttons').click()


	}); //.done()

}); //.ready()


//---------------FUNCTIONS FOR TYPICAL/USEFUL BEHAVIOR------------------

/* These functions could be set in their own file and preloaded or defined here
the key idea is to simply break down typical tasks into smaller, reusable sections.

This approach should be familiar in that dot notation 'object.function(parameters)' is common in leaflet/mapbox
and simply holds those functions as methods held on a defined class .... var map = new mapBox(params) .... map.addLayers(params)
*/

const setVisibility = function(){
	//psuedo code here - what do we need to know from the dom to hide and show appropriate layers

	//full code here
	//consider using advanced traversals or selectors
	//consider how to manipulate arrays of selections with array tools:
	//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array


}

const updateElements = function(){
	//psuedo code here

	//explore attribute manipulation

}

const highlights = function(){
	//psuedo code here

	//hover, class, and attribute manipulations
}

const labels = function(){

}

const animation = function(){

}





