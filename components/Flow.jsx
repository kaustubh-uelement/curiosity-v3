import { INPUTS, OUTPUTS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Flow({ className }) {
  return (
    <div className={cn("flow", className)}>
      <div className="flowCol">
        {INPUTS.map((item) => (
          <div className="fNode" key={item}>
            {item}
          </div>
        ))}
      </div>
      <div className="fCore">
        <div className="fRing">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path
              d="M16 1.5 L19.8 12.2 L30.5 16 L19.8 19.8 L16 30.5 L12.2 19.8 L1.5 16 L12.2 12.2 Z"
              fill="#fff"
              opacity=".92"
            />
          </svg>
        </div>
        <span className="fn">Curiosity AI</span>
        <span className="fs">Full-stack platform</span>
      </div>
      <div className="flowCol">
        {OUTPUTS.map((item) => (
          <div className="fNode" key={item}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

