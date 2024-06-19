export interface SectionHeaderProps {
  title: string;
  description: string;
}

export default function SectionHeader({
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="text-center py-6 font-bold">
      {/* description */}
      <p className="font-bold">{description}</p>
      {/* title */}
      <h2 className="text-4xl text-redColor italic">{title}</h2>
    </div>
  );
}
