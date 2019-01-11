import { select } from 'd3-selection';

const flipAxisAndUpdatePCP = (config, pc, axis) =>
  function(dimension) {

    if (pc.brushMode() === "1D-axes") {
      var state = pc.brushExtents();
    }

    if (pc.brushMode() === "1D-axes") {

      var extents = state;
      var axisNames = Object.keys(extents);
      var newState = {};

      for (var axisName of axisNames) {
        var temp = extents[axisName];
        var coords = temp.selection.scaled;
        newState[axisName] = coords;
      }
      console.log("New State: ", newState)   
    }

    pc.flip(dimension);
    pc.brushReset(dimension);
    select(this.parentElement)
      .transition()
      .duration(config.animationTime)
      .call(axis.scale(config.dimensions[dimension].yscale));
        
      
    pc.brushExtents(newState);

    pc.render();

    if (config.highlighted != 0) {
      pc.highlight(config.highlighted);
    }
    
  };

export default flipAxisAndUpdatePCP;
