var tempInsert=`<div id="tempInsert">
        <div class="row">
            <div class="col">
                <img id="plantTemp1" src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <p id='plantText'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            </div>
        </div>
        <h6 id="plantrow" class="modalMargin">flora examples</h6>
        <div class="row" id="plantTemp2">
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
        </div>
        <h6 id="animalrow" class="modalMargin">fauna associated</h6>
        <div class="row" id="animalTemp1">
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
        </div>
        <h6 id="animalrow" class="modalMargin">process impacts</h6>
        <div class="row" id="processTemp1">
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
            <div class="col">
                <img src="./img/manifesto.jpg" class="thumbnail" />
            </div>
        </div>
      </div>`

var jsonData = {
    photoTags :{
        general:'dolly sods',
        flora:['quaking aspen', 'bracken ferns', 'eastern hemlock', 'birch', 'alder tree', 'red pine', 'blueberries', 'cotton grass', 'red spruce', 'alder'],
        fauna: [],
        process: []
    },
    menuTop: {
        homeBtn:[
            {name: "poster", id:"posterOpt"},
            {name: "about", id:"aboutOpt"},
            {name: "dam shelter design", id:"s1Opt"}
            ],
        siteBtn:[
            {name: "dolly sods site slides", id:"slideStart"},
            {name: "last", id:"slideLast", icon: 'fa-chevron-left'},
            {name: "next", id:"slideNext", icon: 'fa-chevron-right'}
            ],
        iconBtn:[
            {name: "show flora", id:"iFlora"},
            {name: "show fauna", id:"iFauna"},
            {name: "show process", id:"iProcess"}
        ],
        programBtn:[
            {name: "show trails", id:"dTrails"},
            {name: "show water levels", id:"dWater"},
            {name: "show occupancy", id:"dCamp"}
            ],
        seasonsBtn:[
            {name: "diagram + spring", id:"spring"},
            {name: "diagram + fall", id:"fall"},
            {name: "diurnal juxtaposition", id:"diurnal"}
            ]
    },
    menuBottom: {
        posterOpt: {
            fade: ['plan', 'section1', 'section2', 'scale_and_north', 'slideImage2', 'overlays', 'annotations'],
            clickModal: [{
                    trigger: ['slideImage1'],
                    updates:[
                        {id: 'slideImage1', type:'attr', value:['xlink:href', "../../docs/img/manifesto.jpg"]},
                        {id: 'slideImage1', type:'attr', value: ['height', 900]},
                        {id: 'bottomModalBody', type:'text', value: 'placeholder text for poster/project introduction'},
                        {id: 'bottomModalLabel', type: 'text', value: 'Dams & datums > manifesto'},
                            ],
                    modal: 'bottomModal',
                }],
        },
        aboutOpt: {
            fade: ['plan', 'section1', 'section2', 'scale_and_north', 'slideImage2', 'overlays', 'annotations'],
            show: 'bottomModal',
            updates:[
                {id: 'slideImage1', type:'attr', value:['xlink:href', "../../docs/img/manifesto.jpg"]},
                {id: 'bottomModalBody', type:'text', value: 'placeholder text for about modal'},
                {id: 'bottomModalLabel', type: 'text', value: 'Dams & datums > about'},
                    ],
        },
        s1Opt: {
            fade: ['slideImage2', 'section2', 'icons1','scale_and_north', 'trees1', 'cut1', 'diagrams', 'overlays', 'annotations'],
            updates: [
                {id: 'slideImage1', type:'attr', value:['xlink:href', "../../docs/img/model3.jpg"]},
                {id: 'slideImage1', type:'attr', value: ['height', 900]},
                    ],
        },

        slideStart: {
            fade: ['plan', 'section1', 'section2', 'scale_and_north', 'slideImage2', 'overlays', 'annotations'],
            click: {layers:['slideImage1', 'slideImage2'], actions:[{advance: 'slideImage1'},{advance: 'slideImage1'}], type:'flickr'},
            photos:{img:
                    ["../../docs/img/slide01.jpg", "../../docs/img/slide02.jpg", "../../docs/img/slide03.jpg", "../../docs/img/slide04.jpg", "../../docs/img/slide05.jpg", "../../docs/img/slide06.jpg", "../../docs/img/slide07.jpg", "../../docs/img/slide08.jpg", "../../docs/img/slide09.jpg","../../docs/img/slide10.jpg"],
                modals:
                    ["random modal content 1", "random modal content 2", "random modal content 3", "random modal content 4", "random modal content 5", "random modal content 6", "random modal content 7", "random modal content 8", "random modal content 9","random modal content 10"]
                },
            updates: {layers:['slideImage1','slideImage1','slideImage1', 'slideCaption'], contents: [['xlink:href', "../../docs/img/slide01.jpg"],['style', ""],['height', 900], "random caption 1"]}
        },
        slideNext: {
            fade: ['plan', 'section1', 'section2', 'scale_and_north','overlays', 'annotations'],
            click: {layers:['slideNext', 'slideLast'], actions:[{advance: 'slideImage1'},{reverse: 'slideImage1'}],type:'flickr'},
        },
        slideLast: {
            fade: ['plan', 'section1', 'section2', 'scale_and_north','overlays', 'annotations'],
            click: {layers:['slideNext', 'slideLast'], actions:[{advance: 'slideImage1'},{reverse: 'slideImage1'}],type:'flickr'},
        },
        iFlora: {
            fade: ['d_trails', 'd_camp','section2', 'diagrams', 'diagrams_occ','cut2','images','overlays'],
            highlight: [
                { trigger: ['i_blueberry', 'label_blueberry'],
                    layer: 'blueberry',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .25
                },
                { trigger: ['i_birch', 'label_birch'],
                    layer: 'birch',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .75
                },
                { trigger: ['i_eastern_hemlock', 'label_eastern_hemlock'],
                    layer: 'eastern_hemlock',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .75
                },
                { trigger: ['i_red_spruce', 'label_red_spruce'],
                    layer: 'red_spruce',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .75
                },
                { trigger: ['i_red_pine', 'label_red_pine'],
                    layer: 'red_pine',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .75
                },
                { trigger: ['i_alder', 'label_alder'],
                    layer: 'alder',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .75
                },
                { trigger: ['i_bracken_fern', 'label_bracken_fern'],
                    layer: 'bracken_fern',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .75
                },
                { trigger: ['i_quaking_aspen', 'label_quaking_aspen'],
                    layer: 'quaking_aspen',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .75
                },
                { trigger: ['i_cotton_grass', 'label_cotton_grass'],
                    layer: 'cotton_grass',
                    type:['path','polygon','rect', 'polyline'],
                    attr: 'fill',
                    opacity: .25
                },
            ],
            clickModal: [
                {   searchName:'cotton grass',
                    trigger: ['i_cotton_grass', 'label_cotton_grass'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Cotton Grass'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
                {   searchName:'quaking aspen',
                    trigger: ['i_quaking_aspen', 'label_quaking_aspen'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Quaking Aspen'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
                {   searchName:'bracken ferns',
                    trigger: ['i_bracken_fern', 'label_bracken_fern'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Bracken Ferns'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
                {   searchName:'alder',
                    trigger: ['i_alder', 'label_alder'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Alder'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
                {   searchName:'red pine',
                    trigger: ['i_red_pine', 'label_red_pine'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Red Pine'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
                {   searchName:'red spruce',
                    trigger: ['i_red_spruce', 'label_red_spruce'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Red Spruce'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
                {   searchName:'eastern hemlock',
                    trigger: ['i_eastern_hemlock', 'label_eastern_hemlock'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Eastern Hemlock'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
                {   searchName:'birch',
                    trigger: ['i_birch', 'label_birch'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Birch'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
                {   searchName:'blueberries',
                    trigger: ['i_blueberry', 'label_blueberry'],
                    updates:[
                        {id: 'rightModalLabel', type:'text', value:'Blueberry'},
                        {id: 'rightModalBody', type:'empty'},
                        {id: 'rightModalBody', type:'append', value: tempInsert},
                        {id: 'plantTemp1', type:'imgModal', value: 'tempFlora'},
                        {id: 'plantTemp2', type: 'imgArrModal', value: 'tempFlora'},
                        {id: 'animalTemp1', type: 'imgArrModal', value: 'tempFauna'},
                        {id: 'processTemp1', type: 'imgArrModal', value: 'tempProcess'},
                    ],
                    modal: 'rightModal',
                },
            ]
        },
        iFauna: {
            fade: ['d_trails', 'd_camp','section2', 'diagrams', 'diagrams_occ','cut2','images','overlays'],
        },
        iProcess: {
            fade: ['d_trails', 'd_camp','section2', 'diagrams', 'diagrams_occ','cut2','images','overlays'],
        },
        dWater: {
            fade: ['d_trails', 'd_camp','section1', 'diagrams_occ','cut2','images','annotations','overlays'],
            animateClip: {id:'clip_flows', height:'782', duration:4000},
            isolate: {trigger: 'd_saturation', layers: 'w_high', duration: 2000}
        },
        dTrails: {
            fade: ['w_flows', 'd_saturation', 'diagrams_occ','d_camp','section1', 'cut2','images', , 'annotations','overlays'],
            animateClip: {id:'clip_trails', width:'1107', duration:2000},
            tooltip:{
                attach:'d_trails',
                type:['path','polygon','rect', 'polyline'],
                layers:[
                    {id:'main_trail', value:'main: Bluebird Knob Trail'},
                    {id:'secondary_trail', value:'secondary: routes along Alder Run'},
                    {id:'meanders_trail', value:'meanders: to Alder Run Bog'},
                    ]
            }
        },
        dCamp: {
            fade: ['w_flows', 'd_trails', 'd_saturation','section1', 'cut2','images', 'annotations', 'overlays', 'program-peps'],
            tooltip:{
                attach:'diagrams_occ',
                type:['path','polygon','rect', 'polyline'],
                layers:[
                    {id:'sleepingCap', value:'room per sleeping bag'},
                    {id:'waterEdge', value:'easy access for purification, refills'},
                    {id:'shelterPlatform', value:'covered shelter with roof access/overlook'},
                    {id:'firePit-2', value:'sunken pit for fires, overflow drains to bog at south'},
                    {id:'ds_shelter', value:'shelter: raised floor for times of flooding, roof access for star-gazing'},
                    {id:'ds_sleeping', value:'tents and sleeping bags fill this area'},
                    {id:'ds_edge', value:'access to stream (in wet seasons)'},
                    {id:'ds_fire', value:'fire pit and socializing area intersecting/reinforcing dam wall'},
                ]
            }
        },
        spring: {
            fade: ['images', 'section2', 'icons1','cut1','diagrams', 'plan', 'render2', 'scale_and_north', 'annotations'],
            animateMPosition: 'clip_renders',
            updates: [{id: 'render1', type:'attr', value:['xlink:href', "../../docs/img/sect1_SpringDay.jpg"]}],
        },
        fall: {
            fade:['images', 'section1', 'diagrams_occ','cut2','diagrams', 'plan', 'render2', 'scale_and_north', 'annotations'],
            animateMPosition: 'clip_renders',
            updates: [{id: 'render1', type:'attr', value:['xlink:href', "../../docs/img/sect2_FallDay.jpg"]}],
        },
        diurnal: {
            fade: ['images', 'section1', 'section2','diagrams', 'plan','scale_and_north', 'annotations'],
            animateMPosition: 'clip_renders',
            updates: [{id: 'render1', type:'attr', value:['xlink:href', "../../docs/img/sect2_FallDay.jpg"]},
                {id: 'render2', type:'attr', value:['xlink:href', "../../docs/img/sect2_FallNight.jpg"]},
                {id: 'render2', type:'attr', value:['style', ""]},
            ],
        },

    }
}
