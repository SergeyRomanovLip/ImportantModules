
<?php
$recaptcha = $_POST['g-recaptcha-response'];


    if(!empty($recaptcha))
        {
            $secret='KEY'; //HERE IS SHOULD BE A YOUR SERVER PRIVATE KEY
            $res=file_get_contents('https://www.google.com/recaptcha/api/siteverify?secret='.$secret.'&response='.$recaptcha);
            $res= json_decode($res, true);

            $name = $_POST['name'];
            $text = $_POST['text'];

            $name = htmlspecialchars($name);
            $text = htmlspecialchars($text);
            $today = date("Y-m-d H:i:s");
            $to = "sergey.romanov.lip@yandex.ru";
            $subject = "Обратная связь (с сайта)";
            $message = '<p><b>Дорогой получатель!</b><br>
            Вам пришла обратная связь с сайта rsvisualstudio.ru!</p>
            <p><b>Отправитель:</b> '.$name.'</p>
            <p><b>Отправлено:</b> '.$today. '</p>
            <p><b>Текст письма:</b> '.$text.'</p>';
            $headers  = "Content-type: text/html\r\n"; 
            $headers .= "From: info@rsvisualstudio.ru\r\n"; 
            $headers .= "Reply-To: info@rsvisualstudio.ru\r\n"; 
            if (mail($to, $subject, $message, $headers)) {echo json_encode('Сообщение успешно отправлено, большое спасибо!');}else{echo json_encode('Не удачно');}

}else
{
    echo json_encode ('Вы не прошли проверку reCaptcha');
}
 ?>