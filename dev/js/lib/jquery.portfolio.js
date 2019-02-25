/*
 * portfolio filter script to 'mix' items
*/

;(function ( $, window, document, undefined ) {
    var defaults = {
        item: "js-item",
        itemHidden: "is-hidden",
        filterLink: "js-filter",
        filterSelected: "is-selected"
    };

    function MixFilter( element, options ) {
        this.options = $.extend( {}, defaults, options) ;
        this.element = element;
        this.init();
    }

    MixFilter.prototype.init = function () {
        var $this = $(this.element),
            $item = $this.find("." + this.options.item),
            $itemHidden = $("." + this.options.itemHidden),
            $filterLink = $this.find("." + this.options.filterLink),
            $filterSelected = $("." + this.options.filterSelected);

        $filterLink.on('click', function(){
          if (!$(this).hasClass("is-selected")) {
        $filterLink.removeClass('is-selected');
        $(this).addClass('is-selected');
            var filterVal = $(this).data("filter").toLowerCase();

            $item.each(function () {
          var itemVal = $(this).data("cat").toLowerCase();
          if (!$(this).is("[data-cat*=" + filterVal + "]")) {
            $(this).addClass('is-hidden');
          } else {
            $(this).removeClass('is-hidden');
          }
        });
          }
          return false;
        });
    };

    $.fn.mixFilter = function ( options ) {
        return this.each(function () {
            new MixFilter( this, options );
        });
    };

})( jQuery, window, document );

$(".js-portfolio").mixFilter();
