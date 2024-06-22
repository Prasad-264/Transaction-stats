import Transctions from "@/components/Transctions";
import Header from "@/components/Header";
import DataVisualization from "@/components/DataVisualization";

export default function Home() {
  return (
    <main>
      <div className="overflow-y-scroll no-scrollbar">
        <Header />
        <Transctions />
        <DataVisualization />
      </div>
    </main>
  );
}
