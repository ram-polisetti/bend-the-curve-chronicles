import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "./ui/card";

const data = [
  { epoch: 1, error: 0.9, validation: 0.95 },
  { epoch: 2, error: 0.7, validation: 0.8 },
  { epoch: 3, error: 0.5, validation: 0.65 },
  { epoch: 4, error: 0.3, validation: 0.45 },
  { epoch: 5, error: 0.2, validation: 0.35 },
  { epoch: 6, error: 0.15, validation: 0.3 },
  { epoch: 7, error: 0.1, validation: 0.25 },
  { epoch: 8, error: 0.08, validation: 0.23 },
  { epoch: 9, error: 0.07, validation: 0.22 },
  { epoch: 10, error: 0.06, validation: 0.21 },
];

export const LearningCurve = () => {
  const title = "Learning with BendTheCurve.today";

  return (
    <Card className="p-6 bg-newspaper-background border-newspaper-border">
      <h3 className="text-xl font-serif mb-4 text-newspaper-primary">Model Learning Curve</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trainingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="validationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis dataKey="epoch" label={{ value: "Epochs", position: "bottom" }} />
            <YAxis label={{ value: "Error Rate", angle: -90, position: "insideLeft" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid #C8C8C9"
              }}
            />
            <Area
              type="monotone"
              dataKey="error"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#trainingGradient)"
              name="Training Error"
            />
            <Area
              type="monotone"
              dataKey="validation"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#validationGradient)"
              name="Validation Error"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
