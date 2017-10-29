//throw some globals at the top

var sig = 'cb723072f6870d58'
var key = '74838237bffa820e9242c061634ec0dd'

//breaking apart my master json into pieces
var menuTop=jsonData.menuTop
var menuBottom=jsonData.menuBottom
var photoTags=jsonData.photoTags




$(document).ready(()=> {

//----------------LOAD your files with jQuery $.get----------------------

	//add your svg compositions, svg secondary elements, and linked data (csv or json)

		// your carefully executed drawings
		var loadSvg = $.get('./img/sectionPlan-01.svg')
		// do single api calls or multiple to bring in extra photos / data from flickr, etc,
		var loadPhotoGen = $.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${photoTags.general.replace(' ', '+')}&extras=url_sq%2C+url_l&per_page=150&page=1&format=json&nojsoncallback=1&api_signature=${sig}`)

		//feel free to make arrays of these 'promises' awaiting fulfillment...
		var treeCalls = jsonData.photoTags.flora.map((tree)=>{
			return $.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${tree.replace(' ', '+')}&extras=url_sq%2C+url_z&per_page=10&page=1&format=json&nojsoncallback=1&api_signature=${sig}`)
		})
		//and work with your favorite data types... we're not using this but you get the idea...
		var loadCSV = $.get('./data/test.csv')


	// set up array order in a way that makes sense for collecting later
	var promiseArray = [loadSvg, loadPhotoGen, loadCSV].concat(treeCalls)

	//this is asynchronous so we use $.when().done() to collect data once all are loaded
	//for more info on sync vs. async/callback strutures and the alternatives of defers (in jQuery) / promises see MDN promises

//----------------ONCE LOADED (defered) grab their data with $.when().done()----------------------

	$.when(...promiseArray).done((svgData, photoData, csvData, ...trees) => {

		//note the data structure from done includes 3 things... we want to work with [0]
			console.log("response structure",  svgData)

		//confirm what's in your files
			console.log("svg",  svgData[0].documentElement)
			console.log("flickr photos (first 25)",  photoData[0])
			console.log("elements-csv",  csvData[0].split('\r').map(line=>line.split(',')) )
			console.log("flickr trees", trees.map(tree=>tree[0]))

		//set up an initial styling
		var svg = svgData[0].documentElement
		svg.setAttribute('class', 'center-block')

		//add svg to the html
		$('#svgHere').append(svg)

		loadPoster()

		var flickr = sortFlickrLarge(photoData[0])
		console.log('working photos', flickr)

		topMenuLoad(menuTop, flickr)



	}); //.done()

}); //.ready()


//---------------FUNCTIONS FOR TYPICAL/USEFUL BEHAVIOR------------------

/* These functions could be set in their own file and preloaded or defined here
the key idea is to simply break down typical tasks into smaller, reusable sections.

This approach should be familiar in that dot notation 'object.function(parameters)' is common in leaflet/mapbox
and simply holds those functions as methods held on a defined class .... var map = new mapBox(params) .... map.addLayers(params)
*/

//Task: reset all visibility to initial load state
const visInit = function(){
	$('g[id]').css('display', 'initial')
}

//Task: hide all layers with selections in array
const visHide = function (arr, sel){
	var prefix;
	if (sel==='id'){prefix='#'} else if (sel==='class'){prefix='.'} else if (sel==='tag'){prefix=''}

	arr.forEach(item=>{
		$(prefix+item).hide()
	})
}

//Task: add tooltips to all layers with selections in array ... this is an array of objects
const visTool = function (arr, sel){
	var prefix;
	if (sel==='id'){prefix='#'} else if (sel==='class'){prefix='.'} else if (sel==='tag'){prefix=''}

	arr.forEach(item=>{
		$(prefix+item.id).attr('data-toggle','tooltip')
		$(prefix+item.id).attr('title', item.tooltitle)
	})
}

const sortFlickrLarge = function (json){
	var photos = json.photos.photo

	var photolinks = []
	photos.forEach(photo=>{
		var pic={}

		if (photo.url_l && photo.title.split(' ').length>1){

			pic.link = photo.url_l
			pic.height = (1600/photo.width_l)*photo.height_l
			pic.title = photo.title
			photolinks.push(pic)
		}

	})

	return photolinks
}


//-----------TASKS BY AREAS--------------------------


//-----------------Set Initial Visibility of Image--------------------------
const loadPoster = function(){
		//turn everything on again within layered, named svg
		visInit()

		//initial layer manipulation - hide or fade off specific layers...
		//(just be aware the routing is a bit odd given github hosting from docs)
		$('#slideImage1').attr('xlink:href', "../../docs/img/manifesto.jpg").attr('style', "")

		//set up initial visibilities
		visHide(['plan', 'section1', 'section2', 'scale_and_north', 'slideImage2', 'overlays'], 'id')
}


//-----------Update options based on top menu (add in additional functions here)--------------------------
const topMenuLoad = function (obj, flickr){
	var buttonIds = Object.keys(obj)

	buttonIds.forEach(btn=>{
		var interArr = obj[btn]

		$('#'+btn).click((event)=>{
			//here we want to reload the bottom options
			$('#pgChoice').text(btn.replace('Btn', ''))
			$('.bottomMenu').remove()

			layerOptions(obj[btn][0].id, flickr)

			newDiv = document.createElement("div")
			newDiv.setAttribute('class', 'col-2 text-center bottomMenu')
			$('.footer').prepend(newDiv)


			interArr.forEach(item=>{
				var newDiv = document.createElement("div")
				newDiv.setAttribute('class', 'col text-center bottomMenu')

				var newBtn = document.createElement("button")
					newBtn.setAttribute('class', 'btn btn-outline-secondary btn-block')
					newBtn.setAttribute('id', item.id)
					if (!item.icon){
						newBtn.innerHTML = item.name
					} else if (item.icon){
						newBtn.innerHTML=`<i class="fa ${item.icon}" aria-hidden="true"></i>`
					}
				newDiv.append(newBtn)

				$('.footer').append(newDiv)
				$(`#${item.id}`).click(event=>layerOptions(event.target.id,  flickr))

			})

		})
	})

}


// checks based on the bottom menu buttons as listed in the json series of objects

const altVisibility = function(objId){
	var toHide = menuBottom[objId].fade.layers

	//which layers are currently hidden
	var layers = $('g[id]')

	var offArray = layers.map(id=> {
			if (layers[id].style.cssText === 'display: none;'){
				return layers[id].id
			}
		})
	var isHidden = [].slice.call(offArray)

	console.log(isHidden, $(':hidden')) // note how problematic jquery can be.... so you will need to craft your own selection mechanisms

	//compare and filter
	var fadeOutIds = toHide.filter(id=> isHidden.indexOf(id) === -1)
	var fadeInIds = isHidden.filter(id=> toHide.indexOf(id) === -1)

	fadeOutIds.forEach(id=>$(`#${id}`).fadeOut(500))
	fadeInIds.forEach(id=>$(`#${id}`).fadeIn(500))

}

const altActions = function(objId, flickr){
	if (menuBottom[objId].click){
		var actionLayers = menuBottom[objId].click.layers
		var actionActions = menuBottom[objId].click.actions
		var slideSource = menuBottom[objId].click.type

		actionLayers.forEach((layer,i)=>{
			if (actionActions[i].show){
				$(`#${layer}`).off('click').click(()=>$(`#${actionActions[i].show}`).modal('show'))
			} else if (actionActions[i].fadeIn){

			} else if (actionActions[i].fadeOut){

			} else if (actionActions[i].fill){ // plan only - empty others, fill species type

			} else if (actionActions[i].advance){ // slides only
				$(`#${layer}`).off('click').click(()=>slideshow('slideStart', 'adv', slideSource, flickr))
			} else if (actionActions[i].reverse){ // slides only
				$(`#${layer}`).off('click').click(()=>slideshow('slideStart', 'rev', slideSource, flickr))
			}
		})

	}

}


const slideshow = function(objId, direction, type, flickr){
	if (type==='internal' && flickr===null){
		var arr = menuBottom[objId].photos.img
		var modals = menuBottom[objId].photos.modals
	} else if(type==='flickr' && flickr!==null){
		var arr = flickr.map(item=>item.link)
		var height = flickr.map(item=>item.height)
		var modals = flickr.map(item=>item.title)
	}
	var current;
	var next;

	var sl1 = $('#slideImage1').attr('style')
	var sl2 = $('#slideImage2').attr('style')

	if (sl1 !=='display: none;'){
		current = arr.indexOf($('#slideImage1').attr('xlink:href'));
		if (direction=== 'adv'){
			next = current + 1
			if (next> arr.length-1){next = 0}
		} else {
			next = current - 1
			if (next< 0){next = arr.length-1}
		}

		if (height){
			$('#slideImage2').attr('xlink:href', arr[next]).attr('height', height[next]).show()
		} else {
			$('#slideImage2').attr('xlink:href', arr[next]).attr('height', 900).show()
		}
		$('#slideImage1').fadeOut(1000)

		$('#rightModalLabel').text(modals[next])
		$('#rightModalBody').text('')
		$('#rightModal').modal('show')

	} else if (sl1 ==='display: none;'){

		current = arr.indexOf($('#slideImage2').attr('xlink:href'));
		if (direction=== 'adv'){
			next = current + 1
			if (next> arr.length-1){next = 0}
		} else {
			next = current - 1
			if (next< 0){next = arr.length-1}
		}

		if (height){
			$('#slideImage1').attr('xlink:href', arr[next]).attr('height', height[next]).fadeIn(1000)
		} else {
			$('#slideImage1').attr('xlink:href', arr[next]).attr('height', 900).fadeIn(1000)
		}
		$('#slideImage2').fadeOut(1000)
		$('#rightModalLabel').text(modals[next])
		$('#rightModal').modal('show')
	}
}

const altContent = function(objId, clickNest){
	console.log(menuBottom[objId], objId)

	if (menuBottom[objId].updates && !clickNest){
		var toEdit = menuBottom[objId].updates.layers
		var edits = menuBottom[objId].updates.contents
	} else if (clickNest){
		var toEdit = menuBottom[objId].click.updates.layers
		var edits = menuBottom[objId].click.updates.contents
	}

	if (menuBottom[objId].updates || clickNest){
		toEdit.forEach((edit,i)=>{
			if (typeof(edits[i])==='string'){
				$(`#${edit}`).text(edits[i])
			} else if (Array.isArray(edits[i]) && edits[i].length===2){
				$(`#${edit}`).attr(edits[i][0],edits[i][1])
			} else if (Array.isArray(edits[i]) && edits[i].length>2){ // for complex modals
				// add later for plant info based on icons
			}
		})

	}
}

const altShow = function(objId){
	if (menuBottom[objId].show){
		$(`#${menuBottom[objId].show}`).modal('show')
	}
}

const altPositions = function(objId){
	if (menuBottom[objId].animateMPosition){
		var pos = menuBottom[objId].animateMPosition

		$(`svg`).off('mousemove').mousemove((event)=>{
			var x = event.pageX;
			var y = event.pageY;

  		$(`#${pos}`).attr('cx', x +'px')
  		$(`#${pos}`).attr('cy', y +'px')
		})
	}
}

const altAnimateClip = function(objId){
		if (menuBottom[objId].animateClip){
			var anim = menuBottom[objId].animateClip

			if (anim.width){
			$(`#${anim.layer}`).css('width', '0px').animate({
							width: anim.width
					}, anim.duration)
			} else if (anim.height){
				$(`#${anim.layer}`).css('height', '0px').animate({
							height: anim.height
					}, anim.duration)

			}
	}

}

const altTooltips = function(objId){
	if (menuBottom[objId].tooltip){
		var tt = menuBottom[objId].tooltip.contents
		menuBottom[objId].tooltip.layers.forEach((layer,i)=>{
			menuBottom[objId].tooltip.type.forEach(item =>{
				$(`#${layer}`).find(item).attr('pointer-event', 'all').addClass('stroke_'+layer)
			})

			var tooltip = document.createElementNS("http://www.w3.org/2000/svg",'text')
				tooltip.setAttribute('id', 'stroke_'+layer+'_tt')
				tooltip.setAttribute('class', 'text-tt')
				tooltip.append(tt[i])

			var under = document.createElementNS("http://www.w3.org/2000/svg",'rect')
				under.setAttribute('id', 'stroke_'+layer+'_rect')
				under.setAttribute('class', 'rect-tt')

			$(`#${menuBottom[objId].tooltip.overlay}`).append(under).append(tooltip)

			$(`.stroke_${layer}`).hover((event)=>{
					$(`#stroke_${layer}_tt`).attr('x', event.pageX).attr('y', event.pageY-10)

				var inher = $(`#stroke_${layer}_tt`)[0].textLength.baseVal.value+10
					$(`#stroke_${layer}_rect`).attr('x', event.pageX-5).attr('y', event.pageY-28).attr('width', inher)

			}, (event)=>{
				$(`#stroke_${layer}_tt`).attr('x', '').attr('y', '')
				$(`#stroke_${layer}_rect`).attr('x', '').attr('y', '').attr('width', '')
			})

		})

	}
}

const altIsolate=function(objId){
	if (menuBottom[objId].isolate){
		var iso = menuBottom[objId].isolate

		$(`#${iso.trigger}`).off('click').click(()=>{
			$(`#${iso.layers}`).fadeToggle()
		})//.off('mouseover')

	}
}

const altHighlight = function(objId){
	if (menuBottom[objId].highlight){

	}
}



//-----------master function for tiggering & adding events from the bottom menu----------------
const layerOptions = function(objId, flickr){ //event.target.id
	console.log(objId)
	altVisibility(objId)
	altContent(objId, null)
	altActions(objId, flickr)
	altShow(objId)
	altPositions(objId)
	altAnimateClip(objId)
	altTooltips(objId)
	altIsolate(objId)
	altHighlight(objId)
}




