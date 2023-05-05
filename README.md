# Sankey Visualization of Material & Energy Flows

This is an interactive data visualization of global material and energy flows, based on data collected 
and prepared by Dr. Katrin Ellen Daehn. This visualization was built for the [**MIT Climate & Sustainability Consortium**](https://impactclimate.mit.edu/),
and its source code has been made available under the MIT license.

## Features

The visualization shows the global flows of materials and energy for 2019, combined into a single Sankey diagram. The flows
are color-coded by the category of material or energy they represent, and the width of each flow is proportional to the
amount of material or energy it carries. A legend is provided to help interpret the colors.

Users can hover over a flow to see the name and amount of material or energy it carries from its source to its target node. 
Clicking a node shows a pop-up window with a complete list of flows that originate from, and terminate at, that node, i.e., that node's inflows and outflows. Multiple pop-up windows can be opened at the same time and moved around on the screen. 

An interactive pan and zoom feature is also provided, allowing users to zoom in on a particular region of the diagram,
pan around the diagram, and reset the view to its original state. These actions can be performed either by using a pointing device over the diagram, or by using the controls in the bottom right corner of the user interface.

A couple of toggle buttons are also included, with the following functionality:

- **Highlight flow types** — activating this toggle colors the flows in the visualization based on their type (i.e., material or energy).
- **Animate flows** — activating this toggle animates the flows in the visualization, depicting the direction of their movement and the amount of material or energy they carry (i.e., their throughput relative to each other).
- **Enable node dragging** — activating this toggle allows users to drag and reposition the nodes in the visualization along the vertical axis, while temporarily disabling the click event on the nodes. Inversely, deactivating this toggle disables the dragging functionality and restores the node click event.

## Frameworks and libraries

This project was built with a collection of frameworks and libraries within the JavaScript ecosystem, including React, Vite, D3, and VisX, which were used to generate the visualization and all of its interactive elements.
