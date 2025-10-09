interface InventoryProps {
  items: string[];
}

export default function Inventory({ items }: InventoryProps) {
  return (
    <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-xs">
      <div className="text-lg font-bold mb-2">INVENTAIRE</div>
      {items.length === 0 ? (
        <div className="text-sm text-gray-400">Aucun objet collecté</div>
      ) : (
        <div className="space-y-1">
          {items.map((item, index) => (
            <div
              key={index}
              className="text-sm bg-green-600 bg-opacity-30 px-2 py-1 rounded"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
