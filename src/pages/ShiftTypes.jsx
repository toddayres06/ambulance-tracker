import ShiftTypeManager from '../components/ShiftTypeManager';

const ShiftTypes = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Manage Shift Templates</h1>
      <ShiftTypeManager />
    </div>
  );
};

export default ShiftTypes;
