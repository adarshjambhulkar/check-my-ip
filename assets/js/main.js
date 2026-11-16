// App entry point: fetches IPs and wires up the UI.
(function () {
    function loadIPv4() {
        return IpService.getIPv4()
            .then(ip => {
                const subnet = IpService.getSubnet24(ip);
                UI.setValue('ipAddress', ip);
                UI.setValue('startRange', subnet.start);
                UI.setValue('endRange', subnet.end);
                UI.setText('subnetCidr', subnet.cidr);
            })
            .catch(error => {
                console.error('IPv4 error:', error);
                UI.setValue('ipAddress', 'Unavailable', 'muted');
                UI.setValue('startRange', '-', 'muted');
                UI.setValue('endRange', '-', 'muted');
            });
    }

    function loadIPv6() {
        return IpService.getIPv64()
            .then(ip => {
                if (IpService.isIPv6(ip)) {
                    UI.setValue('ipv6Address', ip);
                } else {
                    UI.setValue('ipv6Address', 'Not available (no IPv6 connectivity)', 'muted');
                }
            })
            .catch(error => {
                console.error('IPv6 error:', error);
                UI.setValue('ipv6Address', 'Unavailable', 'muted');
            });
    }

    function refresh() {
        UI.setRefreshing(true);
        UI.setValue('ipAddress', 'Fetching...', 'loading');
        UI.setValue('ipv6Address', 'Fetching...', 'loading');
        UI.setValue('startRange', '-', 'loading');
        UI.setValue('endRange', '-', 'loading');
        UI.setText('subnetCidr', '-');

        Promise.allSettled([loadIPv4(), loadIPv6()])
            .finally(() => UI.setRefreshing(false));
    }

    CopyButtons.init();
    document.getElementById('refreshButton').addEventListener('click', refresh);
    refresh();
})();
