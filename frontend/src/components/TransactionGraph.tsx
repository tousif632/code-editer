import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

interface Transaction {
  from: string;
  to: string;
  value: number;
}

interface Props {
  transactions: Transaction[];
}

const TransactionGraph: React.FC<Props> = ({ transactions }) => {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove(); // Clear previous renders

    const width = 800;
    const height = 600;

    // Build nodes and links
    const nodes: { id: string }[] = [];
    const nodeMap = new Map();

    transactions.forEach(tx => {
      if (!nodeMap.has(tx.from)) {
        nodeMap.set(tx.from, { id: tx.from });
        nodes.push({ id: tx.from });
      }
      if (!nodeMap.has(tx.to)) {
        nodeMap.set(tx.to, { id: tx.to });
        nodes.push({ id: tx.to });
      }
    });

    interface Link {
      source: string;
      target: string;
      value: number;
    }

    const links: Link[] = transactions.map(tx => ({
      source: tx.from,
      target: tx.to,
      value: tx.value
    }));

    const simulation = d3.forceSimulation(nodes as any)
      .force('link', d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2));

    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke-width', 1.5);

    const node = svg.append('g')
      .attr('fill', '#1e90ff')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 6)
      .call(d3.drag()
        .on('start', dragStart)
        .on('drag', dragged)
        .on('end', dragEnd));

    const text = svg.append('g')
      .attr('fill', 'black')
      .selectAll('text')
      .data(nodes)
      link
        .attr('x1', d => (typeof d.source === 'object' ? (d.source as any).x : 0))
        .attr('y1', d => (typeof d.source === 'object' ? (d.source as any).y : 0))
        .attr('x2', d => (typeof d.target === 'object' ? (d.target as any).x : 0))
        .attr('y2', d => (typeof d.target === 'object' ? (d.target as any).y : 0));
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as any).x)
        .attr('y1', d => (d.source as any).y)
        .attr('x2', d => (d.target as any).x)
        .attr('y2', d => (d.target as any).y);

      node
        .attr('cx', d => (d as any).x)
        .attr('cy', d => (d as any).y);

      text
        .attr('x', d => (d as any).x + 10)
        .attr('y', d => (d as any).y);
    });

    function dragStart(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragEnd(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

  }, [transactions]);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Transaction Graph</h2>
      <svg ref={ref} width={800} height={600}></svg>
    </div>
  );
};

export default TransactionGraph;
