<?php
if(isset($_POST)):
  // form validation vars
  $formok = true;
  $errors = array();

  // sumbission data
  $ipaddress = $_SERVER['REMOTE_ADDR'];
  $date      = date('d/m/Y');
  $time      = date('H:i:s');

  // form data
  $data = json_decode(file_get_contents("php://input"));
  $name    = $data->name;
  $email   = $data->email;
  $message = $data->message;

  // validate form data
  // validate name is not empty
  if(empty($name)):
    $formok   = false;
    $errors[] = 'You have not entered a name';
  endif;

  // validate email address is not empty
  if(empty($email)):
    $formok   = false;
    $errors[] = 'You have not entered an email address';
  // validate email address is valid
  elseif(!filter_var($email, FILTER_VALIDATE_EMAIL)):
    $formok   = false;
    $errors[] = 'You have not entered a valid email address';
  endif;

  // validate message is not empty
  if(empty($message)):
    $formok   = false;
    $errors[] = 'You have not entered a message';
  endif;

  // send email if all is ok
  if($formok):
    // Send myself an email
    $headers = "From: nicolas@nddery.ca" . "\r\n";
    $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

    $body = "<p>Yo! Ta un message!</p>
      <p><strong>Nom: </strong> {$name} </p>
      <p><strong>Courriel: </strong> {$email} </p>
      <p><strong>Message: </strong> {$message} </p>
      <p><smal>{$ipaddress} le {$date} &agrave; {$time}</small></p>";

    mail("nddery@gmail.com", "cashmoney - message", $body, $headers);

    // if(isset($data->copy))
    //   mail($data->email, "nicolas@nddery.ca - your copy", $copy_body, $headers);
  endif;

  // And tell the world.
  // Angularjs $http protection against JSON vulnerabilities.
  echo ")]}',\n" . json_encode(array(
    'form_ok' => $formok,
    'errors' => $errors
  ));
endif;
