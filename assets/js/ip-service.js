// Public IP lookups via ipify.
const IpService = (function () {
    const IPV4_URL = 'https://api.ipify.org?format=json';
    // api64 returns IPv6 when the client has it, otherwise falls back to IPv4
    const IPV64_URL = 'https://api64.ipify.org?format=json';

    function getIP(url) {
        return fetch(url)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return response.json();
            })
            .then(data => data.ip);
    }

    function isIPv6(ip) {
        return ip.includes(':');
    }

    // Returns the /24 subnet for an IPv4 address
    function getSubnet24(ip) {
        const prefix = ip.substring(0, ip.lastIndexOf('.'));
        return {
            start: `${prefix}.0`,
            end: `${prefix}.255`,
            cidr: `${prefix}.0/24`,
        };
    }

    return {
        getIPv4: () => getIP(IPV4_URL),
        getIPv64: () => getIP(IPV64_URL),
        isIPv6,
        getSubnet24,
    };
})();
