//    Mediabrowser.js 0.0.1
//    (c) 2010-2011 Tim Hudson
//    Mediabrowser may be freely distributed under the MIT license.

(function($) {
  $.fn.mediabrowser = function(selector) {
    
    // Base Setup

    var container = this,
        items = container.children(selector),
        itemsWidth = items.width(),
        _index = 0,
        currentItem = items.eq(0),
        itemsPerRow = Math.floor( items.parent().width() / items.outerWidth(true) );
      
    currentItem.addClass("active");

    // Navigational Functions

    var browse = function(direction) {
      currentItem.removeClass('active');
      if ( typeof direction === "string" ) {
        try{
          _index =
          direction === 'up' ? _index >= itemsPerRow ? _index = _index-itemsPerRow : _index = 0 :
          direction === 'next' ? _index != (items.length-1) ? _index = _index+1 : _index :
          direction === 'down' ? _index <= (items.length-1)-itemsPerRow ? _index = (_index+itemsPerRow) : _index = items.length-1 :
          direction === 'previous' ? _index != 0 ? _index = _index-1 : _index :
          _index;
        } catch(e) {}
      } else {
        _index = $(this).index();
      }
      currentItem = items.eq(_index);
      currentItem.addClass('active');
    }
    var selectItem = function() {
      items.removeClass('selected');
      currentItem.addClass('selected');
    }

    //Add Event Listeners

    $(document).keyup(function(e) {
      if (e.which === 38) browse('up');
      if (e.which === 39) browse('next');
      if (e.which === 40) browse('down');
      if (e.which === 37) browse('previous');
      if (e.which === 13) selectItem();
      return false;
    });
    this.delegate(selector, 'mouseenter', browse);
    this.delegate(selector, 'mouseleave', function() {currentItem.removeClass('active');} );
    this.delegate(selector, 'click', selectItem);
    $(window).resize(function() {
      itemsPerRow = Math.floor( items.parent().width() / items.outerWidth(true) );
    });

    // Evenly space content to dynamically fit window

    var resizeContents = function() {
      var containerWidth = container.width(),
          minContainerWidth = containerWidth*0.85,
          itemsPerRow = Math.floor(minContainerWidth / itemsWidth),
          marginSize = containerWidth - (itemsWidth*itemsPerRow),
          newMargins = Math.floor( marginSize / (itemsPerRow*2) );
      
      items.css({'margin-left' : newMargins-5, 'margin-right' : newMargins-5});
    };

    $(window).resize(resizeContents);
    $(document).ready(resizeContents);

    return this;
  };
})(jQuery);