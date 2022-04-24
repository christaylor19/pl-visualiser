import { FC } from 'react';
import styled from 'styled-components';

import ClubImageSvg from '@/components/clubLogoSvg';
import { SocialData } from '@/hooks/useGetSocials';
import { mapToClub, mapToClubId } from '@/utils/mapData';
import { AxisBottom } from '@visx/axis';
import { Group } from '@visx/group';
import { LegendItem, LegendLabel, LegendOrdinal } from '@visx/legend';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';
import { BarGroup } from '@visx/shape';

const defaultMargin = { top: 40, right: 20, bottom: 40, left: 20 };

const Legend = styled.div`
  line-height: 0.9em;
  color: #efefef;
  font-size: 10px;
  font-family: arial;
  padding: 10px 10px;
  float: left;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(0, 0, 0);
  border-radius: 8px;
  margin: 5px 5px;
`;

const LegendTitle = styled.div`
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 100;
`;

const LegendDemo: FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <Legend>
    <LegendTitle>{title}</LegendTitle>
    {children}
  </Legend>
);

export type BarGroupProps = {
  width: number;
  height: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  events?: boolean;
  data: SocialData;
};

type SocialValue = {
  twitter: number;
  facebook: number;
  instagram: number;
  youtube: number;
  linkedin: number;
  reddit: number;
  id: number;
};

type SocialValue2 = Record<string, number>;

const Example: FC<BarGroupProps> = ({
  width,
  height,
  events = false,
  margin = defaultMargin,
  data,
}) => {
  const socialMediaData: SocialValue2[] = [];

  for (let index = 1; index < 21; index++) {
    const d: SocialValue2 = {
      id: index,
      twitter: data.twitter[index - 1].followers,
      facebook: data.facebook[index - 1].followers,
      instagram: data.instagram[index - 1].followers,
      youtube: data.youtube[index - 1].followers,
      linkedin: data.linkedin[index - 1].followers,
      reddit: data.reddit[index - 1].followers,
    };

    socialMediaData.push(d);
  }

  const keys = Object.keys(socialMediaData[0]).filter((d) => d !== 'id');

  // accessors
  const getClub = (d: any) => d.id;

  // scales
  const clubScale = scaleBand<number>({
    domain: socialMediaData.map((d) => d.id),
    padding: 0.5,
  });

  const clubNamesScale = scaleBand<string>({
    domain: socialMediaData.map((d) => mapToClub(d.id)),
    padding: 0.5,
  });

  const socialScale = scaleBand<string>({
    domain: keys,
    padding: 0.1,
  });

  const getMaxFollowers = () => {
    return Math.max(
      ...socialMediaData.map((d: SocialValue2) => {
        const values = keys.map((k: string) => {
          return d[k];
        });

        return Math.max(...values);
      })
    );
  };

  const followersScale = scaleLinear<number>({
    domain: [0, getMaxFollowers()],
  });

  const facebook = '#2474E1';
  const twitter = '#1B9BEF';
  const instagram = '#ca2d8c';
  const youtube = '#FF0100';
  const linkedin = '#0A66C2';
  const reddit = '#FF4400';

  const colorScale = scaleOrdinal<string, string>({
    domain: keys,
    range: [twitter, facebook, instagram, youtube, linkedin, reddit],
  });

  // bounds
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  // update scale output dimensions
  clubScale.rangeRound([0, xMax]);
  socialScale.rangeRound([0, clubScale.bandwidth()]);
  followersScale.range([yMax, 0]);

  const ordinalColorScale = scaleOrdinal({
    domain: keys,
    range: [twitter, facebook, instagram, youtube, linkedin, reddit],
  });

  const legendGlyphSize = 15;

  return (
    <>
      <svg width={width} height={height}>
        <Group top={margin.top} left={margin.left}>
          <BarGroup
            data={socialMediaData}
            keys={keys}
            height={yMax}
            x0={getClub}
            x0Scale={clubScale}
            x1Scale={socialScale}
            yScale={followersScale}
            color={colorScale}
          >
            {(barGroups) =>
              barGroups.map((barGroup) => {
                return (
                  <Group
                    key={`bar-group-${barGroup.index}-${barGroup.x0}`}
                    left={barGroup.x0}
                  >
                    {barGroup.bars.map((bar) => (
                      <rect
                        key={`bar-group-bar-${barGroup.index}-${bar.index}-${bar.value}-${bar.key}`}
                        x={bar.x}
                        y={bar.y}
                        width={bar.width}
                        height={bar.height}
                        fill={bar.color}
                      />
                    ))}
                  </Group>
                );
              })
            }
          </BarGroup>
        </Group>
        <AxisBottom
          top={yMax + margin.top}
          scale={clubScale}
          stroke={'black'}
          tickStroke={'black'}
          orientation="bottom"
          tickLabelProps={() => ({
            fill: 'black',
            fontSize: 11,
            textAnchor: 'middle',
          })}
          numTicks={20}
          hideAxisLine
          hideTicks
          tickComponent={(tickRendererProps) => {
            const apiSportsId = mapToClubId(
              parseInt(tickRendererProps.formattedValue as string, 10)
            );
            return (
              <ClubImageSvg
                id={apiSportsId}
                x={tickRendererProps.x}
                y={tickRendererProps.y}
              />
            );
          }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: margin.top / 2 - 10,
          left: margin.left / 2 - 20,
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end',
          fontSize: '14px',
        }}
      >
        <LegendDemo title="Legend">
          <LegendOrdinal
            scale={ordinalColorScale}
            labelFormat={(label) => `${label.toUpperCase()}`}
          >
            {(labels) => (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                {labels.map((label, i) => (
                  <LegendItem
                    key={`legend-quantile-${i}`}
                    margin="0 5px"
                    onClick={() => {
                      if (events) alert(`clicked: ${JSON.stringify(label)}`);
                    }}
                  >
                    <svg width={legendGlyphSize} height={legendGlyphSize}>
                      <rect
                        fill={label.value}
                        width={legendGlyphSize}
                        height={legendGlyphSize}
                      />
                    </svg>
                    <LegendLabel align="left" margin="0 0 0 4px">
                      {label.text}
                    </LegendLabel>
                  </LegendItem>
                ))}
              </div>
            )}
          </LegendOrdinal>
        </LegendDemo>
      </div>
    </>
  );
};

export default Example;
