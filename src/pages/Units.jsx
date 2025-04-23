import { useEffect, useState } from 'react'
import mockUnits from '../data/mockUnits';
import UnitCard from '../components/UnitCard';

const Units = () => {
  const [units, setUnits] = useState(mockUnits)

  useEffect(() => {
    const interval = setInterval(() => {
      setUnits((prevUnits) => 
      prevUnits.map((unit) => ({
        ...unit,
        location: getRandomLocation()
      }))
    )
  }, 5000)

  return () => clearInterval(interval)
}, [])

const getRandomLocation = () => {
  const locations = ['Downtown', 'Uptown', 'Midtown', 'East Side', 'West End']
  return locations[Math.floor(Math.random() * locations.length)]
}

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Ambulance Units</h2>
      <div className="grid gap-4">
        {units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  );
};

export default Units;
