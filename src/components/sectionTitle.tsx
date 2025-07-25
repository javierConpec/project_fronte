export const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
  <div className="flex  items-center gap-2 border-b pb-2 mb-6">
    <Icon className="text-gray-700 w-8 h-8" />
    <h2 className="text-4xl font-extrabold text-gray-800 ">{title}</h2>
  </div>
);