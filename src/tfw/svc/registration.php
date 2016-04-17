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
 * 4: Tmp successfull.

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
    if( $svc == 'tmp' ) {
        // Medical Portal.
        return execTmp( $args );
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
        $args['appointments'] = Array();
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
    if( isset( $data['$portal'] ) ) {
        error_log( "This is for portal" );
        $id = $data['$portal'];
        $data = $sys->loadJSON( $id );
        $data['$portal'] = 1;
    }
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


function execTmp( $args ) {
    $id = $args['id'];
    $target = $args['target'];
    $sys = new SystemData( 'pri' );
    $sys->saveJSON( $id, Array( '$portal' => $target ) );
    return 4;
}

?>
