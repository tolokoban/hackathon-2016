<?php
$ROLE = "";


/****************************************

@example
["new", {"email":..., "firstname":..., ...}]
["set", {"id":..., "firstname":..., ...}]
["get", "3ab1c56fadd51711d1d94cc18aa37d8d"]

@return
* -1: Unknown service.
* -2: Unknown ID.
* 1: New registration. 
* 2: Already registred.
* 3: Set successfull.

 ****************************************/

function execService( $inputs ) {
    $svc = $inputs[0];
    $args = $inputs[1];

    if( $svc == 'new' ) {
        return execNew( $args );
    }
    if( $svc == 'get' ) {
        return execGet( $args );
    }
    if( $svc == 'set' ) {
        return execSet( $args );
    }
    return -1;
}


function execNew( $args ) {
error_log( "NEW" );
error_log( json_encode( $args ) );
    $id = md5( $args['email'] );
    $sys = new SystemData( 'pri' );
    $mail = new Mail();
    $data = $sys->loadJSON( $id );
    if( !$data ) {
        // This is a real new patient.
        $args['planning'] = Array(
            Array( 'date' => '2016-04-11',
                   'name' => 'X-Ray-SA',
                   'address' => 'X-Ray SA, Promenade des Artisans 24, 1217 Meyrin' ),
            Array( 'date' => '2016-04-15',
                   'name' => 'HUG',
                   'address' => 'Hôpital Universitaire de Genève, Rue Gabrielle-Perret-Gentil 4, 1205 Genève' )
        );
error_log( "A" );
        $sys->saveJSON( $id, $args );
error_log( "B" );
        $mail->send( $args['email'], "[OHGOHRT3] New registration",
                     "<p>Dear " . $args['firstname'] . " " . $args['lastname'] . ",</p>"
                   . "<p>You registred successfully and here is your QRCode:</p>"
                   . "<a href='http://tolokoban.org/hackathon/?$id'>"
                   . "<img src='http://tolokoban.org/hackathon/css/qrcode/qrcode.php?id=$id'></a>" );
error_log( "C" );
        return 1;
    } else {
        $mail->send( $args['email'], "[OHGOHRT3] New registration",
                     "<p>Dear " . $args['firstname'] . " " . $args['lastname'] . ",</p>"
                   . "<p>You are already registred and here is your QRCode:</p>"
                   . "<a href='http://tolokoban.org/hackathon/?$id'>"
                   . "<img src='http://tolokoban.org/hackathon/css/qrcode/qrcode.php?id=$id'></a>" );
        return 2;
    }
    
}


function execGet( $args ) {
    $id = $args;
    $sys = new SystemData( 'pri' );
    $data = $sys->loadJSON( $id );
    return $data;
}


function execSet( $args ) {
    $id = $args['id'];
    $sys = new SystemData( 'pri' );
    $data = $sys->loadJSON( $id );
    if( !$data ) return -2;
    foreach( $args as $key => $val ) {
        if( $key != 'id' ) {
            $data[$key] = $val;
        }
    }
    $sys->saveJSON( $id, $data );
    return 3;
}

?>
