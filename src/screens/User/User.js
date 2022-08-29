import * as d3 from 'd3';
import { useState, useEffect, createRef } from 'react';
import FetchApi from '../../api/FetchApi';
import { UserApis } from '../../api/ListApi';
import { Grid, Card } from '@nextui-org/react';
import TableUser from '../../components/TableUser/TableUser';

const User = ({ title }) => {
  const [data, setData] = useState({});
  const [dataUserSelect, setDataUserSelect] = useState({});

  const graphRef = createRef();

  const handleClickUserGraph = (user) => {
    console.log(user);
    setDataUserSelect({});
    FetchApi(UserApis.viewTeam, undefined, {
      id: user.id,
    }).then((a) => {
      setDataUserSelect(a.data[0]);
    });
  };

  const loadD3 = () => {
    d3.select(graphRef.current).select('svg').remove();

    const svg = d3
      .select(graphRef.current)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('style', 'background: #2b2b2b')
      .append('g');

    function handleZoom() {
      svg.attr(
        'transform',
        'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')'
      );
    }

    function centerNode(source, userId) {
      const target = source.find((e) => {
        if (userId === undefined) {
          return e.parent === undefined;
        } else {
          return e.id === userId;
        }
      });

      let scale = zoom.scale();

      let x, y;

      if (userId === undefined) {
        y = -target.x * scale + (window.innerHeight - 40) / 2;
        x =
          -target.y * scale +
          (window.innerHeight - 40) / 3 -
          (window.innerHeight - 40) / 4;
      } else {
        y = -target.x * scale + (window.innerHeight - 40) / 2;
        x = -target.y * scale + (window.innerHeight - 40) / 2;
      }

      d3.select('g')
        .transition()
        .duration(500)
        .attr(
          'transform',
          'translate(' + x + ',' + y + ') scale(' + scale + ')'
        );
      zoom.scale(scale);
      zoom.translate([x, y]);
    }

    const tree = d3.layout.tree().size([800, 800]).nodeSize([50, 50]);
    const nodes = tree.nodes(data).reverse();
    const links = tree.links(nodes);

    nodes.forEach(function (d) {
      d.y = d.depth * 200;
      d.x = d.x * 1;
    });

    const line = d3.svg.diagonal().projection(function (d) {
      return [d.y, d.x];
    });

    svg
      .selectAll('.link')
      .data(links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', '#4c4c4c')
      .attr('stroke-width', '2px');

    const node = svg
      .selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node');

    node
      .append('circle')
      .attr('r', 8)
      .attr('fill', function (d) {
        return d.children ? '#ffffff' : '#707070';
      })
      .attr('stroke', '#ffffff')
      .attr('stroke-width', '2px')
      .attr('cursor', 'pointer')
      .attr('title', function (d) {
        return d.name;
      })
      .attr('cx', function (d) {
        return d.y;
      })
      .attr('cy', function (d) {
        return d.x;
      })
      .on('click', function (d) {
        centerNode(nodes, d.id);
        handleClickUserGraph(d);
      });

    node
      .append('text')
      .attr('fill', '#dfdfdf')
      .attr('font-size', '10px')
      .attr('cursor', 'pointer')
      .text(function (d) {
        return d.name;
      })
      .attr('x', function (d) {
        return d.y + 18;
      })
      .attr('y', function (d) {
        return d.x + 3.5;
      })
      .on('click', function (d) {
        centerNode(nodes, d.id);
        handleClickUserGraph(d);
      });

    node
      .append('text')
      .attr('fill', '#b8b8b8')
      .attr('font-size', '8px')
      .attr('cursor', 'pointer')
      .attr('font-weight', '200')
      .text(function (d) {
        return `(${d.email})`;
      })
      .attr('x', function (d) {
        return d.y + 18;
      })
      .attr('y', function (d) {
        return d.x + 15.5;
      })
      .on('click', function (d) {
        centerNode(nodes, d.id);
        handleClickUserGraph(d);
      });

    node
      .append('text')
      .attr('fill', function (d) {
        if (!d.isActive) {
          return '#ff553b';
        } else {
          return '#38f323';
        }
      })
      .attr('font-size', '8px')
      .attr('font-weight', '500')
      .attr('cursor', 'pointer')
      .text(function (d) {
        return `Uid: ${d.id}`;
      })
      .attr('x', function (d) {
        return d.y + 18;
      })
      .attr('y', function (d) {
        return d.x - 8;
      })
      .on('click', function (d) {
        centerNode(nodes, d.id);
        handleClickUserGraph(d);
      });

    let zoom = d3.behavior.zoom().scaleExtent([0.05, 5]).on('zoom', handleZoom);
    zoom.scale(1);

    

    const heightSvg = graphRef.current.scrollHeight;
    const widthSvg = graphRef.current.scrollWidth;

    let properties = {
      minWidth: 0,
      minHeight: 0,
      maxWidth: 0,
      maxHeight: 0,
    };

    nodes.forEach((item) => {
      if (properties.minWidth > item.y) {
        properties.minWidth = item.y;
      }

      if (properties.minHeight > item.x) {
        properties.minHeight = item.x;
      }

      if (properties.maxWidth < item.y) {
        properties.maxWidth = item.y;
      }

      if (properties.maxHeight < item.x) {
        properties.maxHeight = item.x;
      }
    });

    const ratioDiv =
      (properties.maxHeight - properties.minHeight) /
      (properties.maxWidth - properties.minWidth);
    const ratioReal = heightSvg / widthSvg;

    if (ratioDiv > ratioReal) {
      zoom.scale(
        (heightSvg * 90) / 100 / (properties.maxHeight - properties.minHeight)
      );
    } else {
      zoom.scale(
        (widthSvg * 90) / 100 / (properties.maxWidth - properties.minWidth)
      );
    }

    d3.select(graphRef.current).call(zoom);
    centerNode(nodes);
  };

  const handleReload = () => {
    FetchApi(UserApis.viewTeam).then((a) => {
      setData(a.data[0]);
      setDataUserSelect(a.data[0]);
    });
  };

  useEffect(() => {
    document.title = title;
    handleReload();
  }, [title]);

  useEffect(() => {
    if (data.id !== undefined) {
      loadD3();
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <Grid.Container>
      <Grid sm={6.5}>
        <TableUser
          dataUser={dataUserSelect}
          onChangeSelectUser={handleClickUserGraph}
        />
      </Grid>
      <Grid sm={5.5}>
        <Card>
          <div
            ref={graphRef}
            style={{
              height: window.innerHeight - 40,
              width: '100%',
              backgroundColor: '#2b2b2b',
              cursor: 'move',
            }}
          />
        </Card>
      </Grid>
    </Grid.Container>
  );
};

export default User;
