/**********************************************************************
 require( 'tp4.popup' )
 -----------------------------------------------------------------------
 Display a little popup of 320x480 with a header, a close button and a
 scrollable body.

 **********************************************************************/
var DOM = require( "dom" );


module.exports = function( caption, content, options ) {
    if( typeof options === 'undefined' ) options = {};
    if( typeof options.background === 'undefined' ) options.background = '#fff';
    
    var header = DOM.div( 'header', [caption] );
    var btnExpand = DOM.svgRoot( 'btnExpand', {
        viewBox: "-5 -5 15 15"
    }, [
        DOM.svg( 'path', {
            fill: 'none', stroke: '#000', 'stroke-linecap': 'round', 'stroke-width': 1,
            d: "M-2,0H5V4H-2ZM7,2V6H0"
        })
    ]);
    var btnClose = DOM.svgRoot( 'btnClose', {
        viewBox: "-5 -5 15 15"
    }, [
        DOM.svg( 'path', {
            fill: 'none', stroke: '#000', 'stroke-linecap': 'round', 'stroke-width': 2,
            d: "M0,0l5,5M0,5l5,-5"
        })
    ]);
    var body = DOM.div( 'body' );
    body.style.background = options.background;
    DOM.add( body, content );
    var screen = DOM.div( 'tp4-popup', [DOM.div( 'container' , [btnExpand, header, btnClose, body])] );
    
    document.body.appendChild( screen );

    function close() {
        document.body.removeChild( screen );
    }

    DOM.on( [screen, btnClose], close );
    DOM.on( body, null );
    DOM.on( btnExpand, function() {
        DOM.toggleClass( screen, 'fullscreen' );
    });
    return close;
};
