(function($) {

    var $main = $("#main"), timer;

    // Create a map in the "map" div, set the view to a given place and zoom
    var map = L.map('map', {zoomControl: false}).setView([51.505, -0.09], 7);
    map.addControl(L.control.zoom({
        position: 'topright'
    }));

    // Add an OpenStreetMap tile layer
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // This could be a JSON call or on page JSON object (faster)
    var markers = [
        {
            title: "The Gilded Age by Mark Twain",
            link: "#link-to-book",
            address: "New York City",
            point: [40.689249, -74.044500],
            thumb: '<img width="95" height="95" src="/filler/twain.jpg" class="thumbnail" alt="The Gilded Age by Mark Twain">'
        },
        {
            title: "On Whitsunday Passage",
            link: "#link-to-book",
            address: "Australia",
            point: [-19.709230, 149.743465],
            thumb: '<img width="95" height="95" src="/filler/magoffin.jpg" class="thumbnail" alt="On Whitsunday Passage">'
        }
    ];

    $(markers).each(function(i, data) {

        var marker = L.marker(data.point, {
            icon: L.icon({
                iconUrl: '/assets/images/leaflet/marker.png',
                iconRetinaUrl: '/assets/images/leaflet/marker@2x.png',
                iconSize: [18, 35],
                iconAnchor: [9, 17],
                popupAnchor: [0, -26],
                shadowUrl: '/assets/images/leaflet/shadow.png',
                shadowRetinaUrl: '/assets/images/leaflet/shadow@2x.png',
                shadowSize: [18, 35],
                shadowAnchor: [9, 17]
            })
        })
        .bindLabel(data.title)
        .addTo(map);

        var $button = $('<div id="marker'+i+'" class="marker"><div id="markerInfo'+i+'" class="markerInfo"><a href="'+data.link+'">'+data.thumb+'</a><h2><a href="'+data.link+'">'+data.title+'</a></h2><p>'+data.address+'</p><div class="markerTotal">'+ (i + 1) +' / <span></span></div><div class="clear"></div></div></div>');

        $button.appendTo('#markers');

        // $button.bind('mouseover', function() {
        //     map.panTo(data.point);
        //     $button.trigger('activate');
        // });

        $button.bind('activate', function() {
            $('.markerInfo.active').removeClass('active');
            $('#markerInfo'+i+'').addClass('active');
            $('.marker.active').removeClass('active');
            $('#marker'+i+'').addClass('active');
            map.panTo(data.point);
        });

        $(".markerTotal span").html($(".markerInfo").length);

        marker.on('mouseover', function(e) {
            window.clearInterval(timer); // Stop autoslide
            $button.trigger('activate');
        });

        marker.on('click', function(e) {
            $main.trigger('slideTo', [true]);
        });

        if(i === 0) {
            $button.trigger('activate');
        }
    });

    // Next marker
    $('#nextMarker').bind('click', function(e) {
        e && e.preventDefault();

        var activeMarker = $('#markers .marker.active');

        if(activeMarker.is(':not(:last-child)')) {
            activeMarker.removeClass('active').next('.marker').addClass('active').trigger('activate');
        }
        else {
            activeMarker.removeClass('active');
            $('#markers .marker:first-child').trigger('activate');
        }

        // Stop autoslide
        window.clearInterval(timer);
    });

    // Prev marker
    $('#prevMarker').bind('click', function(e) {
        e && e.preventDefault();

        var activeMarker = $('#markers .marker.active');

        if(activeMarker.is(':not(:first-child)')){
            activeMarker.removeClass('active').prev('.marker').trigger('activate');
        }
        else {
            activeMarker.removeClass('active');
            $('#markers .marker:last-child').trigger('activate');
        }

        // Stop autoslide
        window.clearInterval(timer);
    });

    // Stupid simple autoslide
    var autoSlide = function() {
        timer = window.setTimeout(function() {
            var activeMarker = $('#markers .marker.active');

            if(activeMarker.is(':not(:last-child)')) {
                activeMarker.removeClass('active').next('.marker').trigger('activate');
            }
            else {
                activeMarker.removeClass('active');
                $('#markers .marker:first-child').trigger('activate');
            }

            autoSlide();
        }, 10000);
    }
    // Start autoslide
    autoSlide();

    // Just to demo the content - not the best
    $main.bind('slideTo', function(e, force) {
        var $main = $(this);

        if(force && $main.hasClass('flipped')) return;

        $main.stop().animate({
            left: - ($main.outerWidth(true) + 35)
        }, 300, function() {
            $main.toggleClass('flipped').animate({
                left: 0
            }, 300)
        });
    });
    $(document).on('click', '.markerInfo h2 a', function(e) {
        e && e.preventDefault();
        $main.trigger('slideTo');
    });

})(jQuery);