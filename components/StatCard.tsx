import clsx from "clsx";
import Image from "next/image";

type StatCardProps = {
  type: "appointments" | "pending" | "cancelled";
  count: number;
  label: string;
  icon: string;
};

export const StatCard = ({ count = 0, label, icon, type }: StatCardProps) => {
  const accentColors = {
    appointments: "border-teal-400",
    pending: "border-yellow-400",
    cancelled: "border-red-500",
  };

  return (
    <div
      className={clsx(
        "bg-gray-800 text-white p-6 rounded-xl shadow-md flex items-center justify-between hover:bg-gray-700 transition-colors duration-200 border-l-4",
        accentColors[type]
      )}
    >
      {/* Icon & Count */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-700 p-2 rounded-md">
          <Image
            src={icon}
            height={32}
            width={32}
            alt={label}
            className="w-8 h-8"
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{count}</h2>
          <p className="text-sm text-gray-300">{label}</p>
        </div>
      </div>
    </div>
  );
};
