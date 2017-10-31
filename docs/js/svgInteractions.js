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

		//sort and clean any of api array's you've brought in...
		var flickr = sortFlickrLarge(photoData[0])
		var flickrTrees = {}
		trees.forEach((tree, i)=>{
		  flickrTrees[jsonData.photoTags.flora[i]] = tree[0].photos.photo.map(photo=>photo.url_sq)
		})

		//and then feed to the master function, controlling top menu and bottom menu nesting. . .
		topMenuLoad(menuTop, flickr, flickrTrees)


	}); //.done()

}); //.ready()


//---------------FUNCTIONS FOR TYPICAL/USEFUL BEHAVIOR------------------

/* These functions could be set in their own file and preloaded or defined here
the key idea is to simply break down typical tasks into smaller, reusable sections.

This approach should be familiar in that dot notation 'object.function(parameters)' is common in leaflet/mapbox
and simply holds those functions as methods held on a defined class .... var map = new mapBox(params) .... map.addLayers(params)
*/

//Task: grab meaning full photos (by size & title - human made, not id #)
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

//-----------------Set Initial Visibility of Image--------------------------
const loadPoster = function(){
		//turn everything on again within layered, named svg
		$('g[id]').css('display', 'initial')

		//initial layer manipulation - hide or fade off specific layers...
		//(just be aware the routing is a bit odd given github hosting from docs)
		$('#slideImage1').attr('xlink:href', "./img/manifesto.jpg").attr('style', "")

		//set up initial visibilities
		$(['plan', 'section1', 'section2', 'scale_and_north', 'slideImage2', 'overlays','annotations'].map(item=>'#'+item).join(',')).hide()

}

//-----------START MAKING COMPOSITE FUNCTIONS

//-----------Update options based on top menu (add in additional functions here)--------------------------
const topMenuLoad = function (obj, flickr, flickrTrees){
	var buttonIds = Object.keys(obj)

	buttonIds.forEach(btn=>{
		var interArr = obj[btn]

		$('#'+btn).click((event)=>{
			//here we want to reload the bottom options
			$('#pgChoice').text(btn.replace('Btn', ''))
			$('.bottomMenu').remove()

			layerOptions(obj[btn][0].id, flickr, flickrTrees) // THIS LOADS THE VIS FOR THE FIRST BUTTON ON BOTTOM

			//and then we create a new div of buttons to hold the further interactions...
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
				$(`#${item.id}`).click(event=>layerOptions(event.target.id,  flickr, flickrTrees)) //THIS READS THOSE OPTIONS - A OBJECTS AND SETS UP INTERACTIONS/VISIBILITY

			})

		})
	})

}


// checks based on the bottom menu buttons as listed in the json series of objects

const altVisibility = function(objId){
	var toHide = menuBottom[objId].fade

	//which layers are currently hidden
	var layers = $('g[id][style="display: none;"]')
	var layersId = layers.map(item=>layers[item].id)
	var isHidden = [].slice.call(layersId) // conversion to array

	//compare and filter
	var fadeOutIds = toHide.filter(id=> isHidden.indexOf(id) === -1)
	var fadeInIds = isHidden.filter(id=> toHide.indexOf(id) === -1)

	fadeOutIds.forEach(id=>$(`#${id}`).fadeOut(500))
	fadeInIds.forEach(id=>$(`#${id}`).fadeIn(500))

}

const altSlides = function(objId, flickr){
	if (menuBottom[objId].clickSlides){
		(objId === 'slideNext' || objId === 'slideLast')? objId = 'slideStart' : objId = objId
		var clickSlides = menuBottom[objId].clickSlides
		var slideSource = (clickSlides.source === 'flickr')? flickr : clickSlides.slides
		var slideArr = slideSource.map(slide=>slide.link)

		var tr = clickSlides.trigger.map(item=>'#'+item).join(',')
		var trAdv = clickSlides.triggerAdv.map(item=>'#'+item).join(',')
		var trRev = clickSlides.triggerRev.map(item=>'#'+item).join(',')

		if (event.target.id !== 'slideNext' && event.target.id !== 'slideLast'){
			$(tr).off('click').click(()=>slideshow(slideSource, 'adv', flickr))
		} else if (event.target.id === 'slideNext'){
			slideshow(slideSource, 'adv', flickr)
		} else if (event.target.id === 'slideLast'){
			slideshow(slideSource, 'rev', flickr)
		}
	}

}


const slideshow = function(slideObjs, direction, flickr){
	var arr = slideObjs.map(slide=>slide.link)
	var titles = slideObjs.map(slide=>slide.title)
	var height = slideObjs.map(slide=>slide.height)

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

		if (titles){
			$('#rightModalLabel').text(titles[next])
			$('#rightModalBody').text('')
			$('#rightModal').modal('show')
		}

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

		if (titles){
			$('#rightModalLabel').text(titles[next])
			$('#rightModal').modal('show')
		}
	}
}


const altUpdates = function(objId, otherUpdates, links){

	if (menuBottom[objId] && menuBottom[objId].updates){
		var updates = menuBottom[objId].updates
	} else if (otherUpdates){
		var updates = otherUpdates
	}

	if (updates){
		updates.forEach(update=>{

			switch (update.type) {
				  case 'text':
				    $(`#${update.id}`).text(update.value)
				    break;
				  case 'append':
				    $(`#${update.id}`).append(update.value)
				    break;
				  case 'empty':
				    $(`#${update.id}`).empty()
				    break;
				  case 'attr':
				    $(`#${update.id}`).attr(update.value[0],update.value[1])
				    break;
				  case 'css':
				    $(`#${update.id}`).css(update.value[0],update.value[1])
				    break;
				  case 'class':
				    $(`#${update.id}`).addClass(update.value)
				    break;
				  case 'imgModal':
				    $(`#${update.id}`).attr('src', links[update.value][0].replace('_s', '_m'))
				    break;
				  case 'imgArrModal':
				    var len = $(`#${update.id}`).find('img').length
				    var imagArr = [].slice.call($(`#${update.id}`).find('img'))
				    imagArr.forEach((img, i)=>{img.src = links[update.value][i]})
				    break;
				  default:
				    console.log('add category');
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
			$(`#${anim.id}`).css('width', '0px').animate({
							width: anim.width
					}, anim.duration)
			} else if (anim.height){
				$(`#${anim.id}`).css('height', '0px').animate({
							height: anim.height
					}, anim.duration)

			}
	}

}

const altTooltips = function(objId){
	if (menuBottom[objId].tooltip){
		var attachTo = menuBottom[objId].tooltip.attach
		var types = menuBottom[objId].tooltip.type.join(',')
		var tooltips = menuBottom[objId].tooltip.layers

		tooltips.forEach((layer,i)=>{

				$(`#${layer.id}`).find(types).attr('pointer-event', 'all').addClass('stroke_'+layer.id)


			var tooltip = document.createElementNS("http://www.w3.org/2000/svg",'text')
				tooltip.setAttribute('id', 'stroke_'+layer.id+'_tt')
				tooltip.setAttribute('class', 'text-tt')
				tooltip.append(layer.value)

			var under = document.createElementNS("http://www.w3.org/2000/svg",'rect')
				under.setAttribute('id', 'stroke_'+layer.id+'_rect')
				under.setAttribute('class', 'rect-tt')

			$(`#${attachTo}`).append(under).append(tooltip)

			$(`.stroke_${layer.id}`).hover((event)=>{
					$(`#stroke_${layer.id}_tt`).attr('x', event.pageX).attr('y', event.pageY-10)

				var inher = $(`#stroke_${layer.id}_tt`)[0].textLength.baseVal.value+10
					$(`#stroke_${layer.id}_rect`).attr('x', event.pageX-5).attr('y', event.pageY-28).attr('width', inher)

			}, (event)=>{
				$(`#stroke_${layer.id}_tt`).attr('x', '').attr('y', '')
				$(`#stroke_${layer.id}_rect`).attr('x', '').attr('y', '').attr('width', '')
			})

		})

	}
}


const altIsolate=function(objId){
	if (menuBottom[objId].isolate){
		var iso = menuBottom[objId].isolate

		$(`#${iso.trigger}`).off('click').click(()=>{
			$(`#${iso.layers}`).fadeToggle()
		})

	}
}

const altHighlight = function(objId){
	if (menuBottom[objId].highlight){
		var hi = menuBottom[objId].highlight

		hi.forEach(hiGroup=>{
			var triggers = hiGroup.trigger.map(item=>'#'+item).join(',')
			var types = hiGroup.type.join(',')
			var color = $(triggers).find('path').attr(hiGroup.attr)

			$(triggers).hover(()=>{
				$(`#${hiGroup.layer}`).find(types).attr(hiGroup.attr, color).attr('fill-opacity', hiGroup.opacity)
			}, ()=>{
				$(`#${hiGroup.layer}`).find(types).attr(hiGroup.attr, 'none').attr('fill-opacity', 1)
			})
		})

	}
}


const altClickModal=function(objId,flickrTrees){
	if (menuBottom[objId].clickModal){
		var clickAdd = menuBottom[objId].clickModal


		clickAdd.forEach(clickGroup=>{
			var triggers = clickGroup.trigger.map(item=>'#'+item).join(',')
			var updates = clickGroup.updates
			var modalId = clickGroup.modal

			if (clickGroup.searchName){
				var source = clickGroup.searchName

				var picsSorted = {
					tempFlora: flickrTrees[source],
					tempFauna: flickrTrees['alder'],
					tempProcess: flickrTrees['blueberries'],
				}
			}

			$(triggers).off('click').click(()=>{

				altUpdates(objId, updates, picsSorted)

				$(`#${modalId}`).modal('show')
			})
		})
	}
}

//-----------master function for tiggering & adding events from the bottom menu----------------
const layerOptions = function(objId, flickr, flickrTrees){ //event.target.id
	console.log(objId)
	altVisibility(objId)
	altUpdates(objId, null)
	altSlides(objId, flickr)
	altShow(objId)
	altPositions(objId)
	altAnimateClip(objId)
	altTooltips(objId)
	altIsolate(objId)
	altHighlight(objId)
	altClickModal(objId, flickrTrees)
}




