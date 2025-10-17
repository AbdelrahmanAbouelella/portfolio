import Portfolio from './Portfolio';
import AnimatedShaderBackground from "@/components/ui/animated-shader-background";

function App() {
  return (
    <div className="relative">
      <AnimatedShaderBackground />
      <main className="relative z-10">
        <Portfolio />
      </main>
    </div>
  );
}

export default App;
