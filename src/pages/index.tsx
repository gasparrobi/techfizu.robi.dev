import { useState } from "react";
import { type NextPage } from "next";
import Head from "next/head";

import DropdownSelector from "../components/ui/DropdownSelector";
import BarChartHays, {
  type SalaryItem,
} from "../components/chart/BarChartHays";
import { salaries } from "../hays";
import { formatCurrency } from "../utils/formatCurrency";
import { Highlighted } from "../components/ui/Highlighted";
import BarChartHaysYearly from "../components/chart/BarChartHaysYearly";
import Link from "next/link";

export type Level = "junior" | "medior" | "senior" | "lead" | undefined;

const positions = Array.from(
  new Set((salaries[2023] as SalaryItem[]).map((item) => item.position)) || []
);

const softwareDevPositions = Array.from(
  new Set(
    (salaries[2023] as SalaryItem[])
      .filter((item) => item.category.includes("Software development"))
      .map((item) => item.position)
  ) || []
);

const Fizu: NextPage = () => {
  const [selectedPosition, setSelectedPosition] = useState(positions[0]);
  const [selectedDevPosition, setSelectedDevPosition] = useState(
    softwareDevPositions[0]
  );
  const [selectedLevel, setSelectedLevel] = useState<Level>("medior");

  const positionValues = (salaries[2023] as SalaryItem[]).filter(
    (item) => item.position === selectedPosition
  );

  const handlePositionSelection = (value: string | number) => {
    setSelectedPosition(String(value));
  };

  const handleDevPositionSelection = (value: string | number) => {
    setSelectedDevPosition(String(value));
  };

  const handleLevelSelection = (value: string | number) => {
    setSelectedLevel(value as Level);
  };

  return (
    <>
      <Head>
        <title>Tech Fizu</title>
        <meta
          name="description"
          content="Tech szektor fizetési statisztikák a Hays Salary Guide alapján"
        />

        <meta itemProp="name" content="Tech Fizu" />
        <meta
          itemProp="description"
          content="Tech szektor fizetési statisztikák a Hays Salary Guide alapján"
        />
        <meta
          itemProp="image"
          content="https://techfizu.robi.dev/og-image.jpg"
        />

        <meta property="og:url" content="https://techfizu.robi.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Tech Fizu" />
        <meta
          property="og:description"
          content="Tech szektor fizetési statisztikák a Hays Salary Guide alapján"
        />
        <meta
          property="og:image"
          content="https://techfizu.robi.dev/og-image.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tech Fizu" />
        <meta
          name="twitter:description"
          content="Tech szektor fizetési statisztikák a Hays Salary Guide alapján"
        />
        <meta
          name="twitter:image"
          content="https://techfizu.robi.dev/og-image.jpg"
        ></meta>
        <link rel="icon" href="/favicon.ico" />
        <script
          async
          defer
          data-website-id={process.env.STATS_WEBSITE_ID}
          src={process.env.STATS_URL}
        ></script>
      </Head>
      {/* <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]"> */}
      <main className="relative flex h-full min-h-screen flex-col items-center  bg-dark">
        <div className="absolute inset-0 z-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>
        <div className="container z-10 flex flex-col items-center justify-center px-4 py-16 ">
          <div className=" flex min-h-[400px]  w-full  flex-col gap-20">
            <div>
              <h1 className="text-4xl font-extrabold text-white sm:text-6xl">
                Tech fizu
              </h1>
              <p className="text-lg text-slate-400">
                IT fizetési adatok a Hays Salary Guide alapján.{" "}
              </p>
            </div>

            <div className="relative flex flex-col justify-between gap-2 border-b border-teal-500 bg-teal-500 px-4 py-4 text-center sm:flex-row sm:text-start">
              <h2 className=" text-2xl font-semibold  sm:text-4xl">
                <Highlighted className="text-dark">
                  {" "}
                  Fizuk 2023-ban:{" "}
                </Highlighted>
              </h2>
              <DropdownSelector
                options={positions}
                onChange={handlePositionSelection}
              />
              <span className="absolute bottom-0 left-0 translate-y-full p-1 text-left text-xs text-slate-400">
                *Bruttó havi fizetés forintban, teljes munkaidős állás esetén,
                bónusz és egyéb juttatás nélkül
              </span>
            </div>
            <div className="grid-parent max-w-lg text-xs sm:text-base">
              <p className="border-b border-slate-600 text-slate-400"></p>
              <p className="border-b border-slate-600 font-bold text-slate-200 ">
                min
              </p>
              <p className="border-b border-slate-600 font-bold text-slate-200">
                average
              </p>
              <p className="border-b border-slate-600 font-bold text-slate-200">
                max
              </p>
              {positionValues.map((item) => (
                <>
                  <p
                    key={`${item.level}-1`}
                    className="font-bold text-slate-200"
                  >
                    {item.level}
                  </p>
                  <p key={`${item.min}-2`} className="text-slate-400">
                    {formatCurrency(item.min)}
                  </p>
                  <p key={`${item.average}-3`} className="text-slate-400">
                    {formatCurrency(item.average)}
                  </p>
                  <p key={`${item.max}-4`} className="text-slate-400">
                    {formatCurrency(item.max)}
                  </p>
                </>
              ))}
            </div>
            <div className="h-[400px] min-h-[400px]">
              <BarChartHays selectedPosition={selectedPosition} />
            </div>

            <div className="py-6"></div>

            <div className="relative flex flex-col justify-between gap-2 border-b border-teal-500 bg-teal-500 px-4 py-4 text-center sm:flex-row sm:text-start">
              <h2 className=" text-2xl font-semibold sm:text-4xl">
                <Highlighted className="text-dark">
                  {" "}
                  Fizuk az évek során:{" "}
                </Highlighted>
              </h2>
              <div className="flex flex-col flex-wrap gap-2 lg:flex-row">
                <DropdownSelector
                  options={softwareDevPositions}
                  onChange={handleDevPositionSelection}
                />
                <DropdownSelector
                  options={["junior", "medior", "senior", "lead"]}
                  defaultValue={"medior"}
                  onChange={handleLevelSelection}
                />
              </div>
              <span className="absolute bottom-0 left-0 translate-y-full p-1 text-left text-xs text-slate-400">
                *Bruttó havi fizetés forintban, teljes munkaidős állás esetén,
                bónusz és egyéb juttatás nélkül
              </span>
            </div>

            <div className="h-[400px] min-h-[400px]">
              <BarChartHaysYearly
                selectedPosition={selectedDevPosition as string}
                selectedLevel={selectedLevel}
              />
            </div>

            <div className="w-full text-center text-sm text-white">
              A felhasznált adatok a{" "}
              <Link
                className="text-primary underline"
                target="_blank"
                rel="noopener noreferrer"
                href={"https://www.hays.hu/en/salary-guide"}
              >
                Hays Hungary Salary Guide 2023{" "}
              </Link>
              és a Hays korábbi évek kiadványaiból származnak.
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Fizu;
