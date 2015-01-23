(function($) {

    var $body = $('body');

    var opts = {
        lines: 12, // The number of lines to draw
        length: 8, // The length of each line
        width: 3, // The line thickness
        radius: 16, // The radius of the inner circle
        corners: 1, // Corner roundness (0..1)
        rotate: 0, // The rotation offset
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#333', // #rgb or #rrggbb or array of colors
        speed: 1, // Rounds per second
        trail: 100, // Afterglow percentage
        shadow: false, // Whether to render a shadow
        hwaccel: false, // Whether to use hardware acceleration
        className: 'spinner', // The CSS class to assign to the spinner
        zIndex: 2e9, // The z-index (defaults to 2000000000)
        top: 'auto', // Top position relative to parent in px
        left: 'auto' // Left position relative to parent in px
    };
    var loadTarget = document.getElementById('loading');
    var spinner = new Spinner(opts).spin(loadTarget);

    // Window load
    $(window).load(function() {

        var $loading = $('#loading');

        $loading.stop(true,true).fadeOut(500, function() {
            spinner.stop();
            $loading.remove();
        });

    });

    // If tablet
    // NOTE: This is not really used yet
    //       will probably use media queries for it
    // if ($body.hasClass('tablet')) {

    //     var $navbar = $('#navbar'),
    //         $mainBox = $('#main')

    //     function windowSizes() {
    //         var headerHeight = $navbar.height(),
    //             headerSpacing = headerHeight + 35,
    //             windowHeight = $(window).height(),
    //             footerSpacing = 75,
    //             mainHeight = windowHeight - headerSpacing - footerSpacing - 40;

    //         if($mainBox.outerHeight() > mainHeight) {
    //             $($mainBox).css({height:mainHeight,overflow:"auto"});
    //         }
    //     }

    //     windowSizes();

    //     $(window).resize(function() {
    //         windowSizes();
    //     });

    //     $('body').addClass('tablet');
    // }

    // class
    $(document).on('click', '[data-toggle^="class"]', function(e) {
        e && e.preventDefault();

        var $this = $(e.target), $class, $target;

        if(!$this.data('toggle')) {
            $this = $this.closest('[data-toggle^="class"]');
        }

        $class = $this.data()['toggle'].split(':')[1];
        $target = $( $this.data('target') || $this.attr('href') );
        $target.toggleClass($class);
        $this.toggleClass('active');
    });
})(jQuery);