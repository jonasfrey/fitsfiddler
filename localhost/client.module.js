import {f_o_html_from_o_js} from "https://deno.land/x/f_o_html_from_o_js@1.4/mod.js";

import {
    f_add_css,
    f_s_css_prefixed
} from "https://deno.land/x/f_add_css@0.6/mod.js"

import { 
    f_o_file__fits__from_a_n_u8,
    f_o_canvas_nonmanipulated__from_o_file__fits, 
    f_o_canvas_autostretched__from_o_file__fits, 
    f_a_n_u8__from_s_url
} from "https://deno.land/x/o_file__fits@0.6/mod.js";


let o_js__everything = null;
let o_js__inputs = null;
let o_js__notification = null; 

let f_download_text_file = function(
    s_name_file, 
    s_content
){

    // Create a Blob object
    const blob = new Blob([s_content], { type: 'plain/text' });
    // Create an object URL
    const url = URL.createObjectURL(blob);
    // Create a new link
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = s_name_file;
    // Append to the DOM
    document.body.appendChild(anchor);
    // Trigger `click` event
    anchor.click();
    // Remove element from DOM
    document.body.removeChild(anchor);
    // Release the object URL
    URL.revokeObjectURL(url);

}

// f_download_text_file("lol.txt", 'this is lol')

class O_notification{
    constructor(
        s_class, 
        s_text, 
        b_render
    ){
        this.s_class = s_class
        this.s_text = s_text
        this.b_render = b_render
        this.n_id_timeout = null;
    }
}


window.o_state = {
    s_url: '', 
    s_url: 'https://n8h9z8x9.rocketcdn.me/wp-content/uploads/2022/03/RemoteAstrophotography-com_M-31Andromeda.zip',
    n_id_timeout_s_url: 0,
    n_ms_timeout_s_url: 500, 
    o_file_fileselector: null,
    n_trn_x__canvas: null,
    n_trn_y__canvas: null,
    n_trn_x__pixel_hovered: null,
    n_trn_y__pixel_hovered: null,
    n_trn_x__mouse_last: null,
    n_trn_y__mouse_last: null,
    b_mousedown_canvas: false,
    n_pixelvalue: null, 
    o_file__fits: null, 
    n_scl_canvas :1,
    o_s_state_s_class_font_awesome: {
        info: 'fa-solid fa-circle-info',
        error: 'fa-solid fa-triangle-exclamation',
        warning: 'fa-solid fa-exclamation',
        success: 'fa-regular fa-thumbs-up', 
        loading: 'fas fa-spinner fa-pulse'
    },
    o_notification: new O_notification('info', 'Please load an image from your computer or from an url'),
    a_o_notification: [],
    o_ctx_2d: null,
    o_canvas: null,
    o_canvas__fits: null,
    o_canvas__fits_autostretched: null,
    o_state_o_js_roi: {
        s_hey: 'hey', 
        s_title: 'ROI - Region of Interest', 

    }
};
let f_update_o_notification_and_render = function(
    s_class,
    s_text, 
    n_ms_timeout
    ){
    console.log('f_update_o_notification_and_render called')
    o_state?.a_o_notification.push(o_state?.o_notification);
    o_state.o_notification = new O_notification(
        s_class,
        s_text
    )
    o_state.o_notification.b_render = true;
    clearTimeout(o_state.o_notification.n_id_timeout);
    o_js__notification?._f_render();

    if(n_ms_timeout){
        o_state.o_notification.n_id_timeout = window.setTimeout(function(){
            // debugger
            o_state.o_notification.b_render = false;
            o_js__notification?._f_render();
        },n_ms_timeout)
    }
}

function getCSSScaleFactor(canvas) {
    const rect = canvas.getBoundingClientRect();
    return rect.width / canvas.width; // Assuming aspect ratio is preserved, we only need one dimension
}

let f_resize_canvas = function(){
    let viewportRatio = window.innerWidth / window.innerHeight;
    let imageRatio = o_state.o_canvas.width / o_state.o_canvas.height;

    if (imageRatio > viewportRatio) {
        // If the image is wider than the viewport
        o_state.o_canvas.style.width = '100vw';
        o_state.o_canvas.style.height = 'auto';
    } else {
        // If the image is taller than the viewport or equal
        o_state.o_canvas.style.width = 'auto';
        o_state.o_canvas.style.height = '100vh';
    }
    o_state.n_scl_canvas = 1
    o_state.n_trn_x__canvas = 0
    o_state.n_trn_y__canvas = 0
    
}
window.onresize = function(){
    f_resize_canvas()
}
let o_o_state_o_js_s_css_roi = null;
window.Victor = Victor
let f_o_o_state_o_js_s_css = function(
    o_state, 
    o_js__content, 
){
    let o_js = null;
    Object.assign(
        o_state, 
        {
            o_trn: Victor(0,0),
            o_scl: Victor(400, 400),
            b_display_content: true,
            b_mousedown_resizer: false, 
            b_mousedown_top_bar: false, 
            o_trn_mousedown_top_bar: Victor(),
            o_trn_mousedown_resizer: Victor(),
            o_trn_mouse_mousemove_last: Victor()
        }
    );
    let n_ts = new Date().getTime();
    let s_id = `id_${n_ts}_${parseInt(Math.random())}`
    
    o_js = {
            f_o_js: function(){
                let f_s_style = function(){
                    return `cursor:move;position:fixed;top:${o_state.o_trn.y}px;left:${o_state.o_trn.x}px;width:${o_state.o_scl.x}px;height:${o_state.o_scl.x}px`
                }
                return {
                    id: s_id, 
                    style: f_s_style(),
                    class: "classic_window",
                    a_o: [
                        {
                            
                            class: "top_bar", 
                            onmousedown: (o_e)=>{
                                o_state.b_mousedown_top_bar = true
                                o_state.o_trn_mousedown_top_bar = Victor(
                                    o_e.clientX,
                                    o_e.clientY,
                                )

                            },
                            onmouseup: ()=>{o_state.b_mousedown_top_bar = false},
                            onmouseout: ()=>{o_state.b_mousedown_top_bar = false},
                            onmousemove: (o_e)=>{
                                let o_trn_mouse =  Victor(
                                    o_e.clientX,
                                    o_e.clientY
                                    )
                                if(o_state.b_mousedown_top_bar){
                                    let o_trn_diff = o_state.o_trn_mouse_mousemove_last.clone().subtract(
                                        o_trn_mouse
                                    )
                                    o_state.o_trn = o_state.o_trn.clone().subtract(
                                            o_trn_diff
                                    );
                                    document.querySelector(`#${s_id}`).style = f_s_style();

                                }
                                o_state.o_trn_mouse_mousemove_last = o_trn_mouse.clone()
                            },
                            a_o: [
                                {
                                    class: "bg_blue",
                                    innerText: o_state.s_title
                                }, 
                                {
                                    class: 'bg_blue',
                                    style: "display:flex",
                                    a_o:[
                                        {
                                            class: "minimize", 
                                            a_o:[
                                                {}
                                            ],
                                            onclick: function(){
                                                o_state.b_display_content = !o_state.b_display_content
                                                o_js?._f_render();
                                            }
                                        },
                                        {
                                            class: "maximize", 
                                            a_o:[
                                                {}
                                            ]
                                        }, 
                                        {
                                            class: "close", 
                                            a_o:[
                                                {}
                                            ]
                                        },
                                    ]
                                }
    
                            ]
                        }, 
                        {
                            style: `display: ${(o_state.b_display_content) ? 'flex': 'none'}`,
                            class: 'content', 
                            a_o:[
                                o_js__content, 
                                {
                                    class: "resizer", 
                                    onmousedown: ()=>{o_state.b_mousedown_resizer = true},
                                    onmouseup: ()=>{o_state.b_mousedown_resizer = false},
                                    onmouseout: ()=>{o_state.b_mousedown_resizer = false},
                                }
                            ]
                        }
                    ]
                }
            }
        }
    return o_js;

}


o_o_state_o_js_s_css_roi = f_o_o_state_o_js_s_css(
    o_state.o_state_o_js_roi,
    {
        f_o_js: function(){
            return {
                innerText: 'ROI - Region of Interest',
                onclick: function(){
                    o_state.o_state_o_js_roi.s_hey = Math.random().toString()
                    o_state.o_state_o_js_roi.s_title = Math.random().toString()
                    o_js__everything?._f_render()
                }
            }
        }
    }
)

    o_js__inputs = {
        f_o_js: function(){
            return {
                class: 'inputs',
                a_o:[
                    {
                        class: "p-1_rem",
                        style: 'display:flex;align-items:center',
                        a_o:[
                            {
                                s_tag: "input", 
                                type: "file",
                                class: "input clickable",
        
                                onchange: function(){
                                    let o_freader = new FileReader();
                                    o_freader.onload = async function() {
                                    
                                        let o_array_buffer = this.result;
                                        let a_n_u8 = new Uint8Array(o_array_buffer);
                                        f_update_o_notification_and_render('loading','parsing fits...')
                                        let b_strict = false;
                                        try {
                                            o_state.o_file__fits = await f_o_file__fits__from_a_n_u8(a_n_u8, b_strict);
                                        } catch (error) {
                                            
                                            f_update_o_notification_and_render('error',"Could not parse fits!", 1000);
                                            return 
                                        }
                                        f_update_o_notification_and_render('success',"Loaded fits!", 1000);
                                        o_state.o_canvas__fits = f_o_canvas_nonmanipulated__from_o_file__fits(o_state?.o_file__fits);
                                        o_state.o_canvas.width = o_state.o_canvas__fits.width;
                                        o_state.o_canvas.height = o_state.o_canvas__fits.height;
                                        o_state.o_ctx_2d.drawImage(o_state.o_canvas__fits, 0, 0);         
                                        f_update_o_notification_and_render('loading',"Performing autostretch...");
                                        o_state.o_canvas__fits_autostretched  = await  f_o_canvas_autostretched__from_o_file__fits(o_state.o_file__fits);
   
                                        f_update_o_notification_and_render('success',"Autostretch successfull!", 1000);
                                        o_state.o_canvas.width = o_state.o_canvas__fits_autostretched.width;
                                        o_state.o_canvas.height = o_state.o_canvas__fits_autostretched.height;
                                        o_state.o_ctx_2d.drawImage(o_state.o_canvas__fits_autostretched, 0, 0);  
                                        f_resize_canvas();
                         
                                    }
                                    f_update_o_notification_and_render('loading','loading file from computer...')
                                    o_freader.readAsArrayBuffer(this.files[0]);
                                }
                            },
                            {
                                s_tag: "label", 
                                class: "pl-3_rem",
                                innerText: "File"
                            }
                        ]
                    },
                    {
                        class: "p-1_rem",
                        style: 'display:flex;align-items:center',
                        a_o:[
                            {
                                s_tag: 'input', 
                                placeholder: o_state.s_url,//'https://....fits',
                                class: "input clickable",
                                type: "text", 
                                oninput: function(){
                                    o_state.s_url = this.value
                                    window.clearTimeout(o_state.n_id_timeout_s_url)
                                    o_state.n_id_timeout_s_url = window.setTimeout(
                                        async function(){
                                            f_update_o_notification_and_render('loading','loading file from url...')
                                            let a_n_u8 = null;
                                            try {
                                                a_n_u8 = await f_a_n_u8__from_s_url(o_state.s_url);
                                                f_update_o_notification_and_render('loading','parsing fits ...')
                                                let o_file__fits = await f_o_file__fits__from_a_n_u8(a_n_u8, false);
                                                console.log(o_file__fits);
                                                
                                            } catch (error) {
                                                f_update_o_notification_and_render('error', error.toString())
                                            }
                                            if(!a_n_u8){
                                                f_update_o_notification_and_render('error', 'could not load fits from this url, try downloading it and then use file picker')
                                            }

                                            
                                        }, o_state.n_ms_timeout_s_url)
                                }
                            },
                            {
                                s_tag: "label", 
                                class: "pl-3_rem",
                                innerText: "URL",
                                oninput: function(){

                                }
                            }
                        ]
                    },
                    
                ]
            }
        }
    }

    let f_render_canvas = function(){
        o_state.o_ctx_2d.clearRect(0, 0, o_state.o_canvas.width, o_state.o_canvas.height);
        o_state.o_ctx_2d.save();
        // o_state.o_ctx_2d.translate(o_state.o_canvas.width/2, o_state.o_canvas.width/2);
        o_state.o_ctx_2d.translate(o_state.n_trn_x__canvas, o_state.n_trn_y__canvas);
        o_state.o_ctx_2d.scale(o_state.n_scl_canvas, o_state.n_scl_canvas);

        o_state.o_ctx_2d.drawImage(o_state.o_canvas__fits_autostretched, 0, 0);
        o_state.o_ctx_2d.restore();
        o_state.o_ctx_2d.imageSmoothingEnabled = false;
    }

    o_js__notification = {
        f_o_js: function(){
            return {
                style: `display: ${(o_state?.o_notification?.b_render) ? 'flex': "none"}`,
                class: `o_notification ${o_state?.o_notification?.s_class} p-2_rem`, 

                a_o:[
                    {
                        class: `pr-2_rem ${o_state?.o_s_state_s_class_font_awesome[o_state?.o_notification?.s_class]}`, 
                    },
                    {
                        innerText: o_state?.o_notification?.s_text,
                    }
                ]
            }
        }
    }
    window.o_not = o_js__notification
    o_js__everything = {
        f_o_js: function(){
            return {
            
                a_o: [
                    o_o_state_o_js_s_css_roi,
                    {
                        class: "fullscreen", 
                        a_o: [
                            {
                                s_tag: "canvas",
                                class: "background_image", 
                            },
                        ]
                    },
                    o_js__inputs,
                    o_js__notification,
                ]
            }
        }
    }
    let o = {
        a_o:[
            o_js__everything
        ]
    }

    var o_html = f_o_html_from_o_js(o);
    

    

    document.body.className = 'theme_dark'
    document.body.appendChild(o_html)

    o_state.o_canvas = document.querySelector("canvas");
    o_state.o_ctx_2d = o_state.o_canvas.getContext('2d');
    o_state.o_ctx_2d.imageSmoothingEnabled = false;

    o_state.o_canvas.onwheel = function (event) {

        const scaleFactor = getCSSScaleFactor(o_state.o_canvas);
        const n_trn_x__mouse = (event.clientX - o_state.o_canvas.getBoundingClientRect().left)/scaleFactor;
        const n_trn_y__mouse = (event.clientY - o_state.o_canvas.getBoundingClientRect().top)/scaleFactor;
    
        // Normalize wheel delta across browsers
        let delta = event.deltaY ? (-event.deltaY / 3) : event.wheelDelta;
    
        // Calculate the zoom factor
        const n_zoom_factor = Math.exp(delta * 0.003);
    
        // Calculate the new scale
        const n_scl_canvas_new = o_state.n_scl_canvas * n_zoom_factor;

    
        // Adjust offsets to account for mouse position
        const n_dx = (n_trn_x__mouse - o_state.n_trn_x__canvas) * (n_scl_canvas_new - o_state.n_scl_canvas) / o_state.n_scl_canvas;
        const n_dy = (n_trn_y__mouse - o_state.n_trn_y__canvas) * (n_scl_canvas_new - o_state.n_scl_canvas) / o_state.n_scl_canvas;
    
        // Update offsets to keep the point under the mouse fixed
        o_state.n_trn_x__canvas -= n_dx;
        o_state.n_trn_y__canvas -= n_dy;

        // Update scale
        o_state.n_scl_canvas = n_scl_canvas_new;

        f_render_canvas();

        // Prevent page scroll
        event.preventDefault();
    };

    o_state.o_canvas.onmousedown = function(event) {
        o_state.b_mousedown_canvas = true;
        let o_rect = o_state.o_canvas.getBoundingClientRect();
        const n_trn_x__mouse = (event.clientX - o_rect.left);
        const n_trn_y__mouse = (event.clientY - o_rect.top);

        o_state.n_trn_x__mouse_last= n_trn_x__mouse
        o_state.n_trn_y__mouse_last= n_trn_y__mouse
        o_state.n_trn_x__canvas_start= o_state.n_trn_x__canvas
        o_state.n_trn_y__canvas_start= o_state.n_trn_y__canvas


        
    };
    
    o_state.o_canvas.onmousemove = function(event) {
        if(o_state.b_mousedown_canvas){

            let o_rect = o_state.o_canvas.getBoundingClientRect();
            const n_trn_x__mouse = (event.clientX - o_rect.left);
            const n_trn_y__mouse = (event.clientY - o_rect.top);
    
            const dxInViewportSpace = n_trn_x__mouse - o_state.n_trn_x__mouse_last;
            const dyInViewportSpace = n_trn_y__mouse - o_state.n_trn_y__mouse_last;

            const dxInCanvasSpace = dxInViewportSpace * (o_state.o_canvas.width / o_rect.width);
            const dyInCanvasSpace = dyInViewportSpace * (o_state.o_canvas.height / o_rect.height);
    
            o_state.n_trn_x__canvas = o_state.n_trn_x__canvas_start + dxInCanvasSpace;
            o_state.n_trn_y__canvas = o_state.n_trn_y__canvas_start + dyInCanvasSpace;
            
            // // Calculate the difference in position directly
            // const intrinsicScaleFactor = o_state.o_canvas.width / o_rect.width;
            // const dx = (n_trn_x__mouse - o_state.n_trn_x__mouse_last) * intrinsicScaleFactor;
            // const dy = (n_trn_y__mouse - o_state.n_trn_y__mouse_last) * intrinsicScaleFactor;
    
            // // Adjust the offsets directly with dx and dy
            // o_state.n_trn_x__canvas = o_state.n_trn_x__mouse_last + dx;
            // o_state.n_trn_y__canvas = o_state.n_trn_y__mouse_last + dy;
    
            // // // Set the last position to the current position
            // o_state.n_trn_x__mouse_last = n_trn_x__mouse;
            // o_state.n_trn_y__mouse_last = n_trn_y__mouse;
        }

        // Calculate the canvas coordinates
        o_state.n_trn_x__pixel_hovered = parseInt((event.clientX - o_state.o_canvas.getBoundingClientRect().left - o_state.n_trn_x__canvas) / o_state.n_scl_canvas);
        o_state.n_trn_y__pixel_hovered = parseInt((event.clientY - o_state.o_canvas.getBoundingClientRect().top - o_state.n_trn_y__canvas) / o_state.n_scl_canvas);

        console.log("Canvas coordinates:", o_state.n_trn_x__pixel_hovered, o_state.n_trn_y__pixel_hovered);

        f_render_canvas();

        event.preventDefault();
    };
    
    o_state.o_canvas.onmouseup = function(event) {
        o_state.b_mousedown_canvas = false;
    };
    o_state.o_canvas.onmouseout = function(event) {
        o_state.b_mousedown_canvas = false;
    };



    f_add_css('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
    class O_hsla{
        constructor(n_h, n_s, n_l, n_a){
            this.n_h = n_h
            this.n_s = n_s
            this.n_l = n_l
            this.n_a = n_a
        }
    }
    let s_theme_light = 'theme_light'
    let s_theme_dark = 'theme_dark'
    let a_s_theme = [
        s_theme_light,
        s_theme_dark
    ]
    let o_themes_props = {
        // foreground
        //      light
        [`o_hsla__fg${s_theme_light}`]:                 new O_hsla(.0, .0, .1, .93), 
        [`o_hsla__fg_hover${s_theme_light}`]:           new O_hsla(.0, .0, .1, .93), 
        [`o_hsla__fg_active${s_theme_light}`]:          new O_hsla(.0, .0, .1, .93), 
        [`o_hsla__fg_active_hover${s_theme_light}`]:    new O_hsla(.0, .0, .1, .93), 
        //      dark
        [`o_hsla__fg${s_theme_dark}`]:                 new O_hsla(.0, .0, .8, .93), 
        [`o_hsla__fg_hover${s_theme_dark}`]:           new O_hsla(.0, .0, .9, .93), 
        [`o_hsla__fg_active${s_theme_dark}`]:          new O_hsla(.0, .0, .9, .93), 
        [`o_hsla__fg_active_hover${s_theme_dark}`]:    new O_hsla(.0, .0, .9, .93), 
        
        [`o_hsla__bg${s_theme_light}`]:                 new O_hsla(.0, .0, .1, .93), 
        [`o_hsla__bg_hover${s_theme_light}`]:           new O_hsla(.0, .0, .1, .93), 
        [`o_hsla__bg_active${s_theme_light}`]:          new O_hsla(.0, .0, .1, .93), 
        [`o_hsla__bg_active_hover${s_theme_light}`]:    new O_hsla(.0, .0, .1, .93), 
        // 
        [`o_hsla__bg${s_theme_dark}`]:                 new O_hsla(.0, .0, .1, .93), 
        [`o_hsla__bg_hover${s_theme_dark}`]:           new O_hsla(.0, .0, .2, .93), 
        [`o_hsla__bg_active${s_theme_dark}`]:          new O_hsla(.0, .0, .2, .93), 
        [`o_hsla__bg_active_hover${s_theme_dark}`]:    new O_hsla(.0, .0, .2, .93), 

    };

    let f_s_hsla = function(o_hsla){
        return `hsla(${360*o_hsla?.n_h} ${o_hsla?.n_s*100}% ${o_hsla?.n_l*100}% / ${o_hsla?.n_a})`
    }
    
    let s_core_css = `
    ${a_s_theme.map(s_theme =>{
        let o_theme_props = Object.assign(
            {}, 
            ...Object.keys(o_themes_props).filter(s=>s.includes(s_theme)).map(
                s_prop => {
                    let s_prop_without_s_theme = s_prop.replace(s_theme, '');

                    return {
                        [s_prop_without_s_theme]: o_themes_props[s_prop], 
                    }
                }
            )
        )
        return `
            .${s_theme} *{
                background: ${f_s_hsla(o_theme_props.o_hsla__bg)};
                color: ${f_s_hsla(o_theme_props.o_hsla__fg)};
            }
            .${s_theme} .clickable{
                padding:1rem;
                border-radius:3px;
            }
            .${s_theme} .clickable:hover{
                background: ${f_s_hsla(o_theme_props.o_hsla__bg_hover)};
                color: ${f_s_hsla(o_theme_props.o_hsla__fg_hover)};
                cursor:pointer;
            }
            .${s_theme} .input{
                border: 1px solid ${f_s_hsla(o_theme_props.o_hsla__bg_hover)};
            }
            .${s_theme} .clickable.clicked{
                background: ${f_s_hsla(o_theme_props.o_hsla__bg_active)};
                color: ${f_s_hsla(o_theme_props.o_hsla__fg_active)};
                cursor:pointer;
            }
            .${s_theme} .clickable.clicked:hover{
                background: ${f_s_hsla(o_theme_props.o_hsla__bg_active_hover)};
                color: ${f_s_hsla(o_theme_props.o_hsla__fg_active_hover)};
                cursor:pointer;
            }
        `
    }).join("\n")}
    .position_relative{
        position:relative
    }
    .o_js_s_name_month_n_year{
        position:absolute;
        top:100%;
        left:0;
        width:100%;
    }
    input, button{
        border:none;
        outline:none;
        flex: 1 1 auto;
    }

    .input{
        display:flex;
    }

    .d_flex{
        display: flex;
        flex-wrap: wrap;
    }

    .w_1_t_7{
        align-items: center;
        display: flex;
        justify-content: center;
        flex: 1 1 calc(100%/7);
    }

    .w_1_t_3{
        align-items: center;
        display: flex;
        justify-content: center;
        flex:1 1 calc(100%/3);
    }
    *{
        font-size: 1.2rem;
        color: rgb(25 25 25 / 50%);
        background:white;
        padding: 0;
        margin:0;
    }
    .border_shadow_popup{
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
    .theme_dark .border_shadow_popup{
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    }
    *{
        font-family:helvetica;
    }
    .info, .info *{
        color: #004085;
        background-color: #cce5ff;
        border-color: #b8daff;
    }
    .loading, .loading *{
        color: #004085;
        background-color: #cce5ff;
        border-color: #b8daff;
    }
    .success, .success *{
        color: #155724;
        background-color: #d4edda;
        border-color: #c3e6cb;
    }
    .error, .error *{
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb;
    }
    .warning, .warning *{
        color: #856404;
        background-color: #fff3cd;
        border-color: #ffeeba;
    }
    .spinn_360_degrees_infinity{
        <i class="fa-solid fa-spinner"></i>
    }
    .o_notification {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        padding: 2rem;
        opacity: 0.8;
        align-items: center;
        justify-content: center;
    }
    ${(new Array(40).fill(0)).map(
        function(n, n_idx){
            let num = (n_idx /10)
            let s_n = num.toString().split('.').join('_');
            return `
                .p-${s_n}_rem{padding: ${num}rem}
                .pl-${s_n}_rem{padding-left: ${num}rem}
                .pr-${s_n}_rem{padding-right: ${num}rem}
                .pt-${s_n}_rem{padding-top: ${num}rem}
                .pb-${s_n}_rem{padding-bottom: ${num}rem}
            `
        }
    ).join("\n")} `;
    console.log(s_core_css)
    let s_css = `
            ${s_core_css}
            .fullscreen{
                width: 100vw;
                height: 100vh;
                overflow:hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .inputs{
                position:fixed;
                width: 100%;
                height: auto;
                bottom:0;
                opacity:0.4;
            }
            canvas{
                max-width: 100vw;
                max-height: 100vh;
                object-fit: contain;
            }

            .classic_window{
                box-shadow: 3px 3px 8px 2px black;
            }
            .minimize, .maximize {
                margin: 0rem .2rem;
                background:#1a1a1a !important;
                width: 1.2rem;
                height: 1.2rem;
                border: 3px outset;
                box-shadow: 1px 2px 0px 1px black;
                position: relative;
            }
            .minimize:active, .maximize:active{
                border:inset;
            }

            .minimize > div {
                width: 50%;
                height: 16%;
                background: #9a9a9a;
                position: absolute;
                top: 75%;
                left: 50%;
                transform:translate(-50%, -50%)
            }
            .maximize > div {
                height: 50%;
                width: 50%;
                border:2px solid #9a9a9a;
                border-top:4px solid ;
                position: absolute;
                top: 50%;
                left: 50%;
                transform:translate(-50%, -50%)
            }
            .top_bar{
                display:flex;
                padding: 0.5rem;
                justify-content: space-between;
            }
            .top_bar, .bg_blue{
                background:blue;
            }

            
    `;
    // let s_css_prefixed = f_s_css_prefixed(
    //     s_css,
    //     `.${s_version_class}`
    // );
    f_add_css(s_css)