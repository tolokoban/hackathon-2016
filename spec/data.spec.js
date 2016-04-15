var Data = require("data");


describe('DATA', function() {
    beforeEach(function() {
        Data.reset();
    });
    
    it('should set/get simple data', function() {
        Data.set( "a", 27 );
        expect( Data.get( "a" ) ).toBe( 27 );
    });

    it('should set/set structured data', function() {
        Data.set( "a.name", "Foobar" );
        expect( Data.get( "a.name" ) ).toBe( "Foobar" );
        expect( Data.get( "a" ) ).toEqual({ name: "Foobar" });
    });

    it('should create empty arrays with keys', function() {
        var arr = [];
        Data.set( "arr", arr );
        Data.push( "arr", 27 );
        expect( arr.$key ).toBe( 2 );
    });

    it('should retrieve element of an array based on key', function() {
        Data.set( "arr", [1, 2, { hop: true }] );
        Data.log( true );
    });

});
