<?php

if (!empty($_POST['email'])) {
    file_put_contents('emails', strtolower(trim($_POST['email'])) . "\r\n", FILE_APPEND);
}
