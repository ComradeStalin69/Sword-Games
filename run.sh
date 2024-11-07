echo "Ensuring old server instances are closed..."
pkill node
pkill java
pkill nginx
rm -rf nginx.conf
echo "Starting proxy..."
cd proxy
npm i
node index.js &
echo "Starting NGINX server..."
cd ..
if [ ! -d '/tmp/nginx' ]; then
    mkdir /tmp/nginx
fi
cat ~/$REPL_SLUG/nginx.conf.template > ~/$REPL_SLUG/nginx.conf
sed -i "s/SLUG/${REPL_SLUG}/" nginx.conf
nginx -c ~/$REPL_SLUG/nginx.conf -g 'daemon off; pid /tmp/nginx/nginx.pid;' -p /tmp/nginx -e /tmp/nginx/error.log > /tmp/nginx/output.log 2>&1 &
echo "Starting server..."
cd server
java -Xmx512M -jar server.jar
echo "Cleaning up before exitting..."
nginx -s stop -c ~/$REPL_SLUG/nginx.conf -g 'daemon off; pid /tmp/nginx/nginx.pid;' -p /tmp/nginx -e /tmp/nginx/error.log
pkill java
pkill nginx