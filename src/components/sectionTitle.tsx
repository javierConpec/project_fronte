export const SectionTitle = ({ icon: Icon, title }: { icon: React.ElementType, title: string }) => (
  <div className="flex items-center gap-2 border-b pb-2 mb-4">
    <Icon className="text-gray-500 w-6 h-6" />
    <h2 className="text-3xl font-extrabold text-gray-800">{title}</h2>
  </div>
);