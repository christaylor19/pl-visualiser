import { FC, useContext, useEffect, useState } from 'react';

import { ModeContext } from '@/contexts/appContext';
import { FetchStatus } from '@/hooks/useFetch';
import { ClubData } from '@/types/clubs';
import { VisxData } from '@/types/visx';
import { mapToVisxData } from '@/utils/mapData';
import { getClubMetadataFromTwitterName } from '@/utils/metadata';
import { Group } from '@visx/group';
import { hierarchy, stratify, Treemap, treemapSquarify } from '@visx/hierarchy';
import { HierarchyNode, TileMethod } from '@visx/hierarchy/lib/types';
import { scaleLinear } from '@visx/scale';

import TreemapNode from './components/treemapNode';

const defaultMargin = { top: 0, left: 0, right: 0, bottom: 0 };

type TreemapProps = {
  data: ClubData[];
  status: FetchStatus;
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
};

const TreemapDemo: FC<TreemapProps> = ({
  data,
  status,
  width,
  height,
  margin = defaultMargin,
}) => {
  const [chartData, setChartData] = useState<VisxData[]>([]);
  const [stratifiedData, setStratifiedData] =
    useState<HierarchyNode<VisxData>>();

  const [root, setRoot] = useState<HierarchyNode<HierarchyNode<VisxData>>>();
  const [tileMethods, setTileMethods] = useState<{
    [tile: string]: TileMethod<any>;
  }>();

  const { mode } = useContext(ModeContext);


  useEffect(() => {
    if (status === 'fetched') {
      setChartData(mapToVisxData(data));
    }
  }, [data, status]);

  useEffect(() => {
    if (chartData.length > 0) {
      const data2 = stratify<VisxData>()
        .id((d) => d.id)
        .parentId((d) => d.parent)(chartData)
        .sum((d) => d.size || 0);

      setStratifiedData(data2);
    }
  }, [chartData]);

  useEffect(() => {
    if (stratifiedData) {
      const newroot = hierarchy(stratifiedData).sort(
        (a: any, b: any) => (b.value || 0) - (a.value || 0)
      );
      setRoot(newroot);

      const newTileMethods: {
        [tile: string]: TileMethod<typeof stratifiedData>;
      } = {
        treemapSquarify,
      };
      setTileMethods(newTileMethods);
    }
  }, [stratifiedData]);

  const color1 = mode === 'dark' ? '#1B0623' : '#3F0F52';
  const color2 =  mode === 'dark' ? '#3F0F52' : '#F1DDF9';

  const background = mode === 'dark' ? '#000' : '#3F0F52';

  const colorScale = scaleLinear<string>({
    domain: [0, Math.max(...chartData.map((d) => d.size || 0))],
    range: [color2, color1],
  });

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  return (
    <>
      {status === 'fetched' && stratifiedData && root && tileMethods && (
        <div>
          <div>
            <svg width={width} height={height}>
              <Treemap<typeof stratifiedData>
                top={margin.top}
                root={root}
                size={[xMax, yMax]}
                tile={tileMethods['treemapSquarify']}
                round
              >
                {(treemap) => (
                  <Group>
                    {treemap
                      .descendants()
                      .reverse()
                      .map((node, i: number) => {
                        return (
                          <TreemapNode
                            colorScale={colorScale}
                            node={node}
                            index={i}
                            backgroundColor={background}
                            metadata={getClubMetadataFromTwitterName(node.data.id)}
                          />
                        );
                      })}
                  </Group>
                )}
              </Treemap>
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default TreemapDemo;
