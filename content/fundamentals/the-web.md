---
title: The Web
---

You're probably already used to navigating websites, downloading and using apps or playing games. Everything you do online is internconnected. But do you know how and why everything works the way it does? We'll try to go through the basics, and you'll be able to dive deeper as needed.

![An abstract image showing the possible interior of an internet cable.](/internet-abstract.jpg)

The internet is, while oversimplified, just a bunch of computers connected to a shared *network* over which they are communicating. Just like we right now communicate in English, a common language we both understand, the same way all the participants in the network communicate using [protocols](https://www.cloudflare.com/learning/network-layer/what-is-a-protocol/).

Furthermore, similarly to how we exchange messages vocally or through text, the same way computers make [requests](/backend/requests) and *can receive* [responses](/backend/requests) unsing said protocols as a common language that is understood by all parties in the information exchange. The messages sent over the internet range from short texts to large files such as videos or photos. To send these messages easily and reliably over the internet we break them up into small [packets](https://www.cloudflare.com/learning/network-layer/what-is-a-packet/), which are then reassembled by the receiver.

We don't, however, refer to participants on the internet as *computers*. We rather refer to them generically as **clients** and **servers**. We'll most commonly refer to a client as the end-user's device, browser, or computer. Servers on the other hand are, basically, software systems that typically **receive requests** from clients, do something based on the request contents and then, maybe, **send back a response**. We usually refer to this type of communication as [client-server](https://en.wikipedia.org/wiki/Client%E2%80%93server_model), however realistically, most communication on the internet is [inter-server](https://en.wikipedia.org/wiki/Inter-server) (sometimes also referret to as machine-to-machine).

> [!tip] Exercise!
> 
> Now that you know on a high-level how the internet works, try coming up with a list of examples for clients and servers!

## Networks

A network is, simply put, a group of computers that can communicate with each other. All of these networks combined make up the internet, and computers in different networks can communicate with each other because of some simple rules that were put in place.

For two computers to communicate they need to be able to find each other. To do this they need a so called [IP Address](https://en.wikipedia.org/wiki/IP_address). When a client makes a request to a server they first need to know where to send that request to. A typical IP address looks like `3.87.9.125`, this is a so-called IP version 4 address (IPv4), and as you can see, it's not that easy to remember. You may have also hear of IPv6, those are [even weirder](https://en.wikipedia.org/wiki/IPv6)!

### The Domain Name System (DNS)

Don't know about you, but I can barely remember my phone number, why would I remember some random IP address? That's where the DNS comes in. The DNS is like the phonebook of the internet. A domain is a human-readable text that represents an IP. For example, `google.com` is actually `142.250.191.78` (depending on where you live, but we won't get into that).

We call the above [domain name](https://www.cloudflare.com/learning/dns/glossary/what-is-a-domain-name/) - IP relationship as an Alias, also called an "A record". As I told you earlier, the DNS is like a phonebook, and in this phonebook we call `com` a Top Level Domain (TLD). `google` is a subdomain of the `com` TLD, however the first subdomain is usually referred to as an Apex domain.

Anyone can buy a domain, most often the domain you buy is an Apex domain. Once you own that domain, you can do all kinds of configurations on the DNS. These configurations are called [Records](https://www.cloudflare.com/learning/dns/dns-records/), and you can have as many as you want, the most common one being A records. Other records have other designations. For instance, an MX record is used for Mail Exchange, so an email server knows that the `johhny@gmail.com` email should be sent to the `gmail.com` servers. Other types of records include `TXT`, `CNAME`, `AAAA` (`A` but for IPv6), etc.

The most important type of DNS record is `NS`, otherwise called [Nameservers](https://www.cloudflare.com/learning/dns/dns-records/dns-ns-record/). You see, the DNS is a democratic system. There isn't just one global server that manages all addresses of all servers. There are actually many DNS servers around the globe that keep track of all domains and their DNS records. The `NS` record basically says which one of all of these DNS servers is your "home" one. When you add a new DNS record it first gets recorded on your Nameserver. You'll probably notice that your shiny new domain doesn't yet work. That's because the domain name is only present on the DNS of your provider, but not on the DNS of your ISP. Therefore, it usually takes a bit of time until the changes in your domain are *propagated* to other DNS servers in the world (there are [tools online](https://www.google.com/search?q=dns+propagation) to check this process).

> [!tip] Getting your first domain
>
> You don't need to pay for a domain. Try getting a [free .me domain](https://nc.me/)!


### Public & Private IPs

You may have heared before the phrase "dynamic IP" when talking with your friends about your home internet. This term is also usually accompanied by "static IP". But why's that? Isn't the point of the internet that all computers communicate with each other? Yes but also no.

You see, while you want your computer to access the internet, you most probably *don't want* the internet to access your computer. You computer per se does not have a public IP, if you run `ipconfig` in the command line in Windows, you'll probably notice something like:

```sh
Wireless LAN adapter Wi-Fi:
   Connection-specific DNS Suffix  . :
   Link-local IPv6 Address . . . . . : fe80::bce6:96bb:9647:c541%3
   IPv4 Address. . . . . . . . . . . : 192.168.0.10   *
   Subnet Mask . . . . . . . . . . . : 255.255.255.0
   Default Gateway . . . . . . . . . : 192.168.0.1
```

I've marked the most important lines with an asterisk. You'll notice that your IPv4 address is something like `192.168.0.*` (depending on your router it can also look like `172.16.*.*` or `10.*.*.*`). This is a [private IP](https://en.wikipedia.org/wiki/Private_network), and it **cannot** be accessed from the internet. While on the internet each public server has a public IP that can be reached by anyone, your local network is managed by your router, and it assigns each device on the network an IP that is unique in that specific network.

This setup is usually used with servers as well. Typically there is one server that has a public IP, and that server is tasked with forwarding incoming requests to the correct server. You can think of this process like a waiter at a restaurant. The waiter is the public facing server, and the chef and the other kitchen staff are private servers who receive the orders from the chef.

### Ports

Similar to how a school has a single address but multiple entrances, a server has an IP and can send and receive requests on a `port`. This can more easily be explained using an example.

Let's say you are hosting a website that can be access at the [URL](/fundamentals/the-url) `http://mywebsite.com`. The two most important components of this URL are the protocol (`http:`) and the domain name (`mywebsite.com`). To access the website, the domain name must point an A record towards the server your website is hosted on, and your server must be able to accept connections over the `http` protocol. By convention, HTTP requests use the port 80 for communcation, so the packets sent to request the website contents would be sent to `3.87.9.125:80`. Other protocols use other ports. For instance, `https` uses port 443, email servers typically use a combination of 25, 587 or 465.

Of course, no one stops you if you want to use other ports, but common protocols use established, well-known ports to be able to communicate effectively and reliably. If this doesn't make much sense yet, we'll discuss more about ports when we get to actually building an app.

## Protocols

Protocols are a set of rules for communication between participants in a network. These are most often well known, set by different organisations, through the use of [RFCs](https://www.ietf.org/standards/rfcs/) (Request For Comments). You'll work with all kinds of protocols in your day to day, and the most common, on top of which everything else is built, are TCP and IP.

> [!tip] Your first RFC
>
> Reading an RFC is an interesting exercise. If you want to get even more familiar with how the internet works, and why it works, you should at least try reading some RFCs. You can start with the mother of them all, the [Internet Protocol RFC 791](https://datatracker.ietf.org/doc/html/rfc791).

### HTTP/S

This is the protocol you're probably most familiar with: HTTP or [Hypertext Transfer Protocol](https://datatracker.ietf.org/doc/html/rfc2616). This is the language of the browsers, everytime you see a URL that starts with `http` or `https` (where `s` stands for secure), you can be sure the communication uses the HTTP protocol. Of course, this is just a convention, when you'll be building your own server applications you can use a custom protocol for communication that behind the scene also uses HTTP, noone is stopping you, but following standards is recommened.
