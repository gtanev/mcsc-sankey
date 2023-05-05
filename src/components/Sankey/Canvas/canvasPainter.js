import * as d3 from "d3";

function run(links, activeNode, context, scale) {
  clearContext();

  let particles = [];
  let freqCounter = 1;
  let freqMax = 50;

  const linkExtent = d3.extent(links, (d) => d.value);
  const frequencyScale = d3.scaleLinear().domain(linkExtent).range([1, 30]);
  const particleSize = d3.scaleLog().domain(linkExtent).range([1, 6]);

  if (activeNode != null) {
    links = links.filter(
      (link) => link.source.name === activeNode.name || link.target.name === activeNode.name
    );
  }

  for (const link of links) {
    link.freq = frequencyScale(link.value);
    link.particleSize = particleSize(link.value);
    link.particleColor = () => "rgba(0, 0, 0, 0.67)";
  }

  function clearContext() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  function scaleToFit() {
    const { width: cw, height: ch } = context.canvas;

    const ratio = Math.min(cw / scale.vw, ch / scale.vh);

    context.setTransform(
      scale.x * ratio,
      0,
      0,
      scale.y * ratio,
      (cw - scale.vw * ratio) / 2 + scale.mx * ratio,
      (ch - scale.vh * ratio) / 2 + scale.my * ratio
    );
  }

  function tick(elapsed) {
    particles = particles.filter((d) => d.time > elapsed - 1000);

    if (freqCounter > freqMax) {
      freqCounter = 1;
    }

    for (const link of links) {
      const path = document.getElementById(`link-${link.index}`);

      if (link.freq >= freqCounter) {
        let offset = 0; // (Math.random() - .5) * (link.source.y1 - link.source.y0);
        particles.push({ link, time: elapsed, offset, path });
      }
    }

    draw(elapsed);
    freqCounter++;
  }

  function draw(elapsed) {
    clearContext();
    scaleToFit();

    for (let p in particles) {
      let currentTime = elapsed - particles[p].time;
      let currentPercent = (currentTime / 1000) * particles[p].path.getTotalLength();
      let currentPos = particles[p].path.getPointAtLength(currentPercent);

      context.beginPath();
      context.arc(
        currentPos.x,
        currentPos.y + (particles[p].offset || 0),
        particles[p].link.particleSize,
        0,
        2 * Math.PI
      );

      context.fillStyle = particles[p].link.particleColor(currentTime);
      context.fill();
    }
  }

  return d3.timer(tick, 100);
}

export { run };
