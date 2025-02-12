import { ResponsiveBar } from "@nivo/bar";
import { salaries } from "../../hays";
import { formatCurrency } from "../../utils/formatCurrency";
import { useWindowSize } from "react-use";

export interface SalariesObject {
  [key: number]: SalaryItem[];
}

export interface SalaryItem {
  position: string;
  min: number;
  max: number;
  average: number;
  level: string;
  category: string;
}

interface BarChartHaysProps {
  payload?: SalariesObject;
  isAmountHidden?: boolean;
  selectedPosition?: string;
}

const BarChartHays = ({
  payload,
  isAmountHidden = false,
  selectedPosition = "Frontend developer",
}: BarChartHaysProps) => {
  const _payload = payload ?? salaries;

  const chartData = (_payload[2025] as SalaryItem[]).filter(
    (item) => item.position.toLowerCase() === selectedPosition.toLowerCase()
  );

  const { width } = useWindowSize();
  const isMobileScreen = width < 768;

  return (
    <ResponsiveBar
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      data={chartData}
      keys={["min", "average", "max"]}
      indexBy="level"
      margin={{ top: 50, right: 30, bottom: 50, left: 80 }}
      padding={0.3}
      groupMode="grouped"
      enableLabel={false}
      // enableGridY={false}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "dark2" }}
      // colors={"#1b9e77"}
      // colors={(element) =>
      //   element.data.year === selectedYear ? "#fff" : "#1b9e77"
      // }
      colorBy="id"
      borderColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      theme={{
        axis: {
          ticks: {
            line: {
              stroke: "white",
            },
            text: {
              fill: "white",
            },
          },
        },
        grid: {
          line: {
            stroke: "rgba(255,255,255,.3)",
          },
        },
        legends: {
          text: {
            fill: "white",
          },
        },
      }}
      axisTop={null}
      axisRight={null}
      axisLeft={
        isAmountHidden
          ? null
          : {
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legendPosition: "middle",
              legendOffset: -55,
              format: (value) => formatCurrency(value as number),
            }
      }
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: isMobileScreen ? -60 : 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      // axisLeft={{
      //   tickSize: 5,
      //   tickPadding: 5,
      //   tickRotation: 0,
      //   legend: 'összeg',
      //   legendPosition: 'middle',
      //   legendOffset: -55,
      // }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 1.6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "top",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: -40,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={(e) => {
        return (
          <div
            style={{
              background: "white",
              padding: "9px 12px",
              border: "1px solid #ccc",
            }}
          >
            <div className="text-sm font-bold">{e.data.position}</div>
            <div className="text-xs font-bold text-slate-600">
              {e.data.level} - {e.id}
            </div>
            <div>{formatCurrency(e.data[e.id] as number)}</div>
          </div>
        );
      }}
      role="application"
    />
  );
};

export default BarChartHays;
