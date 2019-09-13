The web server:

On the opposite side of the communication channel, is the server, which serves the document as requested by the client. A server appears as only a single machine virtually: this is because it may actually be a collection of servers, sharing the load (load balancing) or a complex piece of software interrogating other computers (like cache, a DB server, or e-commerce servers), totally or partially generating the document on demand.

A server is not necessarily a single machine, but several server software instances can be hosted on the same machine. With HTTP/1.1 and the Host header, they may even share the same IP address.

Proxies:

Between web servers and browsers numerous computers and machines relay HTTP messages. Those operating at transport layer are called HTTP Proxies,
 These can be transparent, forwarding on the requests they receive without altering them in any way, or non-transparent, in which case they will change the request in some way before passing it along to the server. Proxies may perform numerous functions:

caching (the cache can be public or private, like the browser cache)
filtering (like an antivirus scan or parental controls)
load balancing (to allow multiple servers to serve the different requests)
authentication (to control access to different resources)
logging (allowing the storage of historical information)

Echo server:

In nodejs request and response are readable and writable stream respectively.
Reference: https://debugmode.net/2014/01/14/create-echo-server-in-node-js/

content-length: count the number of bytes (octets), therefor \r\n should be considered to be 2 octets/bytes.

The presence of a message body in a request is signaled by a
   Content-Length or Transfer-Encoding header field.
