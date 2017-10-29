var jsonData = {
    photoTags :{
        general:'dolly sods',
        flora:['quaking aspen', 'bracken ferns', 'eastern hemlock', 'birch', 'alder tree', 'red pine', 'blueberry dolly sods', 'cotton grass bog', 'red maple'],
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
            fade: {layers:['plan', 'section1', 'section2', 'scale_and_north', 'slideImage2', 'overlays'], type:'id'},
            click: {layers:['slideImage1'], actions:[{show: 'bottomModal'}]},
            updates: {layers:['slideImage1', 'slideImage1','slideImage1', 'bottomModalBody', 'bottomModalLabel'], contents: [['xlink:href', "../../docs/img/manifesto.jpg"],['style', ""],['height', 900],'placeholder text for poster/project introduction', 'Dams & datums > manifesto' ]}
        },
        aboutOpt: {
            fade: {layers:['plan', 'section1', 'section2', 'scale_and_north', 'slideImage2', 'overlays'], type:'id'},
            show: 'bottomModal',
            updates: {layers:['slideImage1', 'bottomModalBody', 'bottomModalLabel'], contents: [['xlink:href', "../../docs/img/manifesto.jpg"],'placeholder text for about modal', 'Dams & datums > about']}
        },
        s1Opt: {
            fade: {layers:['slideImage2', 'section2', 'icons1','scale_and_north', 'trees1', 'cut1', 'diagrams', 'overlays'], type:'id'},
            updates: {layers:['slideImage1', 'slideImage1', 'slideImage1'], contents: [['xlink:href', "../../docs/img/model3.jpg"],['style', ""],['height', 900]]}
        },
        slideStart: {
            fade: {layers:['plan', 'section1', 'section2', 'scale_and_north', 'slideImage2', 'overlays'], type:'id'},
            click: {layers:['slideImage1', 'slideImage2'], actions:[{advance: 'slideImage1'},{advance: 'slideImage1'}], type:'flickr'},
            photos:{img:
                    ["../../docs/img/slide01.jpg", "../../docs/img/slide02.jpg", "../../docs/img/slide03.jpg", "../../docs/img/slide04.jpg", "../../docs/img/slide05.jpg", "../../docs/img/slide06.jpg", "../../docs/img/slide07.jpg", "../../docs/img/slide08.jpg", "../../docs/img/slide09.jpg","../../docs/img/slide10.jpg"],
                modals:
                    ["random modal content 1", "random modal content 2", "random modal content 3", "random modal content 4", "random modal content 5", "random modal content 6", "random modal content 7", "random modal content 8", "random modal content 9","random modal content 10"]
                },
            updates: {layers:['slideImage1','slideImage1','slideImage1', 'slideCaption'], contents: [['xlink:href', "../../docs/img/slide01.jpg"],['style', ""],['height', 900], "random caption 1"]}
        },
        slideNext: {
            fade: {layers:['plan', 'section1', 'section2', 'scale_and_north','overlays'], type:'id'},
            click: {layers:['slideNext', 'slideLast'], actions:[{advance: 'slideImage1'},{reverse: 'slideImage1'}],type:'flickr'},
        },
        slideLast: {
            fade: {layers:['plan', 'section1', 'section2', 'scale_and_north','overlays'], type:'id'},
            click: {layers:['slideNext', 'slideLast'], actions:[{advance: 'slideImage1'},{reverse: 'slideImage1'}],type:'flickr'},
        },
        iFlora: {
            fade: [],
            tooltip: [],
            click: []
        },
        iFauna: {
            fade: [],
            tooltip: [],
            click: []
        },
        iProcess: {
            fade: [],
            tooltip: [],
            click: []
        },
        dWater: {
            fade: {layers:['d_trails', 'd_camp','section1', 'diagrams_occ','cut2','images','plan_annoTextures','overlays'], type:'id'},
            animateClip: {layer:'clip_flows', height:'782', duration:4000},
            isolate: {trigger: 'd_saturation', layers: 'w_high', duration: 2000 }
        },
        dTrails: {
            fade: {layers:['w_flows', 'd_saturation', 'diagrams_occ','d_camp','section1', 'cut2','images', 'plan_annoTextures','overlays'], type:'id'},
            animateClip: {layer:'clip_trails', width:'1107', duration:2000},
            tooltip:{layers:['main_trail', 'secondary_trail', 'meanders_trail'], contents:['main: Bluebird Knob Trail', 'secondary: routes along Alder Run', 'meanders: to Alder Run Bog'], overlay:'d_trails', type:['path']}
        },
        dCamp: {
            fade: {layers:['w_flows', 'd_trails', 'd_saturation','section1', 'cut2','images', 'plan_annoTextures', 'overlays', 'program-peps'], type:'id'},
            tooltip:{layers:['sleepingCap', 'waterEdge', 'shelterPlatform', 'firePit-2', 'ds_shelter', 'ds_sleeping', 'ds_edge', 'ds_fire'], contents:['room per sleeping bag', 'easy access for purification, refills', 'covered shelter with roof access/overlook', 'sunken pit for fires, overflow drains to bog at south', 'shelter: raised floor for times of flooding, roof access for star-gazing', 'tents and sleeping bags fill this area', 'access to stream (in wet seasons)', 'fire pit and socializing area intersecting/reinforcing dam wall'], overlay:'diagrams_occ', type:['path','polygon','rect', 'polyline']}
        },
        spring: {
            fade: {layers:['images', 'section2', 'icons1','cut1','diagrams', 'plan', 'render2', 'scale_and_north'], type:'id'},
            animateMPosition: 'clip_renders',
            updates: {layers:['render1'], contents: [['xlink:href', "../../docs/img/sect1_SpringDay.jpg"]]}
        },
        fall: {
            fade: {layers:['images', 'section1', 'diagrams_occ','cut2','diagrams', 'plan', 'render2', 'scale_and_north'], type:'id'},
            animateMPosition: 'clip_renders',
            updates: {layers:['render1'], contents: [['xlink:href', "../../docs/img/sect2_FallDay.jpg"]]}
        },
        diurnal: {
            fade: {layers:['images', 'section1', 'section2','diagrams', 'plan','scale_and_north'], type:'id'},
            animateMPosition: 'clip_renders',
            updates: {layers:['render1','render2','render2'], contents: [['xlink:href', "../../docs/img/sect2_FallDay.jpg"],['xlink:href', "../../docs/img/sect2_FallNight.jpg"], ['style', '']]}
        },

    }
}
