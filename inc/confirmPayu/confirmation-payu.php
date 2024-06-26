<?php

if (isset($_POST)) {
    init($_POST);
}

function init($post)
{
    extract($post);
	setRequestData($post);
	if($response_code_pol === "1"){
		$response = json_decode(authentication());
		if (isset($response) && $response->statusCode == 1) {
			$authorization_Number = null;
			if ($authorization_code) {
				$authorization_Number = $authorization_code;
			} else if ($reference_sale) {
				$authorization_Number = $reference_sale;
			}

			setPayment($reference_sale, $authorization_Number, $value, $email_buyer, $response->data->token, $payment_method_name);
		}
	}
}

function authentication()
{
    try {
        $response = null;
        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://apis.bolivariano.com.co/authentication/V1/Authentication/UserLogin',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '{
            "username": "CBUS-85271",
            "password": "Tst!8u774C"
            }',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);
    } catch (Exception $e) {
        setLogError($e->getMessage());
    } finally {
        return $response;
    }
}

function setPayment($reference_sale, $authorization_Number, $value, $email_buyer, $token = "", $payment_method_name)
{
    try {
        setLogTransaction($payment_method_name);
        $paymentMethod = checkPaymentMethod($payment_method_name);
        setLogTransaction($payment_method_name);
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://apis.bolivariano.com.co/clientsebolweb/V1/Sales/SetPayment',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '
            {
              "purshaseId": "' . $reference_sale . '",
              "authorizationNumber": "' . $authorization_Number . '",
              "franchiseCode": "' . $paymentMethod . '",
              "franchiseName": "' . $paymentMethod . '",
              "targetNumber": "0",
              "paidValue": "' . $value . '",
              "saleUser": "' . $email_buyer . '",
          }',
            CURLOPT_HTTPHEADER => array(
                'Content-Type: application/json',
                'Authorization: Bearer ' . $token,
            ),
        ));

        $response = curl_exec($curl);
        curl_close($curl);

        if ($response->statusCode === 0) {
            throw new Exception($response->message);
        }

        setLogTransaction($response);
        echo $response;
    } catch (Exception $e) {
        setLogError($e->getMessage());
    }
}

function checkPaymentMethod($method = null)
{

    if ($method == null) {
        return "";
    }

    $paymentMethod = array(
        "MASTERCARD" => "RM_MC",
        "VISA" => "V_VBV",
        "PSE" => "_PSE_",
        "EFECTY" => "BL",
        "OTHERS_CASH" => "BL");

    foreach ($paymentMethod as $key => $value) {
        if (strtolower($key) == strtolower($method)) {
            return $value;
        }
    }

}

function setLogError($exception = null)
{
    $today = date("d-m-Y");
    $content = $reference_sale . ': ' . $exception;
    $file_handle = fopen('log/' . $today . '-exception.txt', 'w');
    fwrite($file_handle, $exception . PHP_EOL);
    fclose($file_handle);
}

function setLogTransaction($transaction = "")
{
    $today = date("d-m-Y");
    $content = $reference_sale . ': ' . $transaction;
    $file_handle = fopen('log/' . $today . '-transaction.txt', 'w');
    fwrite($file_handle, $transaction . PHP_EOL);
    fclose($file_handle);
}

function setRequestData($post)
{
    $json_string = json_encode($post);

    $file_handle = fopen('requestData.json', 'w');
    fwrite($file_handle, $json_string);
    fclose($file_handle);
}
