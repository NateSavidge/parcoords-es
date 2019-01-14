// rescale for height, width and margins
// TODO currently assumes chart is brushable, and destroys old brushes

const resize = (config, pc, flags, events) => {
  return function() {

    var currentBrushMode = pc.brushMode();

    // reinstalling brushes when resizing currently works for "1D-axes"
    if (currentBrushMode === "1D-axes") {
      //store the current brush state
      var extents = pc.brushExtents();
    }
    
    // selection size
    pc.selection
      .select('svg')
      .attr('width', config.width)
      .attr('height', config.height);
    pc.svg.attr(
      'transform',
      'translate(' + config.margin.left + ',' + config.margin.top + ')'
    );

    // FIXME: the current brush state should pass through
    if (flags.brushable) pc.brushReset();

    // scales
    pc.autoscale();

    // axes, destroys old brushes.
    if (pc.g()) pc.createAxes();
    if (flags.brushable) pc.brushable();
    if (flags.reorderable) pc.reorderable();

    pc.brushMode("None");
    pc.brushMode("1D-axes");

    if(extents) {
      var axisNames = Object.keys(extents);

      for (var axisName of axisNames) {
        var newState = {};
        var temp = extents[axisName];
        var coords = temp.selection.scaled.reverse();

        newState[axisName] = coords;
        pc.brushExtents(newState);
      }
     
    }
    
    pc.render();
    
    events.call('resize', this, {
      width: config.width,
      height: config.height,
      margin: config.margin,
    });

    return this;
  };
};

export default resize;
