upstream mms {
   server 127.0.0.1:8081;
}

server {
   listen 80;
   server_name www.zhangtudou.com;
   return 301 https://www.zhangtudou.com$request_uri;
}

server {
   listen 443;
   server_name www.zhangtudou.com;
   ssl on;
   ssl_certificate /etc/nginx/ssl/1_www.zhangtudou.com_bundle.crt;
   ssl_certificate_key /etc/nginx/ssl/2_www.zhangtudou.com.key;
   ssl_session_timeout 5m;
   ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #按照这个协议配置
   ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;#按照这个套件配置
   ssl_prefer_server_ciphers on;
   if ($ssl_protocol = "") {
        rewrite ^(.*) https://$host$1 permanent;
   }
   location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://mms;
        proxy_redirect off;
   }

   location ~* ^.+\.(jpg|jpeg|gif|png|ico|css|js|pdf|txt|html) {
        root /home/mms/dist;
   }

}
