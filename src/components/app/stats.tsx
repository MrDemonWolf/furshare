const stats = [
  { name: "Number of deploys", value: "405" },
  { name: "Average deploy time", value: "3.65", unit: "mins" },
  { name: "Number of servers", value: "3" },
  { name: "Success rate", value: "98.5%" },
];

export default function Example() {
  return (
    <div className="grid grid-cols-1 gap-px lg:grid-cols-2">
      {stats.map((stat) => (
        <div key={stat.name} className="px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-sm font-medium leading-6  dark:text-gray-200">
            {stat.name}
          </p>
          <p className="mt-2 flex items-baseline gap-x-2">
            <span className="text-4xl font-semibold tracking-tight text-white">
              {stat.value}
            </span>
            {stat.unit ? (
              <span className="text-sm text-gray-400">{stat.unit}</span>
            ) : null}
          </p>
        </div>
      ))}
    </div>
  );
}
